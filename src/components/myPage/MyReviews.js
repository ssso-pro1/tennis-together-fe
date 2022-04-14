import React, { useState } from 'react'
import styled from 'styled-components'
import Avatar from 'components/common/Avatar'
import { Rate } from 'antd'
import { customIcons } from 'components/common/constants'
import ReviewModal from './ReviewModal'
import { deleteReview } from 'service/api'
import { BREAKPOINT_TABLET, mediaQueries } from 'components/common/constants'

const WriteReviewItem = ({ writeReview, onReviewOpen }) => {
  const { profileUrl, nickname } = writeReview.userPlayedWith
  const court = writeReview.joinedGame.court.name
  const gameNo = writeReview.joinedGame.gameNo
  const date = writeReview.updDtm
  const reviewer = { profileUrl, nickname, court, date, gameNo }

  const onModalOpen = () => {
    onReviewOpen(reviewer)
  }

  return (
    <>
      <MyLiDiv>
        <Avatar
          userImg={profileUrl}
          nickName={nickname}
          court={court}
          $Review
        />
      </MyLiDiv>
      <MyListP>{date.split('T')[0]}</MyListP>
      <div className="button">
        <button onClick={onModalOpen}>리뷰쓰기</button>
      </div>
    </>
  )
}
const MyReviewItem = ({ review, handleEdit, handleDelete }) => {
  const { reviewContent, reviewNo, updDtm, score } = review
  const userImg = review.recipient.profileUrl
  const nickName = review.recipient.nickname
  const court = review.game.court.name

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
      <div className="button">
        <button onClick={() => handleEdit(reviewNo)}>수정</button>
        <button onClick={() => handleDelete(reviewNo)}>삭제</button>
      </div>
    </>
  )
}

const MyReviews = ({
  editing,
  values,
  reviews,
  onCancel,
  onReviewOpen,
  writeReviews,
  onSubmitSuccess,
  handleEditSuccess,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [clickTab, setClickTab] = useState(0)

  const handleReviewOpen = (reviewer) => {
    setIsModalVisible(true)
    onReviewOpen(reviewer)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    onCancel()
  }

  const handleDelete = (reviewNo) => {
    deleteReview(reviewNo)
  }

  const handleEdit = (reviewNo) => {
    setIsModalVisible(true)
    handleEditSuccess(reviewNo)
  }

  const onSubmitReview = (values) => {
    onSubmitSuccess(values)
    setIsModalVisible(false)
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
          작성 가능한 리뷰({writeReviews.length})
        </Button>
        <Button
          $select={clickTab === 1}
          onClick={() => {
            setClickTab(1)
          }}
        >
          작성한 리뷰({reviews.length})
        </Button>
      </ReviewNav>
      {clickTab === 0 && (
        <MyUl>
          {writeReviews.length !== 0 ? (
            writeReviews.map((writeReview) => {
              return (
                <MyLi key={writeReview.joinedGame.gameNo}>
                  <WriteReviewItem
                    writeReview={writeReview}
                    onReviewOpen={handleReviewOpen}
                  />
                </MyLi>
              )
            })
          ) : (
            <NoneP>📄작성할 리뷰가 없습니다.</NoneP>
          )}
        </MyUl>
      )}
      {clickTab === 1 && (
        <MyUl>
          {reviews.length !== 0 ? (
            reviews.map((review) => {
              return (
                <MyLi key={review.reviewNo}>
                  <MyReviewItem
                    review={review}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </MyLi>
              )
            })
          ) : (
            <NoneP>📄작성한 리뷰가 없습니다.</NoneP>
          )}
        </MyUl>
      )}
      {isModalVisible && (
        <ReviewModal
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          values={values}
          editing={editing}
          onSubmitReview={onSubmitReview}
        />
      )}
    </MyDiv>
  )
}

export default MyReviews

const MyDiv = styled.div`
  padding-top: 65px;
  width: 80%;
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
  .button {
    margin: auto;

    button {
      margin-right: 5px;
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
  }
`
const MyLi = styled.li`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #303033;
  width: 100%;
  ${mediaQueries(BREAKPOINT_TABLET)} {
    flex-direction: column;
    position: relative;
    .button {
      position: absolute;
      right: 0;
    }
  }
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
  ${mediaQueries(BREAKPOINT_TABLET)} {
    width: 100%;
    padding: 0;
    margin-bottom: 15px;
  }
`
const MyListP = styled.p`
  width: 15%;
  ${mediaQueries(BREAKPOINT_TABLET)} {
    display: none;
  }
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
const NoneP = styled.p`
  padding: 25px;
  margin-top: 10px;
  width: 100%;
  text-align: left;
`
