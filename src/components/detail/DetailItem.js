import React from 'react'
import styled from 'styled-components'
import DetailTable from './DetailTable'
import Avatar from 'components/common/Avatar'
import Button from 'components/common/Buttons'
import { LoadingSpin } from 'components/common/constants'

const DetailItem = ({ game, onEdit, del, loading, gameApply, user, apply }) => {
  const { nickname, profileUrl, uid } = game.gameCreator
  const today = new Date()
  const endDt = new Date(game.endDt)
  const lastDay = new Date(endDt.setHours(endDt.getHours() + 15))
  if (apply) {
    var result = apply.find((e) => e.joinedGame.gameNo === game.gameNo)
  }

  return (
    <>
      <div key={game.gameNo}>
        <TitleWrap>
          <h1>{game.title}</h1>
        </TitleWrap>
        <Avatar
          data={game}
          nickName={nickname}
          userImg={profileUrl}
          updTime={game.updDtm}
        />
        {loading ? <LoadingSpin /> : <DetailTable game={game} />}
        {user && user.uid === uid ? (
          <FlexBox>
            <Button
              height={'40px'}
              onClick={onEdit}
              style={{ marginRight: '5px' }}
            >
              수정
            </Button>
            <Button height={'40px'} onClick={() => del(game.gameNo)}>
              삭제
            </Button>
          </FlexBox>
        ) : (
          <FlexBox>
            {result || today > lastDay ? (
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
        )}
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
