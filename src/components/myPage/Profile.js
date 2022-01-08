import React, { useContext } from 'react'
import { UserContext } from 'service/authState'
import Flexbox from 'components/common/Flexbox'
import Button from 'components/common/Buttons'
import AvatarBase from 'components/common/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import { customIcons, historyType } from 'components/common/constants'
import { Rate } from 'antd'
import BallDefault from '../common/BallDefault'

function Profile() {
  const { user } = useContext(UserContext)

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
