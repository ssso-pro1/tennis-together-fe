import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'
import ReviewItem from './ReviewItem'

import styled from 'styled-components'
import { Spin } from 'antd'
import { antIcon } from 'components/common/constants'

const ReviewList = ({ applyUser }) => {
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(false)

  // const { user } = useContext(UserContext)
  // console.log(applyUser)
  const applyUserUid = applyUser.gameUser.uid
  console.log(applyUserUid)

  useEffect(() => {
    reviewData()
  }, [])

  const reviewData = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(`/reviews`, {
        recipientUid: applyUserUid,
      })
      setLoading(false)
      setReviews(response.data.content)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ReviewListDiv>
      {loading ? (
        <Spin indicator={antIcon} style={{ marginLeft: '150px' }} />
      ) : (
        <ul className="reviewUl">
          {reviews ? (
            reviews.map((review) => (
              <ReviewItem key={review.reviewNo} review={review} />
            ))
          ) : (
            <h1>리뷰가 없습니다😅</h1>
          )}
        </ul>
      )}
    </ReviewListDiv>
  )
}

export default ReviewList

const ReviewListDiv = styled.div`
  margin-left: 2rem;
  display: flex;
`
