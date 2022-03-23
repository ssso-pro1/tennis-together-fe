import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import baseApi from 'service/baseApi'
import DetailComments from './DetailComments'
import DetailItem from './DetailItem'

const DetailMain = ({ onUpdateSuccess }) => {
  const history = useHistory()
  const { gameNo } = useParams()
  const [game, setGame] = useState(null)
  const [editing, setEditing] = useState(null)
  const [comments, setComments] = useState(null)
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [apply, setApply] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmitSuccess = (values) => {
    console.log(`${gameNo}`)
    console.log(values)
    onUpdateSuccess(`${gameNo}`, values)
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const games = await baseApi(`/games/${gameNo}`)
      setGame(games.data)
      const history = await baseApi(`games/histories/applygames`) //
      setApply(history.data.content)
      setLoading(false)
      const comment = await baseApi(`/games/${gameNo}/comments`)
      setComments(comment.data)
    } catch (error) {
      console.log(error)
    }
  }

  // 게임신청 버튼클릭
  const gameApply = async () => {
    if (window.confirm('신청 하시겠습니까?')) {
      try {
        const apply = await baseApi.post(`/games/${gameNo}/apply`)
        if (apply.data) {
          alert('신청이 완료되었습니다')
          const applyGames = await baseApi(`games/histories/applygames`) //

          setApply(applyGames.data)
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
  const onEdit = async () => {
    const games = await baseApi(`/games/${gameNo}`)
    console.log(games)
    setEditing(games.data)
    if (editing) {
      console.log('게임', editing)
      history.push({
        pathname: `/pages/writing`,
        state: editing,
        onSubmitSuccess: handleSubmitSuccess,
      })
    }
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
            <DetailItem
              game={game}
              apply={apply}
              gameApply={gameApply}
              onEdit={onEdit}
              del={del}
              loading={loading}
            />
          )}

          {comments && (
            <CommentP onClick={showComment}>
              댓글
              {comments.totalElements && comments.totalElements}
              {commentsVisible ? (
                <UpOutlined className="arrow" />
              ) : (
                <DownOutlined className="arrow" />
              )}
            </CommentP>
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

const CommentP = styled.p`
  cursor: pointer;
  font-weight: bold;
  margin: 60px 0;
  .arrow {
    font-size: 14px;
    margin-left: 5px;
    padding-bottom: 5px;
  }
`
