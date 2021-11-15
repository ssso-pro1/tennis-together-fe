import styled from 'styled-components'
import DefaultImg from './assets/images/img-user-default.png'

const Avatar = ({ game }) => {
  const updates = game.updDtm.split('T')

  const AvatarBase = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 20px;

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
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.005em;
      color: #8c8d96;
      margin-left: 10px;
    }
  `
  return (
    <div>
      <AvatarBase>
        <a href="" className="avatarImg" size={'24px'}>
          {game.gameCreator.profileUrl === null ? (
            <img src={DefaultImg} alt={DefaultImg} />
          ) : (
            <img
              src={game.gameCreator.profileUrl}
              alt={game.gameCreator.profileUrl}
            />
          )}
        </a>
        <a href="" className="nickname">
          <strong>{game.gameCreator.nickname}</strong>
          <time>{updates[0]}</time>
        </a>
      </AvatarBase>
    </div>
  )
}

export default Avatar
