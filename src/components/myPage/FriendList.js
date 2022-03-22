import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'
import Profile from './Profile'
import Flexbox from 'components/common/Flexbox'
import FriendItem from './FriendItem'
import styled from 'styled-components'
import { Spin } from 'antd'
import { antIcon } from 'components/common/constants'

const FriendList = () => {
  const history = useHistory()
  history.push('/pages/friends')

  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [friends, setFriends] = useState(null)
  const uid = user && user.uid

  useEffect(() => {
    friendsData()
  }, [])

  const friendsData = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get('/users/me/friends', {
        uid: uid,
      })
      if (response) {
        if (response.data.content.length === 0) {
          setFriends(null)
        }
        setFriends(response.data.content)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) return <></>
  if (!friends) return <></>

  return (
    <>
      <FriendPage>
        <Flexbox
          className="mypage-header"
          style={{
            height: '70px',
            borderBottom: '1px solid lightgrey',
            marginBottom: '50px',
          }}
        >
          <h2 style={{ fontWeight: '700', fontSize: '20px', width: '25%' }}>
            친구목록
          </h2>
        </Flexbox>
        <Section>
          <Profile className="profileDiv" />
          <ul className="FriendDiv">
            {loading ? (
              <Spin indicator={antIcon} style={{ marginLeft: '150px' }} />
            ) : friends.length !== 0 ? (
              friends
                .filter(function (user) {
                  return uid !== user.frdUser.uid
                })
                .map((friend) => (
                  <FriendItem key={friend.frdRelNo} friend={friend} />
                ))
            ) : (
              <h3>
                추가된 친구가 없습니다. <br />
                알림 페이지에서 친구추가하고 싶은 <br />
                유저의 아바타를 클릭한 후에 <br />
                친구추가를 해주세요. 🤗
              </h3>
            )}
          </ul>
        </Section>
      </FriendPage>
    </>
  )
}

export default FriendList

const FriendPage = styled.div`
  display: flex;
  flex-direction: column;
  .mypage-header {
    margin-right: 10%;
    border-bottom: 1px solid lightgrey;
    width: 100%;
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  margin: 0;
  margin-left: 10%;
  box-sizing: border-box;
  .profileDiv {
    flex: 1 40%;
  }
  .FriendDiv {
    flex: 1 60%;
    padding-left: 2rem;
    margin-left: 2rem;
    display: flex;
    flex-wrap: wrap;
  }
`
