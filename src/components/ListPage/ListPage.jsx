import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import Navbar from '../Common/Navbar'
import Header from './Header'
// import Search from '../Search/Search'
import Search from '../Search'
import ItemPage from './ItemPage'
import styles from '../../styled-components/ListPage.module.css'
import styled from 'styled-components'

const ListPage = ({ games, UserContext }) => {
  // const { user } = useContext(UserContext)

  const Section = styled.div`
    box-sizing: border-box;
    /* padding: 0px 20px; */
    width: 90%;
    margin: 0px auto;
  `

  // console.log(games);
  const history = useHistory()

  const onGameClick = (game) => {
    history.push(`/detail/${game.gameNo}`)
  }

  // const GamesList = styled.section`
  //   display: flex;
  //   flex-direction: row;
  // `

  return (
    <>
      <Navbar />
      <Header />
      <Section>
        <section className={styles.listpage}>
          <div className={styles.searchDiv}>
            <h3 className={styles.title}>검색하기</h3>
            <Search />
          </div>
          <div className={styles.gamesDiv}>
            <h3 className={styles.title}>현재 가능한 경기</h3>
            <ul className={styles.gamesList}>
              {games &&
                // content.map((game) => (
                games.map((game) => (
                  <ItemPage //
                    key={game.gameNo}
                    game={game}
                    onGameClick={onGameClick}
                  />
                ))}
            </ul>
          </div>
        </section>
      </Section>
    </>
  )
}

export default ListPage
