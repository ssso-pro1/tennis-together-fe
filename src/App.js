import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Writing from './components/Writing/Writing'
import DetailMain from './components/Detail/DetailMain'
import ListPage from './components/ListPage/ListPage'
import AuthPage from 'components/LoginPage/AuthPage'
import SignUpPage from 'components/LoginPage/SignUpPage'
import AuthState from 'service/authState'
import EditForm from 'components/Writing/EditForm'
import MyHistory from 'MyPage/MyHistory'
import Notifications from 'MyPage/Notifications'

import GlobalStyle from './styled-components/GlobalStyles'

import theme from './styled-components/theme'
import styled, { ThemeProvider } from 'styled-components'
import font from '../src/styled-components/font.css'
import UpdateProfile from 'MyPage/UpdateProfile'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <AuthState>
          <Switch>
            <Route path="/" exact>
              <ListPage />
            </Route>
            <Route path="/authin">
              <AuthPage />
            </Route>
            <Route path="/signup">
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
            {/* <Route path="/updateprofile">
              <UpdateProfile />
            </Route> */}
            <Route path="/history">
              <MyHistory />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
          </Switch>
        </AuthState>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
