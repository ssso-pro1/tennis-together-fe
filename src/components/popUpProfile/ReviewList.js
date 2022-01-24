import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'
import ReviewItem from './ReviewItem'

import styled from 'styled-components'
import { Spin } from 'antd'
import { antIcon } from 'components/common/constants'

const ReviewList = () => {
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user } = useContext(UserContext)
  const uid = user.uid
  // console.log(user)
  // console.log(user.uid)

  useEffect(() => {
    reviewData()
  }, [])

  const reviewData = async () => {
    setLoading(true)
    try {
      const response = await baseApi.get(`/reviews`, {
        recipientUid: uid,
      })
      setReviews(response.data.content)
      setLoading(false)
    } catch (error) {
      console.log(error)
      alert('리뷰내역이 없습니다')
    }
  }

  if (!user) return <></>
  return (
    <ReviewListDiv>
      <ul className="reviewUl">
        {loading ? (
          <Spin indicator={antIcon} style={{ marginLeft: '150px' }} />
        ) : (
          reviews &&
          reviews.map((review) => (
            <ReviewItem key={review.reviewNo} review={review} />
          ))
        )}
      </ul>
    </ReviewListDiv>
  )
}

export default ReviewList

const ReviewListDiv = styled.div`
  margin-left: 2rem;
  display: flex;
`
