import styled from 'styled-components'
import React, { useState } from 'react'
import { Modal } from 'antd'
import Avatar from 'components/common/Avatar'
import { Link } from 'react-router-dom'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import { BREAKPOINT_TABLET, mediaQueries } from 'components/common/constants'
import {
  applyGame,
  applyHistory,
  approveGame,
  myGameApplyUser,
  refuseGame,
} from 'service/api'

const MyGameModal = ({ applyUser, onCancelGame, onApproveGame }) => {
  const { nickname, profileUrl, uid } = applyUser.gameUser
  const { gameNo, title } = applyUser.joinedGame
  return (
    <GameModal>
      <Avatar nickName={nickname} userImg={profileUrl} data={applyUser} />
      {applyUser.status === 'APPLYING' && (
        <div>
          <p>님이</p>
          <Link to={`/pages/${gameNo}/detail`}>{title}</Link>
          <p>글에 신청했습니다.</p>
          <CheckCircleOutlined
            onClick={() => {
              onApproveGame(gameNo, uid)
            }}
          />
          <CloseCircleOutlined
            onClick={() => {
              onCancelGame(gameNo, uid)
            }}
          />
        </div>
      )}
      {applyUser.status === 'APPROVED' && <p>님을 ✔수락✔ 했습니다.</p>}
      {applyUser.status === 'REFUSED' && <p>님을 ❌거절❌ 했습니다.</p>}
    </GameModal>
  )
}

const MyListItem = ({ myList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [applyUsers, setApplyUsers] = useState()
  const { updDtm, title, stDvCd, gameNo } = myList
  console.log(myList)
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onModalOpen = async () => {
    setIsModalVisible(true)
    let userData = await myGameApplyUser(gameNo)
    setApplyUsers(userData.data)
  }

  const onApproveGame = async (gameNo, userUid) => {
    try {
      const approve = await approveGame(gameNo, userUid)
      if (approve.data) {
        alert('수락 되었습니다')
      }
      const res = await applyHistory()
      setApplyUsers(res.data.content)
    } catch (error) {
      console.log(error)
      alert('수락기간이 지난 글 입니다.')
    }
  }

  const onCancelGame = async (gameNo, userUid) => {
    if (window.confirm('거절 하시겠습니까?')) {
      try {
        const cancel = await refuseGame(gameNo, userUid)
        if (cancel.data) {
          alert('거절 되었습니다')
        }
        const res = await applyHistory()
        setApplyUsers(res.data.content)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <MyContents>
        <MyListP>{updDtm.split('T')[0]}</MyListP>
        <MyListP $width={'55%'}>
          <Link to={`/pages/${gameNo}/detail`}>{title}</Link>
        </MyListP>
        <MyListP className="status">{stDvCd}</MyListP>
        <button onClick={onModalOpen}>신청현황</button>
      </MyContents>
      {isModalVisible && (
        <Modal
          title="신청현황"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {applyUsers && (
            <MyListUl>
              {applyUsers.empty ? (
                <p>신청글이 없습니다.</p>
              ) : (
                applyUsers.content.map((applyUser) => {
                  return (
                    <li key={applyUser.gameUserNo}>
                      <MyGameModal
                        applyUser={applyUser}
                        onApproveGame={onApproveGame}
                        onCancelGame={onCancelGame}
                      />
                    </li>
                  )
                })
              )}
            </MyListUl>
          )}
        </Modal>
      )}
    </div>
  )
}

const MyGames = ({ myLists }) => {
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  })
  return (
    <MyDiv>
      <h3>내가 작성한 글</h3>
      <Ul>
        {isMobile || (
          <li>
            <MyTbl>
              <MyListP $bold>작성일</MyListP>
              <MyListP $bold $width={'55%'}>
                제목
              </MyListP>
              <MyListP $bold>상태</MyListP>
            </MyTbl>
          </li>
        )}
        {myLists.length !== 0 ? (
          myLists.map((myList) => {
            return (
              <li key={myList.gameNo}>
                <MyListItem myList={myList} />
              </li>
            )
          })
        ) : (
          <NoneP>📄작성한 글이 없습니다.</NoneP>
        )}
      </Ul>
    </MyDiv>
  )
}

export default MyGames
const MyDiv = styled.div`
  padding-top: 65px;
  width: 80%;
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
const MyListUl = styled.ul`
  li {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    div {
      display: flex;
      align-items: center;
      .link {
        color: #11992f;
        padding-right: 5px;
        font-weight: bold;
        &:hover {
          text-decoration: underline;
        }
      }
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

  ${mediaQueries(BREAKPOINT_TABLET)} {
    height: auto;
    flex-direction: column;
    position: relative;
    button {
      position: absolute;
      right: 0;
    }
    .status {
      font-weight: bold !important;
    }
  }
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
  ${mediaQueries(BREAKPOINT_TABLET)} {
    width: 100%;
    text-align: left;
    margin-bottom: 5px;
  }
`
const NoneP = styled.p`
  padding: 25px;
  margin-top: 10px;
  width: 100%;
  text-align: left;
`
const GameModal = styled.div`
  a {
    color: #303033;
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    margin-left: 6px;
  }
`
