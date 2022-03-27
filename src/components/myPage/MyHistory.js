import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import baseApi from 'service/baseApi'
import Button from 'components/common/Buttons'
import Profile from './Profile'
import ReviewModal from './ReviewModal'
import MyPageNav from '../common/MyPageNav'
import Avatar from 'components/common/Avatar'

const MyHistory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [playGames, setPlayGames] = useState([])
  const [reviews, setReviews] = useState(null)
  const [values, setValues] = useState(null)
  const [editing, setEditing] = useState(null)
  playGames.sort((a, b) => b['gameUserNo'] - a['gameUserNo'])
  // 완료된 게임
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const review = await baseApi.get(`/reviews`)
      setReviews(review.data.content)
      const resGame = await baseApi(`games/histories/playgames`) //
      setPlayGames(resGame.data.content)
    } catch (err) {
      console.log(err)
    }
  }

  const onReviewSubmit = (playGame) => {
    setIsModalVisible(true)
    const { nickname, profileUrl } = playGame.userPlayedWith
    setValues({
      nickname: nickname,
      profileUrl: profileUrl,
      court: playGame.joinedGame.court.name,
      date: playGame.joinedGame.regDtm.split('T')[0],
    })
  }

  const onReviewEdit = async (reviewNo) => {
    const review = await baseApi(`/reviews/${reviewNo}`)
    setEditing(review.data)

    if (editing) {
      const { nickname, profileUrl } = editing.recipient
      setValues({
        nickname: nickname,
        profileUrl: profileUrl,
        court: editing.game.court.name,
        date: editing.endDt,
      })
    }

    setIsModalVisible(true)
  }

  // 리뷰발행
  const onFinish = async (values) => {
    setIsModalVisible(false)

    try {
      const res = await baseApi.post('/reviews', {
        gameNo: values.gameNo,
        reviewContent: values.reviewContent,
        score: values.score,
      })
      if (res.data) {
        console.log(res.data)
        alert('리뷰가 등록되었습니다')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <MyPageNav>
        <li>히스토리</li>
      </MyPageNav>

      <Row>
        <Col span={4} offset={5}>
          <Profile />
        </Col>
        <Col span={8}>
          <HistoryUl>
            {playGames &&
              playGames.map((playGame) => {
                const { nickname, profileUrl } = playGame.userPlayedWith
                let reviewCheck
                return (
                  <li key={playGame.gameUserNo}>
                    <Avatar nickName={nickname} userImg={profileUrl} />
                    <p>
                      <span>{playGame.joinedGame.court.name}</span>
                      <span>{playGame.updDtm.split('T')[0]}</span>
                      <span>경기완료</span>
                    </p>
                    <div className="reviewButton">
                      {reviews.find((review) => {
                        playGame.joinedGame.gameNo === review.game.gameNo &&
                          playGame.userPlayedWith.uid ===
                            review.recipient.uid &&
                          (reviewCheck = review.reviewNo)
                      })}

                      {reviewCheck ? (
                        <Button onClick={() => onReviewEdit(reviewCheck)}>
                          리뷰완료
                        </Button>
                      ) : (
                        <Button
                          Outlined
                          onClick={() => onReviewSubmit(playGame)}
                        >
                          리뷰쓰기
                        </Button>
                      )}
                    </div>
                  </li>
                )
              })}
          </HistoryUl>
        </Col>
      </Row>
      {isModalVisible && (
        <ReviewModal
          setIsModalVisible={setIsModalVisible}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          values={values}
          onFinish={onFinish}
          editing={editing}
        />
      )}
    </div>
  )
}
export default MyHistory

const HistoryUl = styled.ul`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    position: relative;
    p {
      position: absolute;
      bottom: 0;
      left: 105px;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.005em;
      color: #8c8d96;
      margin-right: 10px;
      padding: 10px 0;
      span:not(:last-child)::after {
        content: '|';
        margin: 0 5px;
      }
    }
  }
`
