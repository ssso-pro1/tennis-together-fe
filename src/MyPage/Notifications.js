
import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import PopUpProfile from 'components/PopUpProfile/PopUpProfile'
import { useParams } from 'react-router'
import baseApi from 'service/baseApi'
import { UserContext } from 'service/authState'
import Navbar from 'components/Common/Navbar'
import Profile from './Profile'
import { Select, Row, Col, Modal } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Flexbox from 'styled-components/Flexbox'
import Button from 'styled-components/Buttons'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

function Notifications() {
  const { user } = useContext(UserContext)
  const { gameNo } = useParams()
  const { Option } = Select
  const [applyUsers, setApplyUsers] = useState(null)
  const [myGames, setMyGames] = useState(null)
  const [allGames, setAllGames] = useState(null)

  // game data
  useEffect(() => {
    baseApi(`/games`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }) //
      .then((response) => {
        // console.log('유저', user.uid)
        // console.log('게임', allGames.content.gameCreator.uid)
        console.log('제발', response)
        setAllGames(response.data)
        // console.log('게임', allGames.content)
        // if (user.uid === allGames.gameCreator.uid) {
        //   setMyGames()
        // }
      })
  }, [])
  // console.log('게임', allGames.content.gameCreator.uid)

  // 게임에 요청한 유저들
  useEffect(() => {
    // baseApi(`/games/${gameNo}/users`, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    // }).then((response) => {
    //   console.log('신청자들', response)
    //   setApplyUsers(response.data)
    // })
  }, [])

  const approveGame = () => {
    const userUid = setApplyUsers.uid
    console.log('나오니', userUid)
    if (window.confirm('수락 하시겠습니까?')) {
      baseApi
        .post(`/games/${gameNo}/approve/${userUid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(function (response) {
          console.log('수락완료', response)
          alert('수락 되었습니다')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const cancelGame = () => {
    if (window.confirm('거절 하시겠습니까?')) {
      baseApi
        .post(`/games/${gameNo}/cancel`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(function (response) {
          console.log('거절완료', response)
          alert('거절 되었습니다')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Navbar />
      <Flexbox
        style={{
          height: '70px',
          borderBottom: '1px solid lightgrey',
          marginBottom: '50px',
        }}
      >
        <h2 style={{ fontWeight: '700', fontSize: '20px', width: '25%' }}>
          알림
        </h2>
        <div style={{ width: '50%' }}>
          <Select
            className="form-select"
            defaultValue="1"
            style={{ width: 500 }}
            placeholder="모든알림"
          >
            <Option value="1">모든알림</Option>
            <Option value="2">게임신청</Option>
            <Option value="3">게임수락</Option>
          </Select>
        </div>
        <Button Secondary height={'30px'} width={'60px'} fs={'14px'}>
          검색
        </Button>
      </Flexbox>

      <Flexbox>
        <Profile />
        <div style={{ width: '55%' }}>
          <AvatarBase onClick={showModal}>
            <a
              href="#"
              className="avatarImg"
              style={{ height: '40px', width: '40px' }}
            >
              <img src={DefaultImg} alt={DefaultImg} />
            </a>
            <a
              href=""
              className="nickname"
              style={{ fontSize: '16px', fontWeight: '700' }}
            >
              <strong>코코</strong>
            </a>
            <CheckCircleOutlined
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={approveGame}
            />
            <CloseCircleOutlined
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={cancelGame}
            />
          </AvatarBase>
        
        </div>
      </Flexbox>

      <Row>
        <Col span={14} offset={4}>
          <Flexbox jc={'space-around'}>
            <Profile style={{ width: '40%' }} />
            <div style={{ width: '60%' }}>
              <AvatarBase  onClick={showModal}>
                <a
                  href="#"
                  className="avatarImg"
                  style={{ height: '40px', width: '40px' }}
                >
                  <img src={DefaultImg} alt={DefaultImg} />
                </a>
                <a
                  href=""
                  className="nickname"
                  style={{ fontSize: '16px', fontWeight: '700' }}
                >
                  <strong>코코</strong>
                </a>
                <CheckCircleOutlined
                  style={{ fontSize: '20px', cursor: 'pointer' }}
                  onClick={approveGame}
                />
                <CloseCircleOutlined
                  style={{ fontSize: '20px', cursor: 'pointer' }}
                  onClick={cancelGame}
                />
              </AvatarBase>
  <Modal
            title="프로필 및 리뷰리스트"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
          >
            <PopUpProfile />
          </Modal>
            </div>
          </Flexbox>
        </Col>
      </Row>

    </div>
  )
}

export default Notifications
