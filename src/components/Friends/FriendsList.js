import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import baseApi from '../../service/baseApi'
import { UserContext } from '../../service/authState'
import Navbar from 'components/Common/Navbar'
import Profile from '../../MyPage/Profile'

import styled from 'styled-components'
import Flexbox from 'styled-components/Flexbox'
import Button from 'styled-components/Buttons'
import { Input, Rate, Select } from 'antd'
import FriendItem from './FriendItem'

const FriendsList = ({ children }) => {
  const history = useHistory()
  history.push('/pages/friends')

  const { user } = useContext(UserContext)
  const [friends, setFriends] = useState(null)
  const uid = user && user.uid

  useEffect(() => {
    baseApi
      .get(
        '/users/me/friends',
        {
          uid: uid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(async (response) => {
        const res = await response.data.content
        console.log('friends', res) //배열
        setFriends(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    console.log(friends)
  }, [friends])

  const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .profileDiv {
      flex: 1 1 40%;
    }
    .FriendDiv {
      flex: 1 1 60%;
      padding-left: 2rem;
      margin-left: 2rem;
    }
  `

  if (!user) return <></>
  if (!friends) return <></>

  return (
    <>
      {/* <UserContext.Provider value={{ friends, setFriends }}>
        {children} */}

      <Navbar />
      {/* {user && ( */}
      {/* <div> */}
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
      {/* // )} */}
      <Section>
        <Profile className="profileDiv" />
        <ul className="FriendDiv">
          {friends &&
            friends.map((friend) => (
              <FriendItem key={friend.frdRelNo} friend={friend} />
            ))}
        </ul>
      </Section>
      {/* </div> */}
      {/* )} */}
      {/* </UserContext.Provider> */}
    </>
  )
}

export default FriendsList
