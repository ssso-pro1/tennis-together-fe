import React, { useContext, useState, useEffect } from 'react'

import PopUpProfile from 'components/PopUpProfile/PopUpProfile'

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

  if (allGames !== null && user !== null) {
    var myGames = allGames.filter((e) => e.gameCreator.uid === user.uid)
  }

  //게임에 요청한 유저들
  useEffect(() => {
    if (allGames !== null) {
      var array = []
      for (var item of myGames) {
        var gameNo = item.gameNo

        baseApi(`/games/${gameNo}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((response) => {
          // console.log(response.data.content)
          array.push(...response.data.content)
        })
      }
      setApplyUsers(array)
    }
  }, [])
  console.log('내글신청한사람들', applyUsers)

  const approveGame = () => {
    if (applyUsers !== null) {
      for (var item of applyUsers) {
        var gameNo = item.joinedGame.gameNo
        var userUid = item.gameUser.uid

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
            alert('수락이 완료된 글 입니다.')
          })
      }
    }
  }

  // const cancelGame = () => {
  //   if (user !== null && window.confirm('거절 하시겠습니까?')) {
  //     baseApi
  //       .post(`/games/${gameNo}/cancel`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       })
  //       .then(function (response) {
  //         console.log('거절완료', response)
  //         alert('거절 되었습니다')
  //       })
  //       .catch(function (error) {
  //         console.log(error)
  //       })
  //   }
  // }

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
              {applyUsers !== null ? (
                applyUsers.map((applyUser) => (
                  <AvatarBase>
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
                      <strong onClick={showModal}>
                        {applyUser.gameUser.nickname}
                      </strong>
                    </a>
                    <p>님이</p>
                    <a
                      href=""
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'black',
                      }}
                    >
                      {applyUser.joinedGame.title}
                    </a>
                    <p>글에 신청했습니다.</p>
                    <CheckCircleOutlined
                      style={{ fontSize: '20px', cursor: 'pointer' }}
                      onClick={approveGame}
                    />
                    <CloseCircleOutlined
                      style={{ fontSize: '20px', cursor: 'pointer' }}
                      //onClick={cancelGame}
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
