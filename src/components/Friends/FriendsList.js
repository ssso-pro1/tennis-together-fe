import React, { useEffect, useContext, useState } from 'react'
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

const FriendsList = ({ props }) => {
  const { user } = useContext(UserContext)
  const [friends, setFriends] = useState(null)
  const uid = user && user.uid
  if (user) {
    console.log(user)
    console.log(user.uid)
  }

  useEffect(() => {
    baseApi
      .get('/users/me/friends', {
        params: {
          uid: uid,
        },
      })
      .then((result) => {
        // const result = await res
        // const res = await result

        // console.log(result)
        console.log(result.data.content) //배열
        // console.log(res.data.content.frdUser)
        setFriends(result.data.content)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const Section = styled.div`
    display: flex;
    justify-content: center;
    .profileDiv {
      flex: 1 1 25%;
    }
    .FriendDiv {
      flex: 1 1 65%;
      padding-left: 2rem;
      margin-left: 2rem;
    }
  `

  if (!user) return <></>
  // if (user !== null) return user

  // if (!friends) return <></>
  // if (friends !== null) return friends
  console.log(user)

  console.log(user.uid)

  return (
    <>
      <Navbar />
      {/* {user && ( */}
      <div>
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
          <div style={{ width: '50%' }}>
            <Input
              className="input"
              style={{ width: 500 }}
              placeholder="닉네임 검색하기"
            />
          </div>
          <Button Secondary height={'30px'} width={'60px'} fs={'14px'}>
            검색
          </Button>
        </Flexbox>
        {/* // )} */}
        <Section>
          <Profile className="profileDiv" />
          <ul className="FriendDiv">
            {/* {friends &&  */}
            {friends &&
              friends.map((friend) => (
                <FriendItem key={friend.frdRelNo} friend={friend.frdUser} />
              ))}
          </ul>
        </Section>
      </div>
      {/* )} */}
    </>
  )
}

export default FriendsList
