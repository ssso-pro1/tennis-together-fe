import React from 'react'
import styled, { css } from 'styled-components'

import { Card, Col, Row } from 'antd'

const { Meta } = Card

const CardDiv = styled.div`
  margin: 0px 8px;
  border: 1.2px solid lightgray;
  border-radius: 0.3rem;
  &:hover {
    cursor: pointer;
  }
  .card {
  }
`

const MetaData = styled.div`
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
`

const ItemPage = ({ game, onGameClick }) => {
  return (
    <li onClick={() => onGameClick(game)}>
      <CardDiv>
        <Card
          className="card"
          hoverable
          style={{ width: 240 }}
          cover={<img alt="gameimg" src="/images/0916.jpg" />}
          bordered={false}
          hoverable={true}
        >
          <MetaData>
            <div>
              <Meta title={game.title} className="title" />
            </div>
            <div className="secondRow">
              <span className="nick">{game.gameCreator.nickname}</span>
              <span className="age">{game.ageType}대</span>
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
          </MetaData>
        </Card>
      </CardDiv>
    </li>
  )
}

export default ItemPage
