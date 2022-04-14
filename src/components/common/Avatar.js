import styled, { css } from 'styled-components'
import DefaultImg from 'components/common/images/img-user-default.png'
import PopUpProfile from 'components/popUpProfile/PopUpProfile'
import React, { useState } from 'react'
import { Modal } from 'antd'

const Avatar = ({
  data,
  userImg,
  nickName,
  updTime = false,
  $Profile = false,
  $History = false,
  $Review = false,
  court = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const modalOpen = () => {
    setIsModalVisible(true)
  }
  return (
    <div>
      <AvatarBase $Profile={$Profile} $History={$History} $Review={$Review}>
        <div className="avatarImg">
          <img src={userImg || DefaultImg} alt="프로필 이미지" />
        </div>
        <strong className="nickname" onClick={modalOpen}>
          {nickName}
          {court && <span>{court}</span>}
        </strong>
        {updTime && <time>{updTime.split('T')[0]}</time>}
      </AvatarBase>
      {isModalVisible && (
        <Modal
          title="프로필 및 리뷰리스트"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          <PopUpProfile userData={data} nickName={nickName} />
        </Modal>
      )}
    </div>
  )
}

export default Avatar

const AvatarBase = styled.div`
  display: flex;
  align-items: center;

  .avatarImg {
    display: block;
    overflow: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .nickname {
    color: black;
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  time {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.005em;
    color: #8c8d96;
    padding-top: 3px;
  }

  .info {
    display: block;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.005em;
    color: #8c8d96;
    margin-right: 10px;
    span:not(:last-child)::after {
      content: '|';
      margin: 0 5px;
    }
  }

  ${(props) =>
    props.$Profile &&
    css`
      flex-direction: column;

      .avatarImg {
        height: 80px;
        width: 80px;
      }
      .nickname {
        font-size: 16px;
        font-weight: 700;
        display: block;
        padding: 10px 0 5px 0;
        cursor: initial;
        &:hover {
          text-decoration: none;
        }
      }
    `}
  ${(props) =>
    props.$History &&
    css`
      .avatarImg {
        height: 80px;
        width: 80px;
        margin-right: 20px;
      }
      .nickname {
        font-size: 18px;
        font-weight: 700;
        margin-top: -10px;
      }
    `}
  ${(props) =>
    props.$Review &&
    css`
      .avatarImg {
        height: 60px;
        width: 60px;
        margin-right: 10px;
      }
      .nickname {
        font-size: 16px;
        font-weight: 700;
        &:hover {
          text-decoration: none;
        }
      }
      span {
        display: block;
        font-size: 14px;
        font-weight: normal;
      }
    `}
`
