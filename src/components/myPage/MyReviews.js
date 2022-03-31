import React, { useState } from 'react'
import styled from 'styled-components'
import Avatar from 'components/common/Avatar'
import { Rate } from 'antd'
import { customIcons } from 'components/common/constants'
import ReviewModal from './ReviewModal'
import baseApi from 'service/baseApi'

const MyReviewItem = ({ review, handleEdit }) => {
  const { reviewContent, reviewNo, updDtm, score } = review
  const userImg = review.recipient.profileUrl
  const nickName = review.recipient.nickname
  const court = review.game.court.name

  const handleEditClick = () => {
    handleEdit(reviewNo)
  }
  return (
    <>
      <MyLiDiv>
        <Avatar userImg={userImg} nickName={nickName} court={court} $Review />
        <div className="mydiv_bottom">
          <Rate
            disabled
            value={score}
            character={({ index }) => customIcons[index + 1]}
          />
          <p>{reviewContent}</p>
        </div>
      </MyLiDiv>
      <MyListP>{updDtm.split('T')[0]}</MyListP>
      <button onClick={handleEditClick}>수정</button>
    </>
  )
}

const MyReviews = ({ reviews, playGames, onFinish }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [values, setValues] = useState(null)
  const [editing, setEditing] = useState(null)
  const [clickTab, setClickTab] = useState(0)

  const result = playGames.reduce((acc, curr) => {
    const index = reviews.findIndex(
      (item) => item.gameUserNo === curr.gameUserNo
    )
    index === -1 && acc.push(curr)
    return acc
  }, [])
  console.log('결과 나오냐', result)

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleEdit = async (reviewNo) => {
    setIsModalVisible(true)
    const review = await baseApi(`/reviews/${reviewNo}`)
    if (review.data) {
      const { nickname, profileUrl } = review.data.recipient
      setValues({
        nickname: nickname,
        profileUrl: profileUrl,
        court: review.data.game.court.name,
        date: review.data.updDtm,
      })
      setEditing({
        gameNo: review.data.game.gameNo,
        score: review.data.score,
        reviewContent: review.data.reviewContent,
      })
    }
  }

  return (
    <MyDiv>
      <h3>리뷰</h3>
      <ReviewNav>
        <Button
          $select={clickTab === 0}
          onClick={() => {
            setClickTab(0)
          }}
        >
          작성 가능한 리뷰
        </Button>
        <Button
          $select={clickTab === 1}
          onClick={() => {
            setClickTab(1)
          }}
        >
          내 리뷰({reviews.length})
        </Button>
      </ReviewNav>
      {clickTab === 0 && (
        <ul>
          {playGames
            .filter((playGame) => {
              return !reviews.some(
                (review) => review.gameUserNo === playGame.gameUserNo
              )
            })
            .map((writeReview) => (
              <li>{writeReview.gameUserNo}</li>
            ))}
        </ul>
      )}
      {clickTab === 1 && (
        <MyUl>
          {reviews.map((review) => {
            return (
              <MyLi key={review.reviewNo}>
                <MyReviewItem review={review} handleEdit={handleEdit} />
              </MyLi>
            )
          })}
        </MyUl>
      )}
      {isModalVisible && (
        <ReviewModal
          setIsModalVisible={setIsModalVisible}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          values={values}
          editing={editing}
          onFinish={onFinish}
        />
      )}
    </MyDiv>
  )
}

export default MyReviews

const MyDiv = styled.div`
  padding-top: 65px;
  width: 1050px;
  margin: 0 auto;
  h3 {
    height: 36px;
    font-weight: 700;
    font-size: 24px;
    color: #333;
    /* padding-bottom: 40px;
    border-bottom: 4px solid #000; */
  }
`
const MyUl = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  button {
    margin: auto;
    font-size: 14px;
    color: #303033;
    background-color: transparent;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #303033;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: #303033;
    }
  }
`
const MyLi = styled.li`
  display: flex;

  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #303033;
  width: 100%;
`
const MyLiDiv = styled.div`
  display: block;
  min-height: 48px;
  padding: 0 15px 0 68px;
  width: 70%;
  .mydiv_bottom {
    padding-left: 80px;
    p {
      padding-top: 10px;
    }
  }
`
const MyListP = styled.p`
  width: 15%;
`
const ReviewNav = styled.div`
  margin-top: 16px;
  border-bottom: 4px solid #000;
  display: flex;
`
const Button = styled.button`
  cursor: pointer;
  width: 180px;
  background-color: ${(props) => (props.$select ? '#000' : 'transparent')};
  border: 1px solid #d4d4d4;
  border-bottom: none;
  font-size: 14px;
  color: ${(props) => (props.$select ? '#fff' : '#a0a0a0')};
  line-height: 48px;
  text-align: center;
`
