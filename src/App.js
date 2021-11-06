import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'

import Writing from './components/Writing/Writing'
import DetailMain from './components/Detail/DetailMain'
import ListPage from './components/ListPage/ListPage'
import AuthPage from 'components/LoginPage/AuthPage'
import SignUpPage from 'components/LoginPage/SignUpPage'
import AuthState from 'service/authState'

import GlobalStyle from './styled-components/GlobalStyles'
import GlobalFonts from './styled-components/fonts'
import theme from './styled-components/theme'
import styled, { ThemeProvider } from 'styled-components'

function App({ authService, getPost }) {
  // useEffect(() => {
  //   getPost.recentGames().then((games) => setGames(games))
  // })

  // useEffect(() => {
  //   getPost.getUsers().then((res) => {
  //   console.log(res.data))
  //   }
  // })

  const [games, setGames] = useState(null)

  useEffect(() => {
    return fetch('http://localhost:3000/games')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setGames(data)
      })
  }, [])

  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalFonts />
      <ThemeProvider theme={theme}>
        <AuthState>
          <Switch>
            <Route path="/" exact>
              <ListPage games={games} />
            </Route>
            <Route path="/authin">
              <AuthPage authService={authService} />
            </Route>
            <Route path="/signup">
              <SignUpPage authService={authService} />
            </Route>
            <Route path="/writing">
              <Writing />
            </Route>
            <Route path="/detail/:gameNo">
              <DetailMain games={games} />
            </Route>
          </Switch>
        </AuthState>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
