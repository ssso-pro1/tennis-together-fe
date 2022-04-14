import React from 'react'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import { Rate } from 'antd'
import { customIcons, historyType } from 'components/common/constants'
import styled from 'styled-components'

const FriendItem = ({ friend }) => {
  if (!friend) return <></>

  return (
    <FriendItemDiv>
      <li className="friendItems">
        <div className="userInfo">
          {friend.frdUser.profileUrl ? (
            <img
              className="avatarImg"
              style={{ width: '1.8rem' }}
              src={friend.frdUser.profileUrl}
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
          <span className="nick">{friend.frdUser.nickname}</span>
          <Rate
            style={{ fontSize: '12px' }}
            className="rate"
            disabled
            defaultValue={friend.frdUser.score}
            character={({ index }) => customIcons[index + 1]}
          />
        </div>
        <div className="metaData">
          <span>
            {friend.frdUser.locCd.locSdName} {friend.frdUser.locCd.locSkkName}
          </span>
          <span>{historyType[friend.frdUser.history]}</span>
        </div>
      </li>
    </FriendItemDiv>
  )
}

export default FriendItem

const FriendItemDiv = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid lightgrey;
  margin: 1em;
  padding: 0.8rem;
  width: 10rem;

  .friendItems {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
  }
  .userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    .nick {
      margin: 0.3rem;
    }
    .rate {
      margin-bottom: 1.2rem;
      font-size: 0.3rem;
    }
  }
  .metaData {
    font-size: 0.5rem;
    color: grey;
    span:not(:last-child)::after {
      content: '|';
      margin: 0 0.2rem;
    }
  }
`
