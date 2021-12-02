import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AuthState from 'service/authState'
import Writing from './components/Writing/Writing'
import DetailMain from './components/Detail/DetailMain'
import ListPage from './components/ListPage/ListPage'
import AuthPage from 'components/LoginPage/AuthPage'
import SignUpPage from 'components/LoginPage/SignUpPage'
import EditForm from 'components/Writing/EditForm'
import MyHistory from 'MyPage/MyHistory'
import Notifications from 'MyPage/Notifications'
import UpdateProfile from 'MyPage/UpdateProfile'
import FriendsList from 'components/Friends/FriendsList'

import GlobalStyle from './styled-components/GlobalStyles'
import theme from './styled-components/theme'
import { ThemeProvider } from 'styled-components'
import Navbar from 'components/Common/Navbar'
import Footer from 'components/ListPage/Footer'

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
          <Footer />
        </AuthState>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
