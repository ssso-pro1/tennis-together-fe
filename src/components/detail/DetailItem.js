import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from 'service/authState'
import { antIcon } from 'components/common/constants'
import { Spin } from 'antd'
import DetailTable from './DetailTable'
import Avatar from 'components/common/Avatar'
import Button from 'components/common/Buttons'

const DetailItem = ({ game, apply, gameApply, onEdit, del, loading }) => {
  const { user } = useContext(UserContext)

  // const handleEditClick = () => {
  //   onEdit()
  // }

  if (apply) {
    var result = apply.find((e) => e.joinedGame.gameNo === game.gameNo)
    var today = new Date()
    var endDt = new Date(game.endDt)
    var lastDay = new Date(endDt.setHours(endDt.getHours() + 15))
  }

  return (
    <>
      <div key={game.gameNo}>
        <TitleWrap>
          <h1>{game.title}</h1>
        </TitleWrap>
        <Avatar game={game} />
        {loading ? (
          <FlexBox style={{ height: '100vh' }}>
            <Spin indicator={antIcon} />
          </FlexBox>
        ) : (
          <DetailTable game={game} />
        )}
        {user &&
          (user.uid === game.gameCreator.uid ? (
            <FlexBox>
              <Button
                height={'40px'}
                onClick={onEdit}
                style={{ marginRight: '5px' }}
              >
                수정
              </Button>
              <Button height={'40px'} onClick={del}>
                삭제
              </Button>
            </FlexBox>
          ) : (
            <FlexBox>
              {(result && result.joinedGame.gameNo === game.gameNo) ||
              today > lastDay ? (
                <Button
                  Primary
                  height={'40px'}
                  width={'200px'}
                  style={{ pointerEvents: 'none' }}
                >
                  {today > lastDay ? '신청마감' : '신청완료'}
                </Button>
              ) : (
                <Button
                  Outlined
                  height={'40px'}
                  width={'200px'}
                  onClick={gameApply}
                >
                  신청하기
                </Button>
              )}
            </FlexBox>
          ))}
      </div>
    </>
  )
}

export default DetailItem

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const TitleWrap = styled.div`
  padding: 32px 48px 32px 0;

  h1 {
    font-size: 48px;
    font-weight: bold;
  }
`
