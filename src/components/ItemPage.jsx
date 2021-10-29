import React from 'react'
import './components/item-page.scss'
// import styles from './item_page.module.css';

const ItemPage = ({ game, onGameClick }) => {
  return (
    <li onClick={() => onGameClick(game)}>
      <img src="/images/0916.jpg" alt="img" />
      <div>
        <h4>{game.title}</h4>
        <div>
          <p>{game.nickname}</p>
          <p>{game.rate}</p>
        </div>
        <div>
          <p>{game.court_name}</p>
          <p>{game.time}</p>
        </div>
      </div>
    </li>
  )
}

export default ItemPage
