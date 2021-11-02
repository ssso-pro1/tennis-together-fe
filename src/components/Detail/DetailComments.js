import React from 'react'

import styled, { css } from 'styled-components'

import AvatarBase from '../../styled-components/Avatar'
import Button from '../../styled-components/Buttons'

const CommentBox = styled.div`
  padding: 20px 0 16px;
  ${AvatarBase} {
    padding-bottom: 7px;
  }
  time {
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.005em;
    color: #8c8d96;
    margin-bottom: 5px;
  }

  ${(props) =>
    props.ReplyBox &&
    css`
      padding-top: 20px;
      padding-bottom: 16px;
      padding-right: 26px;
      padding-left: 40px;
      border-top: 1px solid ${(props) => props.theme.gray};
      border-bottom: 1px solid ${(props) => props.theme.gray};
    `}
  ${(props) =>
    props.TextBox &&
    css`
      display: flex;
      flex-wrap: wrap;
      justify-content: end;
      padding-top: 20px;
      padding-bottom: 16px;
      padding-right: 26px;
      padding-left: 40px;
      border-top: 1px solid ${(props) => props.theme.gray};
      border-bottom: 1px solid ${(props) => props.theme.gray};
      background-color: ${(props) => props.bgc || 'rgba(0, 0, 0, 0.05)'};
      textarea {
        border: 1px solid ${(props) => props.theme.gray};
        border-radius: 4px;
        display: block;
        width: 100%;
        height: 150px;
        &::placeholder {
          padding: 20px 0 0 30px;
          font-size: 14px;
        }
      }
      ${Button} {
        margin-top: 10px;
      }
    `}
`

function DetailComments() {
  return (
    <div>
      <CommentBox>
        <AvatarBase>
          <a href="" className="avatarImg" size={'24px'}>
            {/* <img
              src="../styled-components/assets/images/img-user-02.png"
              alt=""
            /> */}
          </a>
          <a href="" className="nickname">
            <strong>연두언니</strong>
          </a>
        </AvatarBase>
        <div>
          <p>경력 3개월차인데 가능한가요?</p>
        </div>
        <time dateTime="2021-01-01">2021.01.01</time>
        <div>
          <Button Secondary fs={'12px'} height={'20px'} width={'50px'}>
            답글
          </Button>
          <Button Secondary fs={'12px'} height={'20px'} width={'50px'}>
            비공개
          </Button>
        </div>
      </CommentBox>
      <CommentBox ReplyBox>
        <AvatarBase>
          <a href="" className="avatarImg" size={'24px'}>
            {/* <img
              src="../styled-components/assets/images/img-user-02.png"
              alt=""
            /> */}
          </a>
          <a href="" className="nickname">
            <strong>연두언니</strong>
          </a>
        </AvatarBase>
        <div>
          <p>경력 3개월차인데 가능한가요?</p>
          <time dateTime="2021-01-01">2021.01.01</time>
        </div>
      </CommentBox>
      <CommentBox>
        <AvatarBase>
          <a href="" className="avatarImg" size={'24px'}>
            {/* <img
              src="../styled-components/assets/images/img-user-02.png"
              alt=""
            /> */}
          </a>
          <a href="" className="nickname">
            <strong>연두언니</strong>
          </a>
        </AvatarBase>
        <div>
          <p>경력 3개월차인데 가능한가요?</p>
          <time dateTime="2021-01-01">2021.01.01</time>
        </div>
        <div>
          <Button Secondary fs={'12px'} height={'20px'} width={'50px'}>
            답글
          </Button>
          <Button Secondary fs={'12px'} height={'20px'} width={'50px'}>
            비공개
          </Button>
        </div>
      </CommentBox>
      <CommentBox TextBox>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="댓글을 작성하세요"
        ></textarea>
        <Button type="submit" fs={'16px'}>
          댓글작성
        </Button>
      </CommentBox>

      <CommentBox TextBox bgc={'white'}>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="댓글을 작성하세요"
        ></textarea>
        <Button type="submit" fs={'16px'}>
          댓글작성
        </Button>
      </CommentBox>
    </div>
  )
}

export default DetailComments
