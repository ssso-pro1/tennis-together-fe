import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Writing from './components/Writing'
import DetailMain from './components/DetailMain'
import ListPage from './components/ListPage'

import GlobalStyle from './styled-components/GlobalStyles'
import GlobalFonts from './styled-components/fonts'
import theme from './styled-components/theme'
import styled, { ThemeProvider } from 'styled-components'
import LoginPage from './components/LoginPage'

function App({ authService }) {
  const initial_games = {
    content: [
      {
        game_no: 1,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '판다',
        rate: '3.6',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 2,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '곰',
        rate: '4.0',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 3,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '곰',
        rate: '4.0',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 4,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '곰',
        rate: '4.0',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 5,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '곰',
        rate: '4.0',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 6,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '판다',
        rate: '3.6',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 7,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '곰',
        rate: '4.0',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 8,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '곰',
        rate: '4.0',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 9,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '곰',
        rate: '4.0',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
      {
        game_no: 10,
        title: '모집합니다.',
        img: '/images/0916',
        nickname: '곰',
        rate: '4.0',
        court_name: '도곡테니스장',
        time: '20:00',
        content: '모집합니다.',
        gender_type: 'M',
        age_type: '10',
        str_dt: 2020 - 10 - 11,
        end_dt: 2020 - 10 - 12,
        str_dtm: '2020-10-11 15:00:00',
        end_dtm: '2020-10-11 17:00:00',
        loc_si_do: '서울시',
        loc_si_gun_gu: '동작구',
        fst_reg_dtm: 2,
        lst_upd_dtm: '?',
        st_dv_cd: '',
      },
    ],
  }

  const [games, setGames] = useState(initial_games)

  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalFonts />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact>
            <ListPage games={games} />
          </Route>
          <Route path="/login">
            <LoginPage authService={authService} />
          </Route>
          <Route path="/writing">
            <Writing />
          </Route>
          <Route path="/detail/:game_no">
            <DetailMain />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
