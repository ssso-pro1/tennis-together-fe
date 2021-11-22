import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from 'service/authState'
import { Modal, Input, Form, Rate, Select, Row, Col } from 'antd'
import styled from 'styled-components'
import baseApi from 'service/baseApi'
import Navbar from 'components/Common/Navbar'
import Button from 'styled-components/Buttons'
import AvatarBase from 'styled-components/AvatarBase'
import Flexbox from 'styled-components/Flexbox'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import Profile from './Profile'
import BallDefault from './BallDefault'

function MyHistory() {
  const ModalStyle = styled(Modal)`
    .ant-modal-title {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }
    .ant-modal-footer {
      display: none;
    }
    .userInfo {
      margin-left: 15px;
      .nickname {
        margin: 0;
      }
    }
    .ant-form-item {
      margin-bottom: 0;
    }
    .submitBtn {
      width: 200px;
    }
    .innerP {
      font-size: 14px;
      font-weight: 700;
    }
    .manner {
      margin: 5px 10px 0 0;
    }
    textarea {
      margin: 10px 0 30px 0;
    }
  `
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
  const [review, setReview] = useState(true)
  const { Option } = Select

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
    console.log('리뷰등록', values)

    baseApi
      .post(
        '/reviews',
        {
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
      })
      .catch(function (error) {
        console.log(error)
      })
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showNum = () => {
    setPhoneNum(!phoneNum)
  }
  if (playgames !== null) {
    var dates = playgames.joinedGame.updDtm.split('T')
  }
  const customIcons = {
    1: <BallDefault />,
    2: <BallDefault />,
    3: <BallDefault />,
    4: <BallDefault />,
    5: <BallDefault />,
  }

  return (
    <div>
      <Navbar />
      <Flexbox
        className="mypage-header"
        style={{
          height: '70px',
          borderBottom: '1px solid lightgrey',
          marginBottom: '50px',
        }}
      >
        <h2 style={{ fontWeight: '700', fontSize: '20px', width: '25%' }}>
          히스토리
        </h2>
        <div style={{ width: '50%' }}>
          <Select
            className="form-select"
            defaultValue="1"
            style={{ width: 500 }}
            placeholder="리뷰쓰기"
          >
            <Option value="1">리뷰쓰기</Option>
            <Option value="2">리뷰완료</Option>
          </Select>
        </div>
        <Button Secondary height={'30px'} width={'60px'} fs={'14px'}>
          검색
        </Button>
      </Flexbox>
      <Row>
        <Col span={14} offset={4}>
          <Flexbox jc={'space-around'}>
            <Profile style={{ width: '40%' }} />
            {playgames &&
              playgames.content.map((playgame) => (
                <HistoryList>
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
                        <a href="tel:" style={{ color: 'black' }}>
                          {playgame.userPlayedWith.phone}
                        </a>
                      )}
                      <p className="info">
                        <span>{playgame.joinedGame.court.name}</span>
                        <span>{dates[0]}</span>
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
                </HistoryList>
              ))}
          </Flexbox>
        </Col>
      </Row>

      {/* 모달창 */}
      <ModalStyle
        title="리뷰쓰기 "
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <Flexbox>
          <AvatarBase>
            <a
              href=""
              className="avatarImg"
              style={{ height: '80px', width: '80px' }}
            >
              <img src={DefaultImg} alt={DefaultImg} />
            </a>
            <div className="userInfo">
              <a href="" className="nickname" fs={'50px'}>
                <strong style={{ fontSize: '18px', fontWeight: '700' }}>
                  호두누나
                </strong>
              </a>

              <p className="info">
                <span>장충테니스장</span>
                <span>2021-01-26</span>
                <span>경기완료</span>
              </p>
            </div>
          </AvatarBase>
        </Flexbox>

        <Form onFinish={onFinish}>
          <Flexbox>
            <p className="innerP manner">매너평가</p>
            <Form.Item
              name="score"
              rules={[
                {
                  required: true,
                  message: '별점을 입력하세요',
                },
              ]}
            >
              <Rate
                className="rate"
                character={({ index }) => customIcons[index + 1]}
              />
            </Form.Item>
          </Flexbox>
          <p className="innerP">리뷰작성</p>
          <Form.Item
            name="reviewContent"
            rules={[
              {
                required: true,
                message: '리뷰를 입력하세요',
              },
            ]}
          >
            <Input.TextArea placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다"></Input.TextArea>
          </Form.Item>
          <Flexbox>
            <Form.Item>
              <Button type="submit" className="submitBtn">
                발행
              </Button>
            </Form.Item>
          </Flexbox>
        </Form>
      </ModalStyle>
    </div>
  )
}

export default MyHistory
