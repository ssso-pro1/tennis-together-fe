import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'
import ReviewItem from './ReviewItem'

import styled from 'styled-components'

const ReviewList = () => {
  const [reviews, setReviews] = useState(null)

  const { user } = useContext(UserContext)
  const uid = user.uid
  console.log(user)
  console.log(user.uid)

  useEffect(() => {
    baseApi
      .get(`/reviews`, {
        recipientUid: uid,
      })
      .then(async (res) => {
        console.log(res.data.content)
        const reviews = await res.data.content

        if (res) {
          console.log('reviews', reviews)
          setReviews(reviews)
        } else if (!res) {
          alert('리뷰내역이 없습니다')
        }
        setReviews(reviews)
      }, [])
  }, [])

  if (!user) return <></>
  return (
    <ReviewListDiv>
      <ul className="reviewUl">
        {reviews &&
          reviews.map((review) => (
            <ReviewItem key={review.reviewNo} review={review} />
          ))}
      </ul>
    </ReviewListDiv>
  )
}

export default ReviewList

const ReviewListDiv = styled.div`
  margin-left: 2rem;
  display: flex;
`
