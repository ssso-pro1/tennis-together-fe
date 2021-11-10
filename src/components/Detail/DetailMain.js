import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import axios from 'axios'

import Navbar from '../Common/Navbar'

import DetailTable from '../Detail/DetailTable'
import DetailComments from '../Detail/DetailComments'

import Avatar from 'styled-components/Avatar'
import Button from 'styled-components/Buttons'

let nextNo = 11

function DetailMain({ users }) {
  const { gameNo } = useParams()
  const [game, setGame] = useState()

  const [isDone, setIsDone] = useState(1)

  // axios games
  useEffect(() => {
    axios(`http://localhost:3000/games/${gameNo}`) //
      .then((response) => {
        console.log(response)
        setGame(response.data)
      })
  }, [])

  function toggleDone() {
    setIsDone(isDone === 1 ? 2 : 1)
  }

  const Flexbox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `
  const TitleWrap = styled.div`
    padding: 32px 48px 32px 0;

    h1 {
      font-size: 48px;
      font-weight: bold;
    }
  `

  // 댓글창 토글
  const [commentsVisible, setCommentsVisible] = useState(false)

  const showComment = () => {
    setCommentsVisible(!commentsVisible)
  }
  //******************************************************************* */
  //************************ 글삭제 404********************************
  function del() {
    if (window.confirm('삭제 하시겠습니까?')) {
      axios
        .delete(`/games/${gameNo}`)
        .then(function (response) {
          // handle success
          setGame({ gameNo: 0 })
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  }
  if (game === null) {
    return <div></div>
  }
  return (
    <div>
      <Navbar />
      <Row>
        <Col span={12} offset={6}>
          <div key={game.gameNo}>
            <TitleWrap>
              <h1>
                {game.gameNo}
                {game.title}
              </h1>
            </TitleWrap>
            <Avatar game={game} />
            <DetailTable game={game} />
            <Flexbox>
              {isDone === 1 ? (
                <Button
                  Outlined
                  height={'40px'}
                  width={'200px'}
                  onClick={toggleDone}
                >
                  신청하기
                </Button>
              ) : (
                <Button
                  Primary
                  height={'40px'}
                  width={'200px'}
                  onClick={toggleDone}
                >
                  신청완료
                </Button>
              )}
            </Flexbox>
            <Flexbox>
              <Button height={'40px'}>수정</Button>
              <Button height={'40px'} onClick={del}>
                삭제
              </Button>
            </Flexbox>
          </div>

          <p
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={showComment}
          >
            댓글
          </p>
          {commentsVisible && <DetailComments />}
        </Col>
      </Row>
    </div>
  )
}

export default DetailMain
