import React from 'react'

const DetailItem = () => {
  return (
    <>
      <div key={game.gameNo}>
        <TitleWrap>
          <h1>{game.title}</h1>
        </TitleWrap>
        <Avatar game={game} />
        <DetailTable game={game} />
        {user &&
          (user.uid === game.gameCreator.uid ? (
            <Flexbox>
              <Button
                height={'40px'}
                onClick={edit}
                style={{ marginRight: '5px' }}
              >
                수정
              </Button>
              <Button height={'40px'} onClick={del}>
                삭제
              </Button>
            </Flexbox>
          ) : (
            <Flexbox>
              {(game !== null &&
                result !== undefined &&
                result.joinedGame.gameNo === game.gameNo) ||
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
            </Flexbox>
          ))}
      </div>
    </>
  )
}

export default DetailItem
