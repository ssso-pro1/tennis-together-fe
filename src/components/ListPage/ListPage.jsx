import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import Navbar from '../Common/Navbar'
import Header from './Header'
import Search from '../Search'
import ItemPage from './ItemPage'
import styled, { css } from 'styled-components'

const ListPage = ({ UserContext, user }) => {
  const [games, setGames] = useState(null)
  const history = useHistory()

  // heroku db : axios games
  useEffect(() => {
    axios('/games') //
      .then((response) => {
        console.log('heroku-game')
        // console.log(response)
        // console.log(response.data)
        console.log(response.data.content)
        setGames(response.data.content)
      })
  }, [])

  // json-server : axios games
  // useEffect(() => {
  //   axios('http://localhost:3000/games') //
  //     .then((response) => {
  //       // console.log(response)
  //       setGames(response.data)
  //     })
  // }, [])

  const onGameClick = (game) => {
    history.push(`/detail/${game.gameNo}`)
  }

  // const GamesList = styled.section`
  //   display: flex;
  //   flex-direction: row;
  // `

  const Section = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    margin: auto;
    width: 90%;
    /* margin-top: 50px; */
    /* padding: 0px 20px; */
    /* align-items: center; */
    /* justify-content: center; */
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    .searchDiv {
      flex: 1 20%;
    }
    .gamesDiv {
      flex: 1 80%;
      .gamesList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  `

  return (
    <>
      <Navbar />
      <Header />
      <Section>
        <div className="searchDiv">
          <h3 className="title">검색하기</h3>
          <Search />
        </div>
        <div className="gamesDiv">
          <h3 className="title">현재 가능한 경기</h3>
          <ul className="gamesList">
            {games &&
              games.map((game) => (
                <ItemPage //
                  key={game.gameNo}
                  game={game}
                  onGameClick={onGameClick}
                />
              ))}
          </ul>
        </div>
      </Section>
    </>
  )
}

export default ListPage
