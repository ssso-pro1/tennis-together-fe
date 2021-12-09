import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Writing from './components/writing'
import DetailMain from './components/detail'
import AuthState from 'service/authState'
import ListPage from './components/listPage/ListPage'
import AuthPage from 'components/loginPage/AuthPage'
import SignUpPage from 'components/loginPage/SignUpView'
import EditForm from 'components/writing/EditForm'
import MyHistory from 'components/myPage/MyHistory'
import Notifications from 'components/myPage/Notifications'
import UpdateProfile from 'components/myPage/UpdateProfile'
import FriendsList from 'components/Friends/FriendsList'

import GlobalStyle from './components/common/GlobalStyles'
import theme from './components/common/theme'
import { ThemeProvider } from 'styled-components'
import Navbar from 'components/common/Navbar'
import Footer from 'components/listPage/Footer'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <AuthState>
          <Navbar />
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
            <Route path="/pages/:gameNo/detail">
              <DetailMain />
            </Route>
            <Route path="/pages/:gameNo/editing">
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
          <Footer />
        </AuthState>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
