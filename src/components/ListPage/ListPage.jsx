import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'

import Navbar from '../Common/Navbar'
import Header from './Header'
import Search from '../Search'
import ItemPage from './ItemPage'
import styles from '../../styled-components/ListPage.module.css'
import styled from 'styled-components'

const ListPage = ({ UserContext, user }) => {
  const [games, setGames] = useState(null)
  // const [content, setContent] = useState(null)

  // heroku db : axios games
  /*
  useEffect(() => {
    axios('/games') //
      .then((response) => {
        console.log('heroku-game')
        // console.log(response)
        // console.log(response.data)
        // console.log(response.data.content)
        setContent(response.data.content)
      })
  }, [])
  */

  // json-server : axios games
  useEffect(() => {
    axios('http://localhost:3000/games') //
      .then((response) => {
        // console.log(response)
        setGames(response.data)
      })
  }, [])

  const history = useHistory()

  const onGameClick = (game) => {
    history.push(`/detail/${game.gameNo}`)
  }

  // const GamesList = styled.section`
  //   display: flex;
  //   flex-direction: row;
  // `

  const Section = styled.div`
    box-sizing: border-box;
    /* padding: 0px 20px; */
    width: 90%;
    margin: 0px auto;
  `

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
              {/* json-server */}
              {games &&
                games.map((game) => (
                  <ItemPage //
                    key={game.gameNo}
                    game={game}
                    onGameClick={onGameClick}
                  />
                ))}

              {/* heroku */}
              {/* {content &&
                content.map((game) => (
                  <ItemPage //
                    key={game.gameNo}
                    game={game}
                    onGameClick={onGameClick}
                  />
                ))} */}
            </ul>
          </div>
        </section>
      </Section>
    </>
  )
}

export default ListPage
