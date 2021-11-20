import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../service/authState'
import { useHistory } from 'react-router-dom'
import ReviewList from './ReviewList'
import Profile from '../../MyPage/Profile'
import { Rate } from 'antd'

import styled from 'styled-components'
import Flexbox from 'styled-components/Flexbox'
import BallDefault from '../../MyPage/BallDefault'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import Button from 'styled-components/Buttons'

const PopUpProfile = ({ props }) => {
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
  const customIcons = {
    1: <BallDefault />,
    2: <BallDefault />,
    3: <BallDefault />,
    4: <BallDefault />,
    5: <BallDefault />,
  }
  const historyType = {
    '': '무관',
    1: '6개월 미만',
    2: '6개월이상 ~ 1년 미만',
    3: '1년 이상 ~ 5년 미만',
    4: '5년 이상',
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
                href=""
                className="avatarImg"
                style={{ height: '80px', width: '80px' }}
              >
                <img src={DefaultImg} alt={DefaultImg} />
              </a>
              <a
                href=""
                className="nickname"
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  display: 'block',
                  padding: '10px 0 5px 0',
                }}
              >
                <strong>{user.nickname}</strong>
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
                  {user.locCd.locSdName} {user.locCd.locSkkName}
                </span>
                <span>{historyType[user.history]}</span>
              </p>
              <Button
                Secondary
                height={'25px'}
                width={'90px'}
                style={{ fontSize: '12px', fontWeight: '400' }}
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
