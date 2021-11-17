import React, { useState } from 'react'
import { Modal, Input, Form, Rate } from 'antd'
import Navbar from 'components/Common/Navbar'
import Button from 'styled-components/Buttons'
import AvatarBase from 'styled-components/AvatarBase'
import Flexbox from 'styled-components/Flexbox'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

function MyHistory() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [phoneNum, setPhoneNum] = useState(true)

  const [review, setReview] = useState(true)

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

  const onFinish = (values) => {}
  return (
    <div>
      <Navbar />
      <Flexbox>
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
              <Button
                Secondary
                height={'25px'}
                width={'80px'}
                onClick={showNum}
                style={{ fontSize: '12px', fontWeight: '400' }}
              >
                전화번호
              </Button>
              {phoneNum && <a href="tel:010-3339-8058">010-3339-8058</a>}
            </div>
            <p className="info">
              <span>장충테니스장</span>
              <span>2021-01-26</span>
              <span>경기완료</span>
            </p>
          </div>
        </AvatarBase>
        {review ? (
          <Button Outlined onClick={showModal}>
            리뷰쓰기
          </Button>
        ) : (
          <Button>리뷰완료</Button>
        )}
      </Flexbox>
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
            <Rate />
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
