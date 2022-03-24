import React from 'react'
import Avatar from 'components/common/Avatar'
import { Link } from 'react-router-dom'

const ApplyGames = ({ applyGames }) => {
  return (
    <ul>
      {applyGames.map((applyGame) => {
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
                    {joinGame.title}
                  </Link>
                  <p>글에 신청되었습니다.</p>
                </div>
              )}
              {applyGame.status === 'APPROVED' ? (
                <p>경기 신청이 ✔수락✔ 되었습니다.</p>
              ) : (
                <p>경기 신청이 ❌거절❌ 되었습니다.</p>
              )}
            </li>
          )
        }
        return <li>신청글이 없습니다😭</li>
      })}
    </ul>
  )
}

export default ApplyGames
