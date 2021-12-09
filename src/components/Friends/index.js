import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import baseApi from '../../service/baseApi'
import { UserContext } from '../../service/authState'
import Profile from '../myPage/Profile'
import styled from 'styled-components'
import Flexbox from 'components/common/Flexbox'
import FriendItem from './FriendItem'
import Loading from 'components/common/Loading'

const FriendsList = () => {
  const history = useHistory()
  history.push('/pages/friends')

  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [friends, setFriends] = useState(null)
  const uid = user && user.uid

  useEffect(() => {
    baseApi
      .get('/users/me/friends', {
        uid: uid,
      })
      .then(async (response) => {
        const res = await response.data.content
        // console.log('friends', res) //배열
        setLoading(false)
        setFriends(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

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
              <Loading />
            ) : friends ? (
              friends.map((friend) => (
                <FriendItem key={friend.frdRelNo} friend={friend} />
              ))
            ) : (
              <h3>추가된 친구가 없습니다</h3>
            )}
          </ul>
        </Section>
      </FriendPage>
    </>
  )
}

export default FriendsList

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
