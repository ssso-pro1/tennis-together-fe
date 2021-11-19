import React, { useState, useContext } from 'react'
import { UserContext } from 'service/authState'
import { Modal, Input, Form, Rate, Select } from 'antd'
import styled from 'styled-components'

import Navbar from 'components/Common/Navbar'
import Button from 'styled-components/Buttons'
import AvatarBase from 'styled-components/AvatarBase'
import Flexbox from 'styled-components/Flexbox'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import Profile from './Profile'
import BallDefault from './BallDefault'

function MyHistory() {
  const { user } = useContext(UserContext)
  const HistoryList = styled.div`
    width: 65%;

    .avatar-header {
      .avatarImg {
        height: 80px;
        width: 80px;
      }
      .avatar-info {
        width: 70%;
        margin: 0 20px;
        .nickname {
          strong {
            font-size: 18px;
            font-weight: 700;
          }
        }
        .info {
          display: block;
        }
      }
    }
  `

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [phoneNum, setPhoneNum] = useState(false)

  const [review, setReview] = useState(true)
  const { Option } = Select

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const showNum = () => {
    setPhoneNum(!phoneNum)
  }

  const customIcons = {
    1: <BallDefault />,
    2: <BallDefault />,
    3: <BallDefault />,
    4: <BallDefault />,
    5: <BallDefault />,
  }

  const onFinish = (values) => {}
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
      <Flexbox jc={'space-around'}>
        <Profile style={{ width: '25%' }} />
        <HistoryList>
          <AvatarBase className="avatar-header">
            <a href="" className="avatarImg">
              <img src={DefaultImg} alt={DefaultImg} />
            </a>

            <div className="avatar-info">
              <a href="" className="nickname">
                <strong>호두</strong>
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
                <a href="tel:010-3339-8058" style={{ color: 'black' }}>
                  010-3339-8058
                </a>
              )}
              <p className="info">
                <span>장충테니스장</span>
                <span>2021-01-26</span>
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
          <AvatarBase className="avatar-header">
            <a href="" className="avatarImg">
              <img src={DefaultImg} alt={DefaultImg} />
            </a>

            <div className="avatar-info">
              <a href="" className="nickname">
                <strong>호두누나</strong>
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
                <a href="tel:010-3339-8058" style={{ color: 'black' }}>
                  010-3339-8058
                </a>
              )}
              <p className="info">
                <span>장충테니스장</span>
                <span>2021-01-26</span>
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
      </Flexbox>

      {/* 모달창 */}
      <Modal
        title="리뷰쓰기 "
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AvatarBase>
          <a
            href=""
            className="avatarImg"
            style={{ height: '80px', width: '80px' }}
          >
            <img src={DefaultImg} alt={DefaultImg} />
          </a>
          <div>
            <div>
              <a href="" className="nickname" fs={'50px'}>
                <strong style={{ fontSize: '18px', fontWeight: '700' }}>
                  호두누나
                </strong>
              </a>
            </div>
            <p className="info">
              <span>장충테니스장</span>
              <span>2021-01-26</span>
              <span>경기완료</span>
            </p>
          </div>
        </AvatarBase>

        {/* 신청자 정보가 들어가겟지..?  */}
        <Form onFinish={onFinish}>
          <Form.Item
            name="rate"
            rules={[
              {
                required: true,
                message: '별점을 입력하세요',
              },
            ]}
          >
            <Rate
              className="rate"
              defaultValue={3}
              character={({ index }) => customIcons[index + 1]}
            />
          </Form.Item>
          <Form.Item
            name="reviewContent"
            rules={[
              {
                required: true,
                message: '리뷰를 입력하세요',
              },
            ]}
          >
            <p>리뷰작성</p>
            <Input.TextArea placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다"></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MyHistory
