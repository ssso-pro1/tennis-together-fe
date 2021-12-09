import React from 'react'
import DefaultImg from 'components/common/images/img-user-default.png'
import { Rate } from 'antd'

import styled from 'styled-components'
import BallDefault from '../common/BallDefault'
import { customIcons } from '../common/constants'

const RecomItem = ({ recommend }) => {
  return (
    <>
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
                className="rate"
                disabled
                defaultValue={recommend.score}
                character={({ index }) => customIcons[index + 1]}
                style={{ fontSize: '0.5rem' }}
              />
            </div>
          </div>
        </li>
      </Recommend>
    </>
  )
}

export default RecomItem

const Recommend = styled.div`
  .friendItems {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 210px;
    padding: 0.8rem;
    border: 1px solid lightgrey;
    border-radius: 4px;
    margin: 0.8rem;
    .profileImg {
      margin-right: 0.5rem;
    }
    .metaData {
      .nick {
        font-size: 0.85em;
        font-weight: 500;
      }
      .locSkk {
        font-size: 0.7em;
        margin-right: 0.3em;
        color: grey;
      }
      .ant-rate-star {
        svg {
          width: 0.7em;
          height: 0.7em;
        }
      }
    }
  }
`
