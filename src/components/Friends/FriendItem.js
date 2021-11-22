import React from 'react'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import { Rate } from 'antd'

import styled from 'styled-components'
import BallDefault from '../../MyPage/BallDefault'

const FriendItem = ({ friend }) => {
  const customIcons = {
    1: <BallDefault />,
    2: <BallDefault />,
    3: <BallDefault />,
    4: <BallDefault />,
    5: <BallDefault />,
  }

  const FriendItemDiv = styled.div`
    .userInfo {
      display: flex;
      flex-direction: column;
    }
  `

  if (friend !== null) return friend

  return (
    <FriendItemDiv>
      <li>
        <div className="userInfo">
          {friend.frdUser.profileUrl ? (
            <img
              className="avatarImg"
              style={{ width: '1.8rem' }}
              src={friend.writtenUser.profileUrl}
              alt=""
            />
          ) : (
            <img
              className="avatarImg"
              style={{ width: '2.2rem' }}
              src={DefaultImg}
              alt={DefaultImg}
            />
          )}
          <span>{friend.frdUser.nickname}</span>
          <Rate
            disabled
            defaultValue={friend.frdUser.score}
            character={({ index }) => customIcons[index + 1]}
          />
        </div>
        <div className="metaData">
          <span>
            {/* {friend.frdUser.locCd.locSdName} {friend.frdUser.locCd.locSkkName} */}
            {friend.locCd.locSdName} {friend.locCd.locSkkName}
          </span>
        </div>
      </li>
    </FriendItemDiv>
  )
}

export default FriendItem
