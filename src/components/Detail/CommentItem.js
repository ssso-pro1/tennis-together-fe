import React, { useState, useContext } from 'react'
import { UserContext } from 'service/authState'
import styled, { css } from 'styled-components'
import { MoreOutlined } from '@ant-design/icons'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

import Button from 'styled-components/Buttons'
import CommentBox from 'styled-components/CommentBox'
import AvatarBase from 'styled-components/AvatarBase'
import Flexbox from 'styled-components/Flexbox'

const CommentItem = ({ comment }) => {
  const { user } = useContext(UserContext)
  const [click, setClick] = useState(true)
  const updates = comment.regDtm.split('T')
  console.log('아이템넘어왓냐', comment)

  function showBox() {
    setClick(!click)
  }

  const Editbox = styled.p`
    position: relative;
    .point {
      cursor: pointer;
      padding: 10px;
    }
    .box {
      position: absolute;
      top: 35px;
      left: 0;
      border: 1px solid #c4c4c4;
      width: 50px;

      span {
        cursor: pointer;
        display: block;
        padding: 5px;
        font-size: 14px;
        color: #c4c4c4;
        text-align: center;
        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  `

  return (
    <div>
      <CommentBox className="commentItem">
        <Flexbox jc={'space-between'} className="writer">
          <Flexbox ColomnFlexbox>
            <AvatarBase style={{ padding: '0' }}>
              <a href="" className="avatarImg">
                {user.profileUrl === null ? (
                  <img src={DefaultImg} alt={DefaultImg} />
                ) : (
                  <img src={user.profileUrl} alt={user.profileUrl} />
                )}
              </a>
              <a href="" className="nickname">
                <strong>{user.nickname}</strong>
              </a>
            </AvatarBase>
          </Flexbox>
          <Editbox onClick={showBox}>
            <MoreOutlined className="point" />
            {click ? null : (
              <div className="box">
                <span>수정</span>
                <span>삭제</span>
              </div>
            )}
          </Editbox>
        </Flexbox>
        <div className="content">{comment.reviewContent}</div>
        <time>{updates[0]}</time>
        <div>
          <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
            답글
          </Button>
        </div>
      </CommentBox>
    </div>
  )
}

export default CommentItem
