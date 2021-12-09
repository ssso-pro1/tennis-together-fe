import AvatarBase from 'components/common/AvatarBase'
import DefaultImg from 'components/common/images/img-user-default.png'

const Avatar = ({ game }) => {
  const updates = game.updDtm.split('T')

  return (
    <div>
      <AvatarBase>
        <a href="#!" className="avatarImg">
          {game.gameCreator.profileUrl === null ? (
            <img src={DefaultImg} alt={DefaultImg} />
          ) : (
            <img
              src={game.gameCreator.profileUrl}
              alt={game.gameCreator.profileUrl}
            />
          )}
        </a>

        <strong className="nickname">{game.gameCreator.nickname}</strong>
        <time>{updates[0]}</time>
      </AvatarBase>
    </div>
  )
}

export default Avatar