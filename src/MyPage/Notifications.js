import React, { useContext, useState, useEffect } from 'react'

import PopUpProfile from 'components/PopUpProfile/PopUpProfile'
import { useParams } from 'react-router'
import baseApi from 'service/baseApi'
import { UserContext } from 'service/authState'
import Navbar from 'components/Common/Navbar'
import Profile from './Profile'
import { Row, Col, Modal } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Flexbox from 'styled-components/Flexbox'

import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

function Notifications() {
  const { user } = useContext(UserContext)
  const { gameNo } = useParams()

  const [applyUsers, setApplyUsers] = useState(null)

  const [allGames, setAllGames] = useState(null)

  //game data
  useEffect(() => {
    baseApi(`/games`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      setAllGames(response.data.content)
    })
  }, [])

  // if (allGames !== null && user !== null) {
  //   var myGames = allGames.filter((e) => e.gameCreator.uid === user.uid)
  //   console.log('내가쓴글', myGames)
  // }

  //게임에 요청한 유저들
  useEffect(() => {
    if (user !== null) {
      baseApi(`/games/${gameNo}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        console.log('몇번', response.data)
        setApplyUsers(response.data.content)
      })
    }
  }, [])
  console.log('내글신청자', applyUsers)

  // 그래서 for of 문을 두번 돌렷더니 하나만 클릭해도 모든 글이 수락된다..
  // const approveGame = () => {
  //   baseApi
  //     .post(`/games/${gameNo}/approve/${userUid}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log('수락완료', response)
  //       alert('수락 되었습니다')
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
  const cancelGame = () => {
    if (user !== null && window.confirm('거절 하시겠습니까?')) {
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
      <h2
        style={{
          fontWeight: '700',
          fontSize: '20px',
          padding: '25px 0 25px 400px',
          borderBottom: '1px solid lightgrey',
          marginBottom: '50px',
        }}
      >
        알림
      </h2>

      <Row>
        <Col span={14} offset={4}>
          <Flexbox jc={'space-around'}>
            <Profile style={{ width: '40%' }} />
            <div style={{ width: '60%' }}>
              {applyUsers ? (
                applyUsers.map((applyUser) => (
                  <AvatarBase onClick={showModal}>
                    <a
                      href=""
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
                      <strong>{applyUser.gameUser.nickname}</strong>
                    </a>
                    <CheckCircleOutlined
                      style={{ fontSize: '20px', cursor: 'pointer' }}
                      //onClick={approveGame}
                    />
                    <CloseCircleOutlined
                      style={{ fontSize: '20px', cursor: 'pointer' }}
                      onClick={cancelGame}
                    />
                  </AvatarBase>
                ))
              ) : (
                <p>신청글이 없습니다</p>
              )}

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
