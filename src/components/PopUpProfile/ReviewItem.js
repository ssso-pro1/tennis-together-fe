import React from 'react'
import AvatarBase from 'components/common/AvatarBase'
import DefaultImg from 'components/common/images/img-user-default.png'
import { Rate } from 'antd'

import styled from 'styled-components'
import BallDefault from '../common/BallDefault'

const ReviewItem = ({ review }) => {
  const ReviewItem = styled.div`
    .reviewItems {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: flex-start;

      margin-bottom: 0.5rem;
      border: 1px solid lightgrey;
      border-radius: 0.3rem;
      padding: 0.8rem;

      .profileImg {
        margin-right: 1rem;
      }
      .writtenUserInfo {
        margin-right: 1.2rem;
        font-size: 16px;
        /* margin: 1.2rem; */
        display: flex;
        flex-direction: column;
        span:first-child {
          margin-bottom: 0.3rem;
          font-weight: bold;
        }
      }
      .gameInfo {
      }
    }
  `
  const GameInfo = styled.div`
    display: flex;
    flex-direction: column;
    div:first-child {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    div:nth-child(2) {
      color: grey;
      font-size: 0.7rem;
      span:not(:last-child)::after {
        content: '|';
        margin: 0 5px;
      }
    }
  `
  const customIcons = {
    1: <BallDefault />,
    2: <BallDefault />,
    3: <BallDefault />,
    4: <BallDefault />,
    5: <BallDefault />,
  }
  return (
    <ReviewItem>
      <li className="reviewItems">
        <div className="profileImg">
          {review.writtenUser.profileUrl ? (
            <img
              className="avatarImg"
              style={{ width: '1.8rem' }}
              src={review.writtenUser.profileUrl}
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
        </div>
        <div className="writtenUserInfo">
          <span>{review.writtenUser.nickname}</span>
          <Rate
            disabled
            defaultValue={review.writtenUser.score}
            character={({ index }) => customIcons[index + 1]}
          />
        </div>
        <GameInfo className="gameInfo">
          <div>
            <span>{review.reviewContent}</span>
          </div>
          <div>
            <span>{review.game.court.name}</span>
            {/* date 확인 필요!! */}
            <span>{review.game.endDt}</span>
            <span>{review.game.stDvCd}</span>
          </div>
        </GameInfo>
      </li>
    </ReviewItem>
  )
}

export default ReviewItem
