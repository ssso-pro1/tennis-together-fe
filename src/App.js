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

import PopUpProfile from 'components/PopUpProfile/PopUpProfile'

import GlobalStyle from './styled-components/GlobalStyles'

import theme from './styled-components/theme'
import { ThemeProvider } from 'styled-components'

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
              {/* <AuthPage /> */}
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
            {/* <Route path="/reviewlist">
              <ReviewList />
            </Route> */}
            <Route path="/popup">
              <PopUpProfile />
            </Route>
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
