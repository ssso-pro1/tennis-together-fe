import React, { useContext, useState, useEffect, useCallback } from 'react'
import baseApi from 'service/baseApi'
import styled from 'styled-components'
import { UserContext } from 'service/authState'
import Avatar from 'components/common/Avatar'
import MyGames from './MyGames'
import MyReviews from './MyReviews'
import { LoadingSpin } from '../common/constants'
import Notifications from './Notifications'
import { getReview, createReview, updateReview, applyGame } from 'service/api'
import FriendList from './FriendList'

const VALUES = {
  nickname: '',
  profileUrl: '',
  court: '',
  date: '',
}

const MyPage = () => {
  const { user } = useContext(UserContext)
  const [clickTab, setClickTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [myLists, setMyLists] = useState([])
  const [writeReviews, setWriteReviews] = useState([])
  const [reviews, setReviews] = useState([])
  const [applyGames, setApplyGames] = useState([])
  const [values, setValues] = useState(VALUES)
  const [editing, setEditing] = useState(null)

  const userImg = user.profileUrl
  const nickName = user.nickname

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const allGames = await baseApi(`/games`)
      const review = await baseApi(`/reviews`)
      setLoading(false)

      const apply = await applyGame()
      setApplyGames(apply.data.content)

      const myGames = allGames.data.content.filter(
        (data) => data.gameCreator.uid === user.uid
      )
      setMyLists(myGames)

      const myData = review.data.content.filter(
        (data) => data.writtenUser.uid === user.uid
      )
      setReviews(myData)

      const resGame = await baseApi(`games/histories/playgames`)
      const writeDate = resGame.data.content.filter((playGame) => {
        return !review.data.content.some(
          (review) => review.gameUserNo === playGame.gameUserNo
        )
      })
      setWriteReviews(writeDate)
    } catch (err) {
      console.log(err)
    }
  }, [user.uid])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleEditSuccess = async (reviewNo) => {
    const review = await getReview(reviewNo)

    if (review.data) {
      const { nickname, profileUrl } = review.data.recipient
      setValues({
        nickname: nickname,
        profileUrl: profileUrl,
        court: review.data.game.court.name,
        date: review.data.updDtm,
      })
      setEditing({
        score: review.data.score,
        reviewContent: review.data.reviewContent,
        reviewNo: reviewNo,
      })
    }
  }

  const onSubmitSuccess = (values) => {
    if (editing === null) {
      createReview(values)
    } else {
      updateReview(values)
    }
    fetchData()
    setValues(VALUES)
  }

  const onReviewOpen = (reviewer) => {
    setValues(reviewer)
  }
  const onCancel = () => {
    setValues(VALUES)
    setEditing(null)
  }

  return (
    <div>
      <MyPageDiv>
        <UlWrapper>
          <MyPageUl>
            <li>
              <Avatar nickName={nickName} userImg={userImg} />
            </li>
            <li
              onClick={() => {
                setClickTab(0)
              }}
            >
              <p>내가 작성한 글</p>
              <span>{myLists.length}개</span>
            </li>
            <li
              onClick={() => {
                setClickTab(1)
              }}
            >
              <p>리뷰</p>
              <span>{reviews.length}개</span>
            </li>
            <li
              onClick={() => {
                setClickTab(2)
              }}
            >
              <p>알림</p>
            </li>
            <li
              onClick={() => {
                setClickTab(3)
              }}
            >
              <p>친구목록</p>
            </li>
          </MyPageUl>
        </UlWrapper>
      </MyPageDiv>
      {loading ? (
        <LoadingSpin />
      ) : (
        <div>{clickTab === 0 && <MyGames myLists={myLists} />}</div>
      )}
      {clickTab === 1 && (
        <MyReviews
          onCancel={onCancel}
          editing={editing}
          writeReviews={writeReviews}
          reviews={reviews}
          values={values}
          onReviewOpen={onReviewOpen}
          onSubmitSuccess={onSubmitSuccess}
          handleEditSuccess={handleEditSuccess}
        />
      )}
      {clickTab === 2 && <Notifications applyGames={applyGames} />}
      {clickTab === 3 && <FriendList />}
    </div>
  )
}

export default MyPage
const MyPageUl = styled.ul`
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: stretch;
  li {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-left: 4px;
    background-color: #fff;
    padding: 26px 0 30px 30px;
    display: flex;
    p {
      font-size: 14px;
      color: #333;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      padding-top: 5px;
      font-weight: 700;
      font-size: 20px;
      color: #11992f;
      line-height: 28px;
    }
  }
`
const MyPageDiv = styled.div`
  width: 100%;
  padding: 50px 0;
  margin-bottom: -20px;
  background-color: #f7f7f7;
`
const UlWrapper = styled.div`
  overflow: hidden;
  width: 1050px;
  margin: 0 auto;
`
