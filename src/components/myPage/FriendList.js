import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'
import FriendItem from './FriendItem'
import { LoadingSpin } from '../common/constants'
import styled from 'styled-components'

const FriendList = () => {
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
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) return <></>
  if (!friends) return <></>

  return (
    <>
      <MyDiv>
        <h3>친구목록</h3>
        <Section>
          <ul className="FriendDiv">
            {loading ? (
              <LoadingSpin />
            ) : friends.length !== 0 ? (
              friends
                .filter(function (user) {
                  return uid !== user.frdUser.uid
                })
                .map((friend) => (
                  <FriendItem key={friend.frdRelNo} friend={friend} />
                ))
            ) : (
              <h2>
                추가된 친구가 없습니다. <br />
                알림 페이지에서 친구추가하고 싶은 <br />
                유저의 아바타를 클릭한 후에 <br />
                친구추가를 해주세요. 🤗
              </h2>
            )}
          </ul>
        </Section>
      </MyDiv>
    </>
  )
}

export default FriendList

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  .FriendDiv {
    padding-left: 2rem;
    margin-left: 2rem;
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
`

const MyDiv = styled.div`
  padding-top: 65px;
  width: 1050px;
  margin: 0 auto;
  h3 {
    height: 36px;
    font-weight: 700;
    font-size: 24px;
    color: #333;
    padding-bottom: 40px;
    border-bottom: 4px solid #000;
  }
`
