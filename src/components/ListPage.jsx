import React from 'react'
import { useHistory } from 'react-router'
import ItemPage from './ItemPage'
import Search from './Search'
import Navbar from './Navbar'
import styles from './ListPage.module.css'

const ListPage = ({ games, games: { content } }) => {
  // console.log(games);
  const history = useHistory()

  const onGameClick = (game) => {
    history.push(`/detail/${game.game_no}`)
  }
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
              content.map((game) => (
                <ItemPage //
                  key={game.game_no}
                  game={game}
                  onGameClick={onGameClick}
                />
              ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default ListPage
