import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'

import ReviewList from './ReviewList'
import { customIcons, historyType } from 'components/common/constants'

import Button from 'components/common/Buttons'
import styled from 'styled-components'
import { Rate } from 'antd'
import Avatar from 'components/common/Avatar'

const PopUpProfile = ({ userData, nickName, userImg }) => {
  const { user } = useContext(UserContext)
  const uid = user && user.uid

  const [friends, setFriends] = useState(null)
  const [add, setAdd] = useState(false)

  // console.log('userDatauid', userData.gameUser.uid)

  useEffect(() => {
    friendsData()
    console.log('friends', friends)
  }, [])

  // useEffect(() => {
  //   console.log(add)
  // }, [add])

  let friendsList = []

  const confirmFri = async (friendsList) => {
    let checkUid =
      friendsList &&
      friendsList.some(function (friend) {
        return userData.gameUser.uid === friend.frdUser.uid
      })
    Boolean(checkUid) ? setAdd(true) : setAdd(false)
  }

  const friendsData = async () => {
    try {
      const response = await baseApi.get('/users/me/friends', {
        uid: uid,
      })
      if (response.data.content.length === 0) {
        setFriends(null)
      } else {
        await setFriends(response.data.content)
        friendsList = [...response.data.content]
        // console.log('friendsList', friendsList)
      }
      confirmFri(friendsList)
    } catch (error) {
      console.log(error)
    }
  }

  const addFriend = async () => {
    console.log('addfriend호출')
    try {
      const response = await baseApi.post('/users/me/friends', {
        addedUserUid: userData.gameUser.uid,
      })
      console.log(response)
      setAdd(true)
      alert('친구가 추가되었습니다.')
    } catch (error) {
      console.log(error)
      alert('친구추가에 실패했습니다.')
    }
  }

  return (
    <PopUpSection>
      <div>
        {user && (
          <ProfileBox>
            <Avatar
              $Profile
              user={user}
              nickName={nickName}
              userImg={userImg}
            />
            <Rate
              disabled
              defaultValue={4}
              character={({ index }) => customIcons[index + 1]}
            />
            <Info>
              <span>
                {user.locCd.locSdName} {user.locCd.locSkkName}
              </span>
              <span>{historyType[user.history]}</span>
            </Info>
            {!add ? (
              <Button
                Secondary
                height={'25px'}
                width={'90px'}
                style={{ fontSize: '12px', fontWeight: '400' }}
                onClick={() => addFriend()}
              >
                {' '}
                친구추가{' '}
              </Button>
            ) : (
              <Button
                Secondary
                height={'25px'}
                width={'90px'}
                style={{ fontSize: '12px', fontWeight: '400' }}
              >
                {' '}
                친구추가완료{' '}
              </Button>
            )}
          </ProfileBox>
        )}
      </div>
      <ReviewList
        $Profile
        userData={userData}
        nickName={nickName}
        userImg={userImg}
      />
    </PopUpSection>
  )
}

export default PopUpProfile

const PopUpSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  .profile {
    flex: 1 1 25%;
  }
  .reviewList {
    flex: 1 1 65%;
    padding-left: 2rem;
    margin-left: 2rem;
  }
`
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 30px;
  border: 1px solid lightGray;
  border-radius: 4px;
  margin-right: 50px;
`
const Info = styled.p`
  display: block;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.005em;
  color: #8c8d96;
  margin-right: 10px;
  padding: 10px 0;
  span:not(:last-child)::after {
    content: '|';
    margin: 0 5px;
  }
`
