import React, { useState, useContext } from 'react'
import { UserContext } from 'service/authState'
import styled from 'styled-components'
import { MoreOutlined } from '@ant-design/icons'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import baseApi from 'service/baseApi'
import { useParams } from 'react-router'
import CommentBox from 'styled-components/CommentBox'
import AvatarBase from 'styled-components/AvatarBase'
import Flexbox from 'styled-components/Flexbox'

const CommentItem = ({ comment, setComments }) => {
  const { user } = useContext(UserContext)
  const { gameNo } = useParams()
  const [click, setClick] = useState(false)
  const updates = comment.regDtm.split('T')

  // 댓글 삭제
  const del = async () => {
    const commentNo = comment.commentNo

    if (window.confirm('삭제 하시겠습니까?')) {
      try {
        const del = await baseApi.delete(
          `/games/${gameNo}/comments/${commentNo}`
        )
        if (del.status === 200) {
          alert('삭제되었습니다')
        }
        const res = await baseApi.get(`/games/${gameNo}/comments`)
        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showBox = () => {
    setClick(!click)
  }

  const Editbox = styled.p`
    position: relative;
    .point {
      cursor: pointer;
      padding: 10px;
      color: #8c8d96;
    }
    .box {
      position: absolute;
      top: 35px;
      left: -20px;
      border: 1px solid #8c8d96;

      width: 50px;

      span {
        cursor: pointer;
        display: block;
        padding: 5px;
        font-size: 14px;
        color: #8c8d96;
        text-align: center;
        transition: background-color 100ms ease-in-out;
        &:hover {
          background-color: rgba(0, 0, 0, 0.06);
        }
      }
    }
  `
  const Content = styled.div`
    padding: 15px 5px;
    p {
      padding-bottom: 10px;
      font-size: 15px;
    }
    time {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.005em;
      color: #8c8d96;
    }
  `

  return (
    <div>
      <CommentBox className="commentItem">
        <Flexbox jc={'space-between'} className="writer">
          <Flexbox ColomnFlexbox>
            <AvatarBase style={{ padding: '0' }}>
              <a href="#!" className="avatarImg">
                {comment.comtWriteUser.profileUrl === null ? (
                  <img src={DefaultImg} alt={DefaultImg} />
                ) : (
                  <img
                    src={comment.comtWriteUser.profileUrl}
                    alt={comment.comtWriteUser.profileUrl}
                  />
                )}
              </a>
              <strong className="nickname" style={{ fontWeight: '700' }}>
                {comment.comtWriteUser.nickname}
              </strong>
            </AvatarBase>
          </Flexbox>
          {user && user.uid === comment.comtWriteUser.uid && (
            <Editbox onClick={showBox}>
              <MoreOutlined className="point" />
              {click && (
                <div className="box">
                  <span>수정</span>
                  <span onClick={del}>삭제</span>
                </div>
              )}
            </Editbox>
          )}
        </Flexbox>
        <Content>
          <p>{comment.reviewContent}</p>
          <time>{updates[0]}</time>
        </Content>
      </CommentBox>
    </div>
  )
}

export default CommentItem
