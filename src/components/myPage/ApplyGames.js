import React from 'react'
import Avatar from 'components/common/Avatar'
import { Link } from 'react-router-dom'
import NotificationUl from 'components/common/NotificationUl'

const ApplyGames = ({ applyGames }) => {
  return (
    <NotificationUl>
      {applyGames.map((applyGame) => {
        console.log(applyGame.status)
        const joinGame = applyGame.joinedGame
        if (applyGames) {
          const nickName = joinGame.gameCreator.nickname
          const userImg = joinGame.gameCreator.profileUrl
          return (
            <li key={joinGame.gameNo}>
              <Avatar nickName={nickName} userImg={userImg} data={applyGame} />
              {applyGame.status === 'APPLYING' && (
                <div>
                  <Link to={`/pages/detail/${joinGame.gameNo}`}>
                    <p className="link">{joinGame.title}</p>
                  </Link>
                  <p>글에 신청되었습니다.</p>
                </div>
              )}
              {applyGame.status === 'APPROVED' && (
                <p>님의 경기 신청이 ✔수락✔ 되었습니다.</p>
              )}
              {applyGame.status === 'REFUSED' && (
                <p>님의 경기 신청이 ❌거절❌ 되었습니다.</p>
              )}
            </li>
          )
        }
        return <li>신청글이 없습니다😭</li>
      })}
    </NotificationUl>
  )
}

export default ApplyGames
