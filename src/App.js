import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from 'service/authState'

import Writing from './components/Writing/Writing'
import DetailMain from './components/Detail/DetailMain'
import ListPage from './components/ListPage/ListPage'
import AuthPage from 'components/LoginPage/AuthPage'
import SignUpPage from 'components/LoginPage/SignUpPage'
import AuthState from 'service/authState'
import EditForm from 'components/Writing/EditForm'

import GlobalStyle from './styled-components/GlobalStyles'

import theme from './styled-components/theme'
import styled, { ThemeProvider } from 'styled-components'

function App() {
  // const { user } = useContext(UserContext)

  return (
    <BrowserRouter>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <AuthState>
          <Switch>
            <Route path="/" exact>
              {/* <ListPage authService={authService} /> */}
              <ListPage />
            </Route>
            <Route path="/authin">
              <AuthPage />
              {/* <AuthPage /> */}
            </Route>
            <Route path="/signup">
              {/* <SignUpPage authService={authService} /> */}
              <SignUpPage />
            </Route>
            <Route path="/writing">
              <Writing />
            </Route>
            <Route path="/detail/:gameNo">
              <DetailMain />
            </Route>
            <Route path="/editing/:gameNo">
              <EditForm />
            </Route>
          </Switch>
        </AuthState>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
