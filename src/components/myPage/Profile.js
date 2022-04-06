import React, { useContext } from 'react'
import { UserContext } from 'service/authState'
import Button from 'components/common/Buttons'
import styled from 'styled-components'
import { customIcons, historyType } from 'components/common/constants'
import { Rate } from 'antd'
import Avatar from 'components/common/Avatar'

function Profile() {
  const { user } = useContext(UserContext)

  const userImg = user && user.profileUrl
  const nickName = user && user.nickname
  return (
    <div>
      {user && (
        <ProfileBox>
          <Avatar $Profile nickName={nickName} userImg={userImg} />
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
          <Button
            Secondary
            height={'25px'}
            width={'90px'}
            style={{ fontSize: '12px', fontWeight: '400' }}
          >
            프로필 수정
          </Button>
        </ProfileBox>
      )}
    </div>
  )
}

export default Profile

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
