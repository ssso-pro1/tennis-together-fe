import React from 'react'
import Flexbox from 'styled-components/Flexbox'
import Button from 'styled-components/Buttons'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

function Profile() {
  return (
    <div>
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
              paddingTop: '10px',
            }}
          >
            <strong>코코</strong>
          </a>
          <p className="info" style={{ fontSize: '12px', padding: '10px 0' }}>
            <span>장충테니스장</span>
            <span>2021-01-26</span>
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
    </div>
  )
}

export default Profile
