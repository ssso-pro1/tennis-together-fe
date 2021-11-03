import React from 'react'
import styled from 'styled-components'
// import '~antd/dist/antd.css'

import { Card, Col, Row } from 'antd'

const { Meta } = Card

const CardDiv = styled.div`
  margin: 8px;
  border: 1.2px solid lightgray;
  border-radius: 0.3rem;
`

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemPage = ({ game, onGameClick }) => {
  return (
    <li onClick={() => onGameClick(game)}>
      <CardDiv>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="gameimg" src="/images/0916.jpg" />}
          bordered={false}
          hoverable={true}
        >
          <MetaData>
            <div>
              <Meta title={game.title} />
            </div>
            <div>
              <span>{game.nickname}</span> <span>{game.rate}</span>
            </div>
            <div>
              <span>{game.court_name}</span> | <span>{game.time}</span>
            </div>
          </MetaData>
        </Card>
      </CardDiv>
    </li>
  )
}

export default ItemPage
