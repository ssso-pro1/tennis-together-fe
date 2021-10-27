import React from 'react';
import './components/item-page.scss';

const ItemPage = ({ game }) => {
  return (
    <li>
      {/* img, title, name, rate, courtname, time */}
      <img src='/images/0916.jpg' alt='img' />
      <h4>{game.title}</h4>
      <div>
        <p>{game.nickname}</p>
        <p>{game.rate}</p>
      </div>
      <div>
        <p>{game.court_name}</p>
        <p>{game.time}</p>
      </div>
    </li>
  );
};

export default ItemPage;
<itempage></itempage>;
