import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from 'service/authState'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import baseApi from 'service/baseApi'
import Navbar from 'components/Common/Navbar'
import Button from 'styled-components/Buttons'
import AvatarBase from 'styled-components/AvatarBase'
import Flexbox from 'styled-components/Flexbox'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import Profile from './Profile'

import ReviewModal from './ReviewModal'

function MyHistory() {
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

  const { user } = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [phoneNum, setPhoneNum] = useState(false)
  const [playgames, setPlaygames] = useState(null)
  const [review, setReview] = useState(null)

  // 완료된 게임
  useEffect(() => {
    baseApi(`games/histories/playgames`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }) //
      .then((response) => {
        console.log(response)
        setPlaygames(response.data)
      })
  }, [])

  console.log('완료게임', playgames)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const onFinish = (values) => {
    setIsModalVisible(false)
    console.log('리뷰등록', values)

    baseApi
      .post(
        '/reviews',
        {
          gameNo: values.gameNo,
          reviewContent: values.reviewContent,
          score: values.score,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(function (response) {
        console.log('리뷰등록', response)
        alert('리뷰가 등록되었습니다')
        baseApi.get(`/reviews`).then((response) => {
          setReview(response.data)
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showNum = () => {
    setPhoneNum(!phoneNum)
  }

  return (
    <div>
      <Navbar />

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
        <Col span={14} offset={4}>
          <Flexbox jc={'space-around'}>
            <Profile style={{ width: '40%' }} />
            <HistoryList>
              {playgames &&
                playgames.content.map((playgame) => (
                  <AvatarBase className="avatar-header">
                    <a href="" className="avatarImg">
                      <img src={DefaultImg} alt={DefaultImg} />
                    </a>
                    <div className="avatar-info">
                      <a href="" className="nickname">
                        <strong>{playgame.userPlayedWith.nickname}</strong>
                      </a>
                      <Button
                        Secondary
                        height={'25px'}
                        width={'80px'}
                        onClick={showNum}
                        style={{ fontSize: '12px', fontWeight: '400' }}
                      >
                        전화번호
                      </Button>
                      {phoneNum && (
                        <a
                          href="tel:"
                          style={{ color: 'black', fontSize: '14px' }}
                        >
                          {playgame.userPlayedWith.phone}
                        </a>
                      )}
                      <p className="info">
                        <span>{playgame.joinedGame.court.name}</span>
                        <span>{playgame.regDtm.split('T')[0]}</span>
                        <span>경기완료</span>
                      </p>
                    </div>
                    <div className="reviewButton">
                      {review ? (
                        <Button Outlined onClick={showModal}>
                          리뷰쓰기
                        </Button>
                      ) : (
                        <Button>리뷰완료</Button>
                      )}
                    </div>
                  </AvatarBase>
                ))}
            </HistoryList>
          </Flexbox>
        </Col>
      </Row>
      {playgames &&
        playgames.content.map((playgame) => (
          <ReviewModal
            setIsModalVisible={setIsModalVisible}
            onFinish={onFinish}
            playgame={playgame}
            handleCancel={handleCancel}
            isModalVisible={isModalVisible}
          />
        ))}
    </div>
  )
}

export default MyHistory
