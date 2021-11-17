import AvatarBase from 'styled-components/AvatarBase'
import DefaultImg from './assets/images/img-user-default.png'

const Avatar = ({ game }) => {
  const updates = game.updDtm.split('T')

  return (
    <div>
      <AvatarBase>
        <a href="" className="avatarImg">
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
