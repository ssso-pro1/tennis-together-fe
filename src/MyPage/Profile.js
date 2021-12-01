import React, { useContext } from 'react'
import { UserContext } from 'service/authState'
import Flexbox from 'styled-components/Flexbox'
import Button from 'styled-components/Buttons'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import { Rate } from 'antd'
import BallDefault from './BallDefault'

function Profile() {
  const { user } = useContext(UserContext)
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

  return (
    <div>
      {user && (
        <Flexbox>
          <AvatarBase
            style={{
              flexDirection: 'column',
              padding: '50px 30px',
              border: '1px solid lightGray',
              borderRadius: '4px',
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
            <p className="info" style={{ fontSize: '12px', padding: '10px 0' }}>
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
              프로필 수정
            </Button>
          </AvatarBase>
        </Flexbox>
      )}
    </div>
  )
}

export default Profile
