import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useParams, useHistory } from 'react-router'
import { UserContext } from 'service/authState'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import DetailComments from './DetailComments'
import DetailItem from './DetailItem'
import {
  createComment,
  deleteList,
  getComment,
  getGame,
  applyHistory,
  applyGame,
  editComment,
  deleteComment,
} from 'service/api'

const DetailMain = ({ onUpdateSuccess }) => {
  const history = useHistory()
  const { gameNo } = useParams()
  const { user } = useContext(UserContext)
  const [game, setGame] = useState(null)
  const [editing, setEditing] = useState(null)
  const [comments, setComments] = useState(null)
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [apply, setApply] = useState(null)
  const [loading, setLoading] = useState(false)

  const showComment = () => {
    setCommentsVisible(!commentsVisible)
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const games = await getGame(gameNo)
      setGame(games.data)
      setLoading(false)
      const comment = await getComment(gameNo)
      setComments(comment.data)
      if (user) {
        const history = await applyHistory(gameNo)
        setApply(history.data.content)
      }
    } catch (error) {
      console.log(error)
    }
  }, [gameNo, user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmitSuccess = (values) => {
    onUpdateSuccess(`${gameNo}`, values)
  }

  // 게임신청 버튼클릭
  const gameApply = async () => {
    if (window.confirm('신청 하시겠습니까?')) {
      try {
        const apply = await applyGame(gameNo)
        if (apply.data) {
          alert('신청이 완료되었습니다')
          const applyGames = await applyHistory()
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
    const games = await getGame(gameNo)
    setEditing(games.data)
    if (editing) {
      history.push({
        pathname: `/pages/writing`,
        state: editing,
        onSubmitSuccess: handleSubmitSuccess,
      })
    }
  }
  // 글삭제
  const del = (gameNo) => {
    if (window.confirm('삭제 하시겠습니까?')) {
      deleteList(gameNo)
    }
    history.push('/')
  }

  const onCommentSubmit = async (values) => {
    createComment(values, gameNo)
    const res = await getComment(gameNo)
    setComments(res.data)
  }

  const onCommentEdit = async (values, commentNo) => {
    editComment(values, gameNo, commentNo)
    const res = await getComment(gameNo)
    setComments(res.data)
  }

  const onCommentDelete = async (commentNo) => {
    console.log(commentNo)
    if (window.confirm('삭제 하시겠습니까?')) {
      await deleteComment(gameNo, commentNo)

      const res = await getComment(gameNo)
      setComments(res.data)
    }
  }

  return (
    <div>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
          {game && (
            <DetailItem
              game={game}
              onEdit={onEdit}
              del={del}
              user={user}
              loading={loading}
              apply={apply}
              gameApply={gameApply}
            />
          )}

          {comments && (
            <CommentP onClick={showComment}>
              댓글
              <span>{comments.totalElements && comments.totalElements}</span>
              {commentsVisible ? (
                <UpOutlined className="arrow" />
              ) : (
                <DownOutlined className="arrow" />
              )}
            </CommentP>
          )}

          {commentsVisible && (
            <DetailComments
              comments={comments}
              setComments={setComments}
              onCommentSubmit={onCommentSubmit}
              onCommentEdit={onCommentEdit}
              onCommentDelete={onCommentDelete}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}
export default DetailMain

const CommentP = styled.div`
  cursor: pointer;
  font-weight: bold;
  margin: 60px 0;
  span {
    margin-left: 5px;
  }
  .arrow {
    font-size: 14px;
  }
`
