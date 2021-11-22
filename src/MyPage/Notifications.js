import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import baseApi from 'service/baseApi'
import { UserContext } from 'service/authState'
import Navbar from 'components/Common/Navbar'
import Profile from './Profile'
import { Select, Row, Col } from 'antd'
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

  const [allGames, setAllGames] = useState(null)

  // game data
  useEffect(() => {
    baseApi(`/games`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }) //
      .then((response) => {
        setAllGames(response.data.content)
      })
  }, [])

  if (allGames !== null && user !== null) {
    var myGames = allGames.filter((e) => e.gameCreator.uid === user.uid)
    console.log('이놈', myGames)
    // 게임 넘버만 잇는 배열
    var gameApplyUsers = []

    myGames.map(
      (myGame) => (gameApplyUsers[myGame.gameNo] = { gameNo: myGame.gameNo })
    )

    console.log('이놈2', gameApplyUsers)
    //   for (var item of myGames) {
    //     if (item.gameNo) {
    //     gameApplyUsers[item.gameNo] = { gameNo: item.gameNo }
    //   }
    // }
  }

  //게임에 요청한 유저들
  useEffect(() => {
    if (allGames !== null) {
      baseApi(`/games/${gameNo}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        console.log('몇번인', response.data)
        setApplyUsers(response.data.content)
      })
    }
  }, [])

  console.log('야잉', gameApplyUsers)

  // 중복은 제거됨
  console.log('신청자', applyUsers)

  // 나는 게임넘버를 오만곳에다 쓰고싶은디..
  console.log('게임넘', gameNo)

  // 그래서 for of 문을 두번 돌렷더니 하나만 클릭해도 모든 글이 수락된다..
  const approveGame = () => {
    if (
      allGames !== null &&
      applyUsers !== null &&
      window.confirm('수락 하시겠습니까?')
    ) {
      for (var item of myGames) {
        var gameNo = item.gameNo
        for (var e of applyUsers) {
          var userUid = e.gameUser.uid
          console.log('나오니', userUid)
          console.log('나오니넘버', gameNo)
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
    }
  }
  // const cancelGame = () => {
  //   if (window.confirm('거절 하시겠습니까?')) {
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
      <Row>
        <Col span={14} offset={4}>
          <Flexbox jc={'space-around'}>
            <Profile style={{ width: '40%' }} />
            <div style={{ width: '60%' }}>
              {applyUsers ? (
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
                      <strong>{applyUser.gameUser.nickname}</strong>
                    </a>
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
            </div>
          </Flexbox>
        </Col>
      </Row>
    </div>
  )
}

export default Notifications
