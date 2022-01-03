import React from 'react'
import RecomItem from './RecomItem'
import styled from 'styled-components'
import Loading from 'components/common/Loading'

const RecomList = ({ recommends, loadingFri }) => {
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
        <ul className="RecommendDiv">
          {/* {loadingFri ? (
            <Loading />
          ) : recommends ? (
            recommends.map((recommend) => (
              <RecomItem key={recommend.uid} recommend={recommend} />
            ))
          ) : (
            <h3>지역기반한 추천 친구가 없습니다</h3>
          )} */}
          {recommends ? (
            recommends.map((recommend) => (
              <RecomItem key={recommend.uid} recommend={recommend} />
            ))
          ) : loadingFri ? (
            <h3>지역기반한 추천 친구가 없습니다</h3>
          ) : (
            <Loading />
          )}
        </ul>
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
