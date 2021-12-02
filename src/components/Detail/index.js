import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from 'service/authState'
import { useParams, useHistory } from 'react-router'
import styled from 'styled-components'
import { Row, Col, Spin } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import baseApi from 'service/baseApi'
import { antIcon } from 'components/Common/constants'
import DetailTable from './DetailTable'
import DetailComments from './DetailComments'
import Avatar from 'styled-components/Avatar'
import Button from 'styled-components/Buttons'

const DetailMain = () => {
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

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const games = await baseApi(`/games/${gameNo}`)
      setGame(games.data)

      const history = await baseApi(`games/histories/applygames`) //
      setApplys(history.data.content)
      setLoading(false)

      const comment = await baseApi(`/games/${gameNo}/comments`)
      setComments(comment.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(comments)

  if (applys !== null && game !== null) {
    var result = applys.find((e) => e.joinedGame.gameNo === game.gameNo)
    var today = new Date()
    var endDt = new Date(game.endDt)
    var lastDay = new Date(endDt.setHours(endDt.getHours() + 15))
  }

  // 게임신청 버튼클릭
  const gameApply = async () => {
    if (window.confirm('신청 하시겠습니까?')) {
      try {
        const apply = await baseApi.post(`/games/${gameNo}/apply`)
        if (apply.data) {
          alert('신청이 완료되었습니다')
          const applygames = await baseApi(`games/histories/applygames`) //

          setApplys(applygames.data)
        }
      } catch (error) {
        console.log(error)
        alert('신청이 불가능합니다')
      } finally {
        fetchData()
      }
    }
  }

  // 글수정
  const edit = () => {
    history.push(`/pages/editing/${gameNo}`)
  }

  // 글삭제
  const del = async () => {
    if (window.confirm('삭제 하시겠습니까?')) {
      try {
        const del = await baseApi.delete(`/games/${gameNo}`)
        if (del.data) {
          alert('발행글이 삭제되었습니다')
          history.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showComment = () => {
    setCommentsVisible(!commentsVisible)
  }

  return (
    <div>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 5 }}>
          {game && (
            <div key={game.gameNo}>
              <TitleWrap>
                <h1>{game.title}</h1>
              </TitleWrap>
              <Avatar game={game} />
              {loading ? (
                <Flexbox style={{ height: '100vh' }}>
                  <Spin indicator={antIcon} />
                </Flexbox>
              ) : (
                <DetailTable game={game} />
              )}
              {user &&
                (user.uid === game.gameCreator.uid ? (
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
                    {(game !== null &&
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
                ))}
            </div>
          )}

          {comments && (
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
          )}

          {commentsVisible && (
            <DetailComments comments={comments} setComments={setComments} />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default DetailMain
