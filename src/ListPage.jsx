import React from 'react';
import ItemPage from './ItemPage';
import './components/list-page.scss';
import Search from './Search';

const ListPage = ({ games, games: { content } }) => {
  console.log(games);

  return (
    <section>
      <h3>현재 가능한 경기</h3>
      <ul>
        {games &&
          content.map(game => (
            <ItemPage //
              key={game.game_no}
              game={game}
            />
          ))}
      </ul>
    </section>
  );
};

export default ListPage;
