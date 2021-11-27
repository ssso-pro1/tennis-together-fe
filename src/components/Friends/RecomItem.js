import React from 'react'
import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import { Rate } from 'antd'

import styled from 'styled-components'
import BallDefault from '../../MyPage/BallDefault'

const RecomItem = ({ recommend }) => {
  const customIcons = {
    1: <BallDefault />,
    2: <BallDefault />,
    3: <BallDefault />,
    4: <BallDefault />,
    5: <BallDefault />,
  }

  const Recommend = styled.div`
    .friendItems {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 200px;
      padding: 0.8rem;
      border: 1px solid lightgrey;
      border-radius: 4px;
      margin: 0.8rem;
      .profileImg {
        margin-right: 0.3rem;
      }
      .metaData {
        .nick {
          font-size: 10px;
        }
        .locSkk {
          font-size: 8px;
        }
      }
    }
  `

  return (
    <>
      {/* <h1>item</h1> */}
      <Recommend>
        <li className="friendItems">
          <div className="profileImg">
            {recommend.profileUrl ? (
              <img
                className="avatarImg"
                style={{ width: '1.8rem' }}
                src={recommend.profileUrl}
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
          <div className="metaData">
            <span className="nick">{recommend.nickname}</span>
            <div>
              <span className="locSkk">{recommend.locCd.locSkkName}</span>
              <Rate
                style={{ fontSize: '5px' }}
                className="rate"
                disabled
                defaultValue={recommend.score}
                character={({ index }) => customIcons[index + 1]}
              />
            </div>
          </div>
        </li>
      </Recommend>
    </>
  )
}

export default RecomItem
