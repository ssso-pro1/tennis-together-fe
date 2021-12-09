import React from 'react'
import styled from 'styled-components'

import { Card, Grid, Tag, Row, Col, Slider } from 'antd'
import { status, age } from '../Common/constants'

const { Meta } = Card

const CardDiv = styled.div`
  position: relative;

  margin-bottom: 1.5rem;
  margin-right: 1.5rem;
  border: 1.2px solid lightgray;
  border-radius: 0.3rem;
  &:hover {
    cursor: pointer;
  }
  .card {
    height: 50%;
    .gameImg {
      /* height: 50%; */
    }
  }
`

const MetaData = styled.div`
  @media screen and (max-width: 768px) {
    .card {
      flex-direction: column;
    }
  }
  /* position: relative; */
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 1.2rem;
  }
  .secondRow {
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;
    .nick,
    .age {
      margin-right: 1rem;
    }
    .age {
      color: #b2b3b9;
    }
    .ball {
      margin-right: 0.5rem;
    }
  }
  .status {
    position: absolute;
    right: 1rem;
    background-color: #63a7cd;
    color: white;
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
    top: 1rem;
  }
`

const { useBreakpoint } = Grid
const GameCard = ({ game, onGameClick }) => {
  const screens = useBreakpoint()
  // const layout{
  //   xs: '368px',
  //   lg: 'lg: 1200px'
  // }

  return (
    <li onClick={() => onGameClick(game)}>
      <CardDiv>
        <Row>
          {/* <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}> */}
          {/* <Col xs={{ span: 11 }} lg={{ span: 6 }}> */}
          {/* <Col xs={{ offset: 1 }} lg={{ offset: 2 }}> */}
          <Card
            className="card"
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                className="gameImg"
                alt="gameimg"
                src="/images/games/g5.jpg"
              />
            }
            bordered={false}
            hoverable={true}
          >
            <MetaData>
              <div>
                <Meta title={game.title} className="title" />
              </div>
              <div className="secondRow">
                <span className="nick">{game.gameCreator.nickname}</span>
                <span className="age">{age[game.ageType]}</span>
                <img
                  className="ball"
                  src="/images/img-tennis-ball.png"
                  alt="tennis-ball"
                  width="18rem"
                />
                <span>{game.gameCreator.score}</span>
              </div>
              <div>
                <span>{game.court.name}</span>
              </div>
              <span className="status">{status[game.stDvCd]}</span>
            </MetaData>
          </Card>
          {/* </Col> */}
        </Row>
      </CardDiv>
    </li>
  )
}

export default GameCard
