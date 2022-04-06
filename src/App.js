import React from 'react'
import baseApi from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthState from 'service/authState'
import ListPage from './components/listPage'
import AuthPage from 'components/loginPage'
import SignUpPage from 'components/loginPage/SignUpView'
import Writing from './components/writing'
import DetailMain from 'components/detail'
import UpdateProfile from 'components/myPage/UpdateProfile'
import FriendsList from 'components/myPage/FriendList'
import NavigationB from 'components/common/NavigationB'
import Footer from 'components/common/Footer'
import { createList, updateList } from 'service/api'
import GlobalStyle from './components/common/GlobalStyles'
import theme from './components/common/theme'
import { ThemeProvider } from 'styled-components'
import MyPage from 'components/myPage'

function App() {
  const handleDetailCreateSuccess = (formData) => {
    createList(formData)
  }

  const handleDetailUpdateSuccess = (gameNo, formData) => {
    updateList(gameNo, formData)
  }

  return (
    <BrowserRouter>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <AuthState>
          <Switch>
            <Route path="/pages/writing">
              <Writing onSubmitSuccess={handleDetailCreateSuccess} />
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
                    <DetailMain onUpdateSuccess={handleDetailUpdateSuccess} />
                  </Route>
                  <Route path="/pages/friends">
                    <FriendsList />
                  </Route>
                  <Route path="/pages/updateprofile">
                    <UpdateProfile />
                  </Route>
                  <Route path="/pages/mypage">
                    <MyPage />
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
