import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../service/authState'
import { useHistory } from 'react-router-dom'
import baseApi from '../../service/baseApi'
import RecomItem from './RecomItem'

import styled from 'styled-components'

const RecomList = ({ props }) => {
  const { user } = useContext(UserContext)

  const [friends, setFriends] = useState(null)
  const [recommends, setRecommends] = useState(null)

  const history = useHistory()
  // history.push('/recommend')

  if (user) {
    const uid = user.uid
    // console.log(uid)
  }
  const uid = user && user.uid

  useEffect(() => {
    baseApi
      .get(
        '/users/me/friends/recommend',
        {
          uid: uid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      // })
      .then(async (response) => {
        const res = await response.data.content
        // console.log('recommend', res)
        setRecommends(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (!user) return <></>

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
          {recommends ? (
            recommends.map((recommend) => (
              <RecomItem key={recommend.uid} recommend={recommend} />
            ))
          ) : (
            <h3>지역기반한 추천 친구가 없습니다</h3>
          )}
        </ul>
      </RecommendWrap>
    </>
  )
}

export default RecomList
