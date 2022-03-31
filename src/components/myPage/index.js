import React, { useContext, useState, useEffect } from 'react'
import baseApi from 'service/baseApi'
import styled from 'styled-components'
import { UserContext } from 'service/authState'
import Avatar from 'components/common/Avatar'
import MyGames from './MyGames'
import MyReviews from './MyReviews'

const MyPage = () => {
  const { user } = useContext(UserContext)
  const [clickTab, setClickTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [myLists, setMyLists] = useState([])
  const [playGames, setPlayGames] = useState([])
  const [reviews, setReviews] = useState([])

  const userImg = user.profileUrl
  const nickName = user.nickname

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const allGames = await baseApi(`/games`)
      const myGames = allGames.data.content.filter(
        (data) => data.gameCreator.uid === user.uid
      )
      setMyLists(myGames)
      setLoading(false)
      const review = await baseApi.get(`/reviews`)
      const myData = review.data.content.filter(
        (data) => data.writtenUser.uid === user.uid
      )
      setReviews(myData)
      const resGame = await baseApi(`games/histories/playgames`)
      setPlayGames(resGame.data.content)
    } catch (err) {
      console.log(err)
    }
  }

  const onFinish = async (values) => {
    try {
      const res = await baseApi.post('/reviews', {
        gameNo: values.gameNo,
        reviewContent: values.reviewContent,
        score: values.score,
      })
      if (res.data) {
        console.log(res.data)
        alert('리뷰가 등록되었습니다')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
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
        <li>
          <p>알림</p>
        </li>
        <li>
          <p>친구목록</p>
        </li>
      </MyPageUl>
      {clickTab === 0 && <MyGames myLists={myLists} />}
      {clickTab === 1 && (
        <MyReviews
          playGames={playGames}
          reviews={reviews}
          onFinish={onFinish}
        />
      )}
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
