import React, { useState, useContext } from 'react'
import { UserContext } from 'service/authState'
import styled, { css } from 'styled-components'
import { MoreOutlined } from '@ant-design/icons'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'
import baseApi from 'service/baseApi'
import { useParams } from 'react-router'

import Button from 'styled-components/Buttons'
import CommentBox from 'styled-components/CommentBox'
import AvatarBase from 'styled-components/AvatarBase'
import Flexbox from 'styled-components/Flexbox'

const CommentItem = ({ comment, setComments }) => {
  const { user } = useContext(UserContext)
  const { gameNo } = useParams()
  const [click, setClick] = useState(true)
  const updates = comment.regDtm.split('T')
  console.log('아이템넘어왓냐', comment)
  console.log('유저넘어왓냐', user)

  function del() {
    const commentNo = comment.commentNo

    if (window.confirm('삭제 하시겠습니까?')) {
      baseApi
        .delete(`/games/${gameNo}/comments/${commentNo}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(function (response) {
          alert('삭제되었습니다')
          console.log(response)
          baseApi.get(`/games/${gameNo}/comments`).then((response) => {
            setComments(response.data)
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  }

  function showBox() {
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
              <a href="" className="avatarImg">
                {user && user.profileUrl === null ? (
                  <img src={DefaultImg} alt={DefaultImg} />
                ) : (
                  <img src={user.profileUrl} alt={user.profileUrl} />
                )}
              </a>
              <a href="" className="nickname">
                <strong style={{ fontWeight: '700' }}>{user.nickname}</strong>
              </a>
            </AvatarBase>
          </Flexbox>
          {user && user.uid ? (
            <Editbox onClick={showBox}>
              <MoreOutlined className="point" />
              {click ? null : (
                <div className="box">
                  <span>수정</span>
                  <span onClick={del}>삭제</span>
                </div>
              )}
            </Editbox>
          ) : null}
        </Flexbox>
        <Content>
          <p>{comment.reviewContent}</p>
          <time>{updates[0]}</time>
        </Content>
        <div>
          {/* <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
            답글
          </Button> */}
        </div>
      </CommentBox>
    </div>
  )
}

export default CommentItem
