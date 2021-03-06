import React from 'react'
import { Rate } from 'antd'
import { customIcons } from 'components/common/constants'
import styled from 'styled-components'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

const ReviewItem = ({ review }) => {
  return (
    <ReviewItemDiv>
      <li className="reviewItems">
        <div className="profileImg">
          {review.writtenUser.profileUrl ? (
            <img
              className="avatarImg"
              style={{ width: '2.2rem' }}
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
            <span>{review.game.endDt}</span>
            <span>{review.game.stDvCd}</span>
          </div>
        </GameInfo>
      </li>
    </ReviewItemDiv>
  )
}

export default ReviewItem

const ReviewItemDiv = styled.div`
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
