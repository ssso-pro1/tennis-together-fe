import React, { useState, useEffect } from 'react'
import { Row, Col, Spin } from 'antd'
import styled from 'styled-components'
import baseApi from 'service/baseApi'
import Button from 'components/common/Buttons'
import AvatarBase from 'components/common/AvatarBase'
import DefaultImg from 'components/common/images/img-user-default.png'
import Profile from './Profile'
import { antIcon } from 'components/common/constants'
import ReviewModal from './ReviewModal'
import Flexbox from 'components/common/Flexbox'

const MyHistory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [playgames, setPlaygames] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [gameData, setGameData] = useState(null)

  // 완료된 게임
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const review = await baseApi.get(`/reviews`)
      setReviews(review.data.content)
      const resgame = await baseApi(`games/histories/playgames`) //
      setPlaygames(resgame.data.content)
    } catch (err) {
      console.log(err)
    }
  }
  console.log('resgame', playgames)
  console.log('review', reviews)

  const showModal = (playgame) => {
    setIsModalVisible(true)
    setGameData(playgame)
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
  var revierCheck
  return (
    <div>
      <h2
        style={{
          fontWeight: '700',
          fontSize: '20px',
          padding: '25px 0 25px 400px',
          borderBottom: '1px solid lightgrey',
          marginBottom: '50px',
        }}
      >
        히스토리
      </h2>

      <Row>
        <Col span={5} offset={3}>
          <Profile />
        </Col>
        <Col span={14}>
          <HistoryList>
            {playgames ? (
              playgames.map((playgame) => (
                <AvatarBase
                  key={playgame.gameUserNo}
                  className="avatar-header"
                  style={{ marginLeft: '20px' }}
                >
                  <div
                    className="avatarImg"
                    style={{ width: '60px', height: '60px' }}
                  >
                    <img src={DefaultImg} alt={DefaultImg} />
                  </div>
                  <div className="avatar-info">
                    <strong className="nickname" props={'18px'}>
                      {playgame.userPlayedWith.nickname}
                    </strong>

                    <p className="info">
                      <span>{playgame.joinedGame.court.name}</span>
                      <span>{playgame.regDtm.split('T')[0]}</span>
                      <span>경기완료</span>
                    </p>
                  </div>
                  <div className="reviewButton">
                    {
                      (revierCheck = reviews.find((review) => {
                        {
                          playgame.joinedGame.gameNo === review.game.gameNo &&
                          playgame.userPlayedWith.uid === review.recipient.uid
                            ? (review = Boolean(true))
                            : (review = Boolean(false))
                        }
                      }))
                    }
                    {revierCheck ? (
                      <Button Outlined onClick={() => showModal(playgame)}>
                        리뷰쓰기
                      </Button>
                    ) : (
                      <Button>리뷰완료</Button>
                    )}
                  </div>
                </AvatarBase>
              ))
            ) : (
              <Flexbox>
                <Spin indicator={antIcon} style={{ marginTop: '150px' }} />
              </Flexbox>
            )}
            <ReviewModal
              setIsModalVisible={setIsModalVisible}
              handleCancel={handleCancel}
              isModalVisible={isModalVisible}
              gameData={gameData}
              onFinish={onFinish}
            />
          </HistoryList>
        </Col>
      </Row>
    </div>
  )
}
const HistoryList = styled.div`
  width: 60%;

  .avatar-header {
    .avatarImg {
      height: 80px;
      width: 80px;
    }
    .avatar-info {
      width: 70%;
      margin: 0 20px;
      .nickname {
        margin: 0 10px 0 0;
        strong {
          font-size: 18px;
          font-weight: 700;
        }
      }
      .info {
        display: block;
        margin-top: 5px;
      }
    }
  }
`
export default MyHistory
