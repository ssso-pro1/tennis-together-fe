import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { antIcon } from 'components/common/constants'
import baseApi from 'service/baseApi'
import { UserContext } from 'service/authState'
import Profile from './Profile'
import { Row, Col, Modal, Spin } from 'antd'
import Flexbox from 'components/common/Flexbox'
import AvatarBase from 'components/common/AvatarBase'
import MyPageNav from './MyPageNav'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import MyGames from './MyGames'

const Notifications = () => {
  const { user } = useContext(UserContext)
  const [applyUsers, setApplyUsers] = useState(null)
  const [applyGames, setApplyGames] = useState(null)
  const [clickTab, setClickTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
    // console.log('e.target', e.target)
    // console.log('e.target.applyUser', e.target.applyUser)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  // applyUsers && console.log('applyUsers', applyUsers)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const allmygames = await baseApi(`/games`)

      let array = []
      for await (let item of allmygames.data.content) {
        let gameNo = item.gameNo
        if (user && item.gameCreator.uid === user.uid) {
          let userData = await baseApi(`/games/${gameNo}/users`)
          array.push(...userData.data.content)
        }
      }
      setApplyUsers(array)

      const applyGame = await baseApi(`games/histories/applygames`)
      setApplyGames(applyGame.data.content)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  console.log('어플라이유저', applyUsers)

  useEffect(() => {
    console.log('applyUsers게임에신청유저들', applyUsers)
  }, [setApplyUsers])

  // 게임수락
  const approveGame = async (gameNo, userUid) => {
    try {
      const approve = await baseApi.post(`/games/${gameNo}/approve/${userUid}`)
      alert('수락 되었습니다')
      const res = await baseApi.get(`games/histories/applygames`)
      setApplyUsers(res.data.content)
    } catch (error) {
      console.log(error)
      alert('수락기간이 지난 글 입니다.')
    }
  }

  // 게임거절
  const cancelGame = async (gameNo, userUid) => {
    if (window.confirm('거절 하시겠습니까?')) {
      try {
        const cancel = await baseApi.post(`/games/${gameNo}/refuse/${userUid}`)

        if (cancel.data) {
          console.log('거절완료')
          alert('거절 되었습니다')
        }
        const res = await baseApi.get(`games/histories/applygames`)
        setApplyUsers(res.data.content)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <MyPageNav>
        <li>알림</li>
        <li
          onClick={() => {
            setClickTab(0)
          }}
        >
          내가 쓴 글
        </li>
        <li
          onClick={() => {
            setClickTab(1)
          }}
        >
          신청한 글
        </li>
      </MyPageNav>

      <Row>
        <Col span={5} offset={3}>
          <Profile />
        </Col>
        {loading ? (
          <Flexbox>
            <Spin indicator={antIcon} style={{ marginLeft: '150px' }} />
          </Flexbox>
        ) : (
          <Col span={14}>
            {applyGames && (
              <div style={{ width: '60%' }}>
                {clickTab === 0 && (
                  <MyGames
                    applyUsers={applyUsers}
                    approveGame={approveGame}
                    cancelGame={cancelGame}
                  />
                )}
                {clickTab === 1 && (
                  <div className="yourgame">
                    {applyGames ? (
                      applyGames.map((applyGame) => (
                        <div>
                          <AvatarBase>
                            <a
                              onClick={showModal}
                              href="#!"
                              className="avatarImg"
                              style={{ height: '40px', width: '40px' }}
                            >
                              <img src={DefaultImg} alt={DefaultImg} />
                            </a>

                            <Link
                              to={`/pages/detail/${applyGame.joinedGame.gameNo}`}
                              className="nickname"
                              style={{
                                fontSize: '16px',
                                fontWeight: '700',
                                color: 'black',
                                margin: '0 8px',
                              }}
                            >
                              {applyGame.joinedGame.title}
                            </Link>
                            {applyGame.status === 'APPLYING' ? (
                              <p>글에 신청되었습니다.</p>
                            ) : applyGame.status === 'APPROVED' ? (
                              <p>경기 신청이 ✔수락✔ 되었습니다.</p>
                            ) : (
                              <p>경기 신청이 ❌거절❌ 되었습니다.</p>
                            )}
                          </AvatarBase>
                        </div>
                      ))
                    ) : (
                      <p>신청글이 없습니다😭</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Notifications
