import React from 'react'
import RecomItem from './RecomItem'
import styled from 'styled-components'
import { Spin } from 'antd'
import { antIcon } from 'components/common/constants'

const RecomList = ({ user, recommends, loadingFri }) => {
  let uid = user && user.uid

  return (
    <>
      <RecommendWrap>
        <h3 className="title">
          친구추천
          <img
            className="ball"
            src="/images/img-tennis-ball.png"
            alt="ball"
            style={{ width: '1.2rem' }}
          />
        </h3>
        {!uid ? (
          <div className="resultDiv">
            <h1>로그인을 먼저 해주세요😅</h1>
          </div>
        ) : loadingFri ? (
          <Spin indicator={antIcon} style={{ marginLeft: '150px' }} />
        ) : (
          <ul className="RecommendDiv">
            {recommends !== null ? (
              recommends
                .filter(function (fri) {
                  return uid !== fri.uid
                })
                .map((recommend) => (
                  <RecomItem key={recommend.uid} recommend={recommend} />
                ))
            ) : (
              <h3>지역기반한 추천 친구가 없습니다😅</h3>
            )}
          </ul>
        )}
      </RecommendWrap>
    </>
  )
}

export default RecomList

const RecommendWrap = styled.div`
  .title {
    margin: 0.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    img {
      margin-left: 0.3em;
    }
  }
  .ball {
    transform: rotate(-45deg);
  }
`
