import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Writing from './components/Writing'
import DetailMain from './components/Detail'
import ListPage from './components/ListPage/ListPage'
import AuthPage from 'components/LoginPage/AuthPage'
import SignUpPage from 'components/LoginPage/SignUpPage'
import AuthState from 'service/authState'
import EditForm from 'components/Writing/EditForm'
import MyHistory from 'MyPage/MyHistory'
import Notifications from 'MyPage/Notifications'
import UpdateProfile from 'MyPage/UpdateProfile'
import FriendsList from 'components/Friends/FriendsList'

import GlobalStyle from './styled-components/GlobalStyles'
import theme from './styled-components/theme'
import { ThemeProvider } from 'styled-components'
import font from '../src/styled-components/font.css'

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
            <Route path="/pages/authin">
              <AuthPage />
            </Route>
            <Route path="/pages/signup">
              <SignUpPage />
            </Route>
            <Route path="/pages/writing">
              <Writing />
            </Route>
            <Route path="/pages/detail/:gameNo">
              <DetailMain />
            </Route>
            <Route path="/pages/editing/:gameNo">
              <EditForm />
            </Route>
            <Route path="/pages/friends">
              <FriendsList />
            </Route>
            <Route path="/pages/updateprofile">
              <UpdateProfile />
            </Route>
            <Route path="/pages/history">
              <MyHistory />
            </Route>
            <Route path="/pages/notifications">
              <Notifications />
            </Route>
          </Switch>
        </AuthState>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
