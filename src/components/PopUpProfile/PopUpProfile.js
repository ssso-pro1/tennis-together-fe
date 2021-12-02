import React, { useContext } from 'react'
import baseApi from '../../service/baseApi'
import { UserContext } from '../../service/authState'
import ReviewList from './ReviewList'
// import Profile from '../../MyPage/Profile'

import { customIcons, historyType } from 'components/Common/constants'
import { Rate } from 'antd'
import styled from 'styled-components'
import Flexbox from 'styled-components/Flexbox'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import Button from 'styled-components/Buttons'

const PopUpProfile = ({ applyUser }) => {
  const { user } = useContext(UserContext)

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

  if (!user) return <></>
  const uid = user.uid

  // 친구 추가
  const addFriend = (e) => {
    console.log('addfriend호출')
    baseApi
      .post(
        '/users/me/friends',
        {
          addedUserUid: uid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(async (response) => {
        const res = await response.data.content
        console.log(res)
        alert('친구가 추가되었습니다.') //window.cofirm('친구목록으로 이동?')
        e.currentTarget.disabled = true
        // setFriends(res)
        // history.push('/')
      })
      .catch((error) => {
        console.log(error)
        alert('친구추가에 실패했습니다.')
      })
  }

  console.log(user)
  return (
    <PopUpSection>
      {/* <Profile className="profile" /> */}

      <div>
        {user && (
          <Flexbox>
            <AvatarBase
              style={{
                flexDirection: 'column',
                padding: '40px',
                border: '1px solid lightGray',
                borderRadius: '4px',
                position: 'sticky',
                top: 0,
              }}
            >
              <a
                href="#!"
                className="avatarImg"
                style={{ height: '80px', width: '80px' }}
              >
                <img src={DefaultImg} alt={DefaultImg} />
              </a>
              <a
                href="#!"
                className="nickname"
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  display: 'block',
                  padding: '10px 0 5px 0',
                }}
              >
                <strong>{applyUser.gameUser.nickname}</strong>
              </a>
              <Rate
                disabled
                defaultValue={4}
                character={({ index }) => customIcons[index + 1]}
              />
              <p
                className="info"
                style={{ fontSize: '12px', padding: '10px 0' }}
              >
                <span>
                  {applyUser.gameUser.locCd.locSdName}{' '}
                  {applyUser.gameUser.locCd.locSkkName}
                </span>
                <span>{historyType[applyUser.gameUser.history]}</span>
              </p>
              <Button
                Secondary
                height={'25px'}
                width={'90px'}
                style={{ fontSize: '12px', fontWeight: '400' }}
                onClick={(e) => addFriend()}
              >
                친구 추가
              </Button>
            </AvatarBase>
          </Flexbox>
        )}
      </div>
      <ReviewList className="reviewList" />
    </PopUpSection>
  )
}

export default PopUpProfile
