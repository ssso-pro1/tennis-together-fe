import React, { useState } from 'react'
import { LoadingSpin } from 'components/common/constants'
import Avatar from 'components/common/Avatar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NotiList = ({ applyGame }) => {
  return (
    <MyContents>
      <MyListP $width={'20%'}>{applyGame.joinedGame.court.name}</MyListP>
      <MyListP $width={'55%'}>
        <Link to={`/pages/${applyGame.joinedGame.gameNo}/detail`}>
          {applyGame.joinedGame.title}
        </Link>
      </MyListP>
      <MyListP>{applyGame.status}</MyListP>
    </MyContents>
  )
}

const Notifications = ({ applyGames }) => {
  const [loading, setLoading] = useState(false)
  console.log(applyGames)

  return (
    <div>
      {loading ? (
        <LoadingSpin />
      ) : (
        <MyDiv>
          <h3>알림</h3>
          <Ul>
            <li>
              <MyTbl>
                <MyListP $bold $width={'20%'}>
                  테니스장
                </MyListP>
                <MyListP $bold $width={'55%'}>
                  글 제목
                </MyListP>
                <MyListP $bold>상태</MyListP>
              </MyTbl>
            </li>
            {applyGames.map((applyGame) => {
              if (applyGame) {
                return (
                  <li key={applyGame.gameUserNo}>
                    <NotiList applyGame={applyGame} />
                  </li>
                  // <li key={joinGame.gameNo}>
                  //   <Avatar
                  //     nickName={nickName}
                  //     userImg={userImg}
                  //     data={applyGame}
                  //   />
                  //   {applyGame.status === 'APPLYING' && (
                  //     <div>
                  //       <a to={`/pages/detail/${joinGame.gameNo}`}>
                  //         <p className="link">{joinGame.title}</p>
                  //       </a>
                  //       <p>글에 신청되었습니다.</p>
                  //     </div>
                  //   )}
                  //   {applyGame.status === 'APPROVED' && (
                  //     <p>님의 경기 신청이 ✔수락✔ 되었습니다.</p>
                  //   )}
                  //   {applyGame.status === 'REFUSED' && (
                  //     <p>님의 경기 신청이 ❌거절❌ 되었습니다.</p>
                  //   )}
                  // </li>
                )
              }
              return <li>신청글이 없습니다😭</li>
            })}
          </Ul>
        </MyDiv>
      )}
    </div>
  )
}

export default Notifications

const MyDiv = styled.div`
  padding-top: 65px;
  width: 1050px;
  margin: 0 auto;
  h3 {
    height: 36px;
    font-weight: 700;
    font-size: 24px;
    color: #333;
    padding-bottom: 40px;
    border-bottom: 4px solid #000;
  }
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`
const MyTbl = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  height: 50px;
  border-bottom: 1px solid #303033;
`

const MyListP = styled.p`
  text-align: center;
  font-size: 14px;
  color: #303033;
  box-sizing: border-box;
  font-weight: ${(props) => props.$bold && 'bold'};
  width: ${(props) => props.$width || '15%'};
  a {
    color: #303033;
    &:hover {
      text-decoration: underline;
    }
  }
`
const MyContents = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px 0;
  border-bottom: 1px solid #d4d4d4;
  button {
    margin: auto;
    font-size: 14px;
    color: #303033;
    background-color: transparent;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #303033;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: #303033;
    }
  }
`
