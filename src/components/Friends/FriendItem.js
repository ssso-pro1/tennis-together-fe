import React from 'react'
import AvatarBase from 'components/common/AvatarBase'
import DefaultImg from 'components/common/images/img-user-default.png'
import { Rate } from 'antd'

import { customIcons, historyType } from 'components/Common/constants'
import styled from 'styled-components'
import BallDefault from '../common/BallDefault'

const FriendItem = ({ friend }) => {
  const FriendItem = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid lightgrey;
    margin: 1em;
    padding: 0.8rem;
    width: 10rem;

    .friendItems {
      /* display: flex; */
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 100%;
      /* align-items: center; */
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
        /* .circle: 10px; */
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
  // console.log(friend)
  // if (friend !== null) return <></>

  // const historyT = {
  //   1: '6개월미만',
  //   2: '6개월~1년',
  //   3: '1년~5년',
  //   4: '5년이상',
  // }

  return (
    <FriendItem>
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
    </FriendItem>
  )
}

export default FriendItem
