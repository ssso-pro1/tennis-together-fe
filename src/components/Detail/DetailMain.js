import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'service/authState'
import { useParams, useHistory } from 'react-router'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import baseApi from 'service/baseApi'
import Navbar from '../Common/Navbar'
import DetailTable from '../Detail/DetailTable'
import DetailComments from '../Detail/DetailComments'
import Avatar from 'styled-components/Avatar'
import Button from 'styled-components/Buttons'

function DetailMain() {
  const { user } = useContext(UserContext)
  const history = useHistory()
  const { gameNo } = useParams()
  const [game, setGame] = useState(null)
  const [comments, setComments] = useState(null)
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [applys, setApplys] = useState(null)
  const [loading, setLoading] = useState(false)

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

  // game 불러오기
  useEffect(() => {
    baseApi(`/games/${gameNo}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }) //
      .then((response) => {
        console.log(response)
        setGame(response.data)
      })
  }, [])

  console.log('detailMain', game)

  // 댓글불러오기
  useEffect(() => {
    baseApi(`/games/${gameNo}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }) //
      .then((response) => {
        console.log(response)
        setComments(response.data)
        setLoading(true)
      })
  }, [])

  console.log('댓글', comments)

  // axios apply History
  useEffect(() => {
    baseApi(`games/histories/applygames`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }) //
      .then((response) => {
        console.log(response)
        setApplys(response.data)
      })
  }, [])

  if (applys !== null && game !== null) {
    var result = applys.content.find((e) => e.joinedGame.gameNo === game.gameNo)
  }

  // 게임신청 버튼클릭
  function gameApply() {
    if (window.confirm('신청 하시겠습니까?')) {
      baseApi
        .post(`/games/${gameNo}/apply`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(function (response) {
          console.log('신청완료', response)
          alert('신청이 완료되었습니다')
          baseApi(`games/histories/applygames`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }) //
            .then((response) => {
              console.log(response)
              setApplys(response.data)
            })
        })
        .catch(function (error) {
          console.log(error)
          alert('신청이 불가능합니다')
        })
    }
  }

  const showComment = () => {
    setCommentsVisible(!commentsVisible)
  }

  // 글수정
  function edit() {
    history.push(`/pages/editing/${gameNo}`)
  }

  // 글삭제
  function del() {
    if (window.confirm('삭제 하시겠습니까?')) {
      baseApi
        .delete(`/games/${gameNo}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(function (response) {
          alert('삭제되었습니다')
          console.log(response)
          history.push('/')
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
  if (comments === null) {
    return <div></div>
  }

  // 날짜비교
  var today = new Date()
  var lastDay = new Date(game.endDt)

  return (
    <div>
      <Navbar />
      <Row>
        <Col span={12} offset={6}>
          <div key={game.gameNo}>
            <TitleWrap>
              <h1>{game.title}</h1>
            </TitleWrap>
            <Avatar game={game} />

            <DetailTable game={game} />

            {user ? (
              user.uid === game.gameCreator.uid ? (
                <Flexbox>
                  <Button
                    height={'40px'}
                    onClick={edit}
                    style={{ marginRight: '5px' }}
                  >
                    수정
                  </Button>
                  <Button height={'40px'} onClick={del}>
                    삭제
                  </Button>
                </Flexbox>
              ) : (
                <Flexbox>
                  {(applys !== null &&
                    result !== undefined &&
                    result.joinedGame.gameNo === game.gameNo) ||
                  today > lastDay ? (
                    <Button
                      Primary
                      height={'40px'}
                      width={'200px'}
                      style={{ pointerEvents: 'none' }}
                    >
                      {today > lastDay ? '신청마감' : '신청완료'}
                    </Button>
                  ) : (
                    <Button
                      Outlined
                      height={'40px'}
                      width={'200px'}
                      onClick={gameApply}
                    >
                      신청하기
                    </Button>
                  )}
                </Flexbox>
              )
            ) : null}
          </div>

          {comments ? (
            <p
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                margin: '60px 0',
              }}
              onClick={showComment}
            >
              댓글{' '}
              {comments.totalElements === 0 ? null : comments.totalElements}
              {commentsVisible ? (
                <UpOutlined
                  style={{
                    fontSize: '14px',
                    marginLeft: '5px',
                    paddingBottom: '5px',
                  }}
                />
              ) : (
                <DownOutlined
                  style={{
                    fontSize: '14px',
                    marginLeft: '5px',
                    paddingBottom: '5px',
                  }}
                />
              )}
            </p>
          ) : null}

          {commentsVisible && (
            <DetailComments comments={comments} setComments={setComments} />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default DetailMain
