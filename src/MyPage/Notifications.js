import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PopUpProfile from 'components/PopUpProfile/PopUpProfile'
import { antIcon } from 'components/Common/constants'
import baseApi from 'service/baseApi'
import { UserContext } from 'service/authState'
import Profile from './Profile'
import { Row, Col, Modal, Spin } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Flexbox from 'styled-components/Flexbox'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

const Notifications = () => {
  const { user } = useContext(UserContext)
  const [applyUsers, setApplyUsers] = useState(null)
  const [applyGames, setApplyGames] = useState(null)
  const [clickTab, setClickTab] = useState(0)
  const [loading, setLoading] = useState(false)

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
  console.log('참여한게임', applyGames)

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
      <Notinav>
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
          <span
            onClick={() => {
              setClickTab(0)
            }}
          >
            내가 쓴 글
          </span>
          <span
            onClick={() => {
              setClickTab(1)
            }}
          >
            신청한 글
          </span>
        </h2>
      </Notinav>

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
            <div style={{ width: '60%' }}>
              {clickTab === 0 ? (
                <div className="mygame">
                  {applyUsers ? (
                    applyUsers.map((applyUser) => (
                      <AvatarBase key={applyUser.gameUserNo}>
                        <a
                          onClick={showModal}
                          href="#"
                          className="avatarImg"
                          style={{ height: '40px', width: '40px' }}
                        >
                          <img src={DefaultImg} alt={DefaultImg} />
                        </a>
                        <strong
                          className="nickname"
                          style={{ fontSize: '16px', fontWeight: '700' }}
                        >
                          {applyUser.gameUser.nickname}
                        </strong>
                        {applyUser.status === 'APPLYING' ? (
                          <div>
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
                          </div>
                        ) : applyUser.status === 'APPROVED' ? (
                          <p>님을 ✔수락✔ 했습니다.</p>
                        ) : (
                          <p>님을 ❌거절❌ 했습니다.</p>
                        )}
                        {applyUser.status === 'APPLYING' ? (
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
                        ) : null}
                      </AvatarBase>
                    ))
                  ) : (
                    <p>신청글이 없습니다😭</p>
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
              ) : (
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
          </Col>
        )}
      </Row>
    </div>
  )
}
const Notinav = styled.div`
  h2 {
    font-weight: 700;
    font-size: 20px;
    padding: 25px 0 25px 400px;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 50px;
    span {
      cursor: pointer;
      font-weight: 700;
      font-size: 15px;
      color: gray;
      transition: color 150ms ease-in-out;
      margin-left: 15px;
      &:hover {
        color: black;
      }
    }
  }
`
export default Notifications
