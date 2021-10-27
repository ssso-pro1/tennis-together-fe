import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ListPage from './components/ListPage/ListPage';
import { useState } from 'react';

function App() {
  const initial_games = {
    content: [
      {
        game_no: 1,
        title: '모집합니다.',
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
  };

  const [games, setGames] = useState(initial_games);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <ListPage games={games} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
