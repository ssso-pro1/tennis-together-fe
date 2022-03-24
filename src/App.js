import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthState from 'service/authState'
import ListPage from './components/listPage'
import AuthPage from 'components/loginPage'
import SignUpPage from 'components/loginPage/SignUpView'
import Writing from './components/writing'
import DetailMain from 'components/detail'
import MyHistory from 'components/myPage/MyHistory'
import Notifications from 'components/myPage/Notifications'
import UpdateProfile from 'components/myPage/UpdateProfile'
import FriendsList from 'components/myPage/FriendList'
import NavigationB from 'components/common/NavigationB'
import Footer from 'components/common/Footer'
import { createList, updateList } from 'service/api'
import { useHistory } from 'react-router'

import GlobalStyle from './components/common/GlobalStyles'
import theme from './components/common/theme'
import { ThemeProvider } from 'styled-components'

function App() {
  const history = useHistory()

  const handleCreateSuccess = (formData) => {
    createList(formData)
  }

  const handleUpdateSuccess = (gameNo, formData) => {
    updateList(gameNo, formData)
  }
  return (
    <BrowserRouter>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <AuthState>
          <Switch>
            <Route path="/pages/writing">
              <Writing onSubmitSuccess={handleCreateSuccess} />
            </Route>
            <Route
              exact
              path="*"
              component={() => (
                <>
                  <NavigationB />
                  <Route path="/" exact>
                    <ListPage />
                  </Route>
                  <Route path="/pages/authin">
                    <AuthPage />
                  </Route>
                  <Route path="/pages/signup">
                    <SignUpPage />
                  </Route>
                  <Route path="/pages/:gameNo/detail">
                    <DetailMain onUpdateSuccess={handleUpdateSuccess} />
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
                </>
              )}
            />
          </Switch>
          <Footer />
        </AuthState>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
