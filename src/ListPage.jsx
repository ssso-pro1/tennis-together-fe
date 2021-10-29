import React from 'react';
import ItemPage from './ItemPage';
import Search from './Search';

// import './components/list-page.scss';
import styles from './ListPage.module.css';
import Navbar from './Navbar';

const ListPage = ({ games, games: { content } }) => {
  // console.log(games);

  return (
    <>
      <Navbar />
      <section className={styles.listpage}>
        <div className={styles.searchDiv}>
          <h3 className={styles.title}>검색하기</h3>
          <Search />
        </div>
        <div className={styles.gamesDiv}>
          <h3 className={styles.title}>현재 가능한 경기</h3>
          <ul className={styles.gamesList}>
            {games &&
              content.map(game => (
                <ItemPage //
                  key={game.game_no}
                  game={game}
                />
              ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ListPage;
