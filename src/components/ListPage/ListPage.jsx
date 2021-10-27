import React from 'react';
import ItemPage from '../ItemPage/ItemPage';

const ListPage = ({ games, games: { content } }) => {
  console.log(games);

  return (
    <ul>
      {games &&
        content.map(game => (
          <ItemPage //
            key={game.game_no}
            game={game}
          />
        ))}
    </ul>
  );
};

export default ListPage;
