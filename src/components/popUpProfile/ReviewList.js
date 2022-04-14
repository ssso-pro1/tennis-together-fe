import React, { useEffect, useState } from 'react'
import baseApi from '../../service/baseApi'
import ReviewItem from './ReviewItem'

import styled from 'styled-components'
import { Spin } from 'antd'
import { antIcon } from 'components/common/constants'

const ReviewList = ({ userData }) => {
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(false)

  // console.log('userData', userData)
  const applyUserUid = userData && userData.gameUser.uid

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
      // await console.log('reviews', reviews)
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
            reviews &&
            reviews
              .filter(function (reviews) {
                return reviews.recipient.uid === applyUserUid
              })
              .map((review) => (
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
