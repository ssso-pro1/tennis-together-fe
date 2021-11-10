import styled from 'styled-components'
import DefaultImg from './assets/images/img-user-default.png'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Avatar = ({ game }) => {
  // const [users, setUsers] = useState([])
  // // axios Users
  // useEffect(() => {
  //   axios(`http://localhost:3000/users`) //
  //     .then((response) => {
  //       console.log(response)
  //       setUsers(response.data)
  //     })
  // }, [])

  const [isShow, setIsShow] = useState(DefaultImg)

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
      width: ${(props) => props.size || '32px'};
      height: ${(props) => props.size || '32px'};
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
      letter-spacing: -0.01em;
      margin: 0 10px;
    }
    time {
      font-size: 14px;
      line-height: 16px;
      letter-spacing: -0.005em;
      color: #8c8d96;
    }
  `
  return (
    <div>
      <AvatarBase>
        <a href="" className="avatarImg" size={'24px'}>
          <img
            src={game.gameCreator.profileUrl}
            alt={game.gameCreator.profileUrl}
          />
        </a>
        <a href="" className="nickname">
          <strong>{game.gameCreator.nickName}</strong>
        </a>
      </AvatarBase>
    </div>
  )
}

export default Avatar
