import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PopUpProfile from 'components/PopUpProfile/PopUpProfile'

import baseApi from 'service/baseApi'
import { UserContext } from 'service/authState'
import Navbar from 'components/Common/Navbar'
import Profile from './Profile'
import { Row, Col, Modal, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Flexbox from 'styled-components/Flexbox'

import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

function Notifications() {
  const { user } = useContext(UserContext)
  const [applyUsers, setApplyUsers] = useState(null)
  const [allGames, setAllGames] = useState(null)
  const [loading, setLoading] = useState(true)
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 32, color: '#11992f' }} spin />
  )

  useEffect(() => {
    fetchData()
  }, [applyUsers, allGames, user])

  const fetchData = async () => {
    try {
      if (user) {
        const allmygames = await baseApi(`/games`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        // setAllGames(allmygames.data.content)
        setAllGames(allmygames.data.content)
        // var myGames = await allGames.filter(
        //   (e) => e.gameCreator.uid === user.uid
        // )
      }
      const myGames = [...allGames]

      // const myGames = await allGames.filter(
      //   (e) => e.gameCreator.uid === user.uid
      // )
      //console.log('내가쓴글', allmygames)
      let array = []
      for (let item of myGames) {
        let gameNo = item.gameNo
        if (item.gameCreator.uid === user.uid) {
          await baseApi(`/games/${gameNo}/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }).then((response) => {
            array.push(...response.data.content)
          })
        }
      }
      setApplyUsers(array)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  // //game data
  // useEffect(() => {
  //   baseApi(`/games`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   }).then((response) => {
  //     setAllGames(response.data.content)
  //   })
  // }, [])

  // console.log('모든게임', allGames)
  // // if (allGames !== null && user !== null) {
  // //   var myGames = allGames.filter((e) => e.gameCreator.uid === user.uid)
  // // }
  // // console.log('내가쓴글', myGames)

  // //게임에 요청한 유저들
  // useEffect(() => {
  //   if (allGames !== null || user !== null) {
  //     let myGames = allGames.filter((e) => e.gameCreator.uid === user.uid)
  //     console.log('내가쓴글', myGames)

  //     let array = []
  //     for (let item of myGames) {
  //       let gameNo = item.gameNo

  //       baseApi(`/games/${gameNo}/users`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }).then((response) => {
  //         array.push(...response.data.content)
  //       })
  //     }
  //     setApplyUsers(array)
  //   }
  // }, [allGames])

  // console.log('신청한사람', applyUsers)

  // 게임수락
  const approveGame = (gameNo, userUid) => {
    baseApi
      .post(`/games/${gameNo}/approve/${userUid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(function (response) {
        console.log('수락완료', response)
        alert('수락 되었습니다')
        baseApi.get(`games/histories/applygames`).then((response) => {
          setApplyUsers(response.data.content)
        })
      })
      .catch(function (error) {
        console.log(error)
        alert('수락기간이 지난 글 입니다.')
      })
  }

  // 게임거절
  const cancelGame = (gameNo, userUid) => {
    if (window.confirm('거절 하시겠습니까?')) {
      baseApi
        .post(`/games/${gameNo}/refuse/${userUid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(function (response) {
          console.log('거절완료', response)
          alert('거절 되었습니다')
          baseApi.get(`games/histories/applygames`).then((response) => {
            setApplyUsers(response.data.content)
          })
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
        <Col span={16} offset={2}>
          <Flexbox jc={'space-around'}>
            <Profile style={{ width: '40%' }} />
            {loading ? (
              <Spin indicator={antIcon} />
            ) : (
              <div style={{ width: '60%' }}>
                {applyUsers.map((applyUser) => (
                  <AvatarBase key={applyUser.gameUserNo}>
                    <a
                      onClick={showModal}
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
                      <strong>{applyUser.gameUser.nickname}</strong>
                    </a>
                    <p>님이</p>
                    <Link
                      to={`/pages/detail/${applyUser.joinedGame.gameNo}`}
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'black',
                        margin: '0 8px',
                      }}
                    >
                      {applyUser.joinedGame.title}
                    </Link>
                    <p>글에 신청했습니다.</p>
                    {applyUser.status == 'APPLYING' ? (
                      <div>
                        <CheckCircleOutlined
                          style={{
                            fontSize: '20px',
                            cursor: 'pointer',
                            margin: '0 5px',
                          }}
                          onClick={() =>
                            approveGame(
                              applyUser.joinedGame.gameNo,
                              applyUser.gameUser.uid
                            )
                          }
                        />
                        <CloseCircleOutlined
                          style={{ fontSize: '20px', cursor: 'pointer' }}
                          onClick={() =>
                            cancelGame(
                              applyUser.joinedGame.gameNo,
                              applyUser.gameUser.uid
                            )
                          }
                        />
                      </div>
                    ) : applyUser.status == 'APPROVED' ? (
                      <p>수락완료</p>
                    ) : (
                      <p>거절완료</p>
                    )}
                    <Modal
                      title="프로필 및 리뷰리스트"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      width={1000}
                    >
                      <PopUpProfile applyUser={applyUser} />
                    </Modal>
                  </AvatarBase>
                ))}
              </div>
            )}
          </Flexbox>
        </Col>
      </Row>
    </div>
  )
}

export default Notifications
