import Avatar from 'components/common/Avatar'
import { Link } from 'react-router-dom'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import NotificationUl from 'components/common/NotificationUl'

const MyGames = ({ applyUsers, approveGame, cancelGame }) => {
  return (
    <NotificationUl>
      {applyUsers.map((applyUser) => {
        if (applyUser) {
          const nickName = applyUser.gameUser.nickname
          const userImg = applyUser.gameUser.profileUrl
          return (
            <li key={applyUser.gameUserNo}>
              <Avatar nickName={nickName} userImg={userImg} data={applyUser} />
              {applyUser.status === 'APPLYING' && (
                <div>
                  <p>님이</p>
                  <Link to={`/pages/detail/${applyUser.joinedGame.gameNo}`}>
                    {applyUser.joinedGame.title}
                  </Link>
                  <p>글에 신청했습니다.</p>
                  <CheckCircleOutlined
                    onClick={approveGame(
                      applyUser.joinedGame.gameNo,
                      applyUser.gameUser.uid
                    )}
                  />
                  <CloseCircleOutlined
                    onClick={cancelGame(
                      applyUser.joinedGame.gameNo,
                      applyUser.gameUser.uid
                    )}
                  />
                </div>
              )}
              {applyUser.status === 'APPROVED' && <p>님을 ✔수락✔ 했습니다.</p>}
              {applyUser.status === 'REFUSED' && <p>님을 ❌거절❌ 했습니다.</p>}
            </li>
          )
        }
        return <li>신청글이 없습니다😭</li>
      })}
    </NotificationUl>
  )
}

export default MyGames