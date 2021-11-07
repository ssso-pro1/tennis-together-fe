import React from 'react'
import CommentBox from 'styled-components/Avatar'
export default function CommmentList() {
  return (
    <div>
      <CommentBox className="commentItem">
        <Flexbox jc={'space-between'} className="writer">
          <Avatar />
          <Flexbox ColomnFlexbox>
            <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
              수정
            </Button>
            <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
              삭제
            </Button>
          </Flexbox>
        </Flexbox>
        <div className="content">{content}</div>
        <div>
          <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
            답글
          </Button>
          <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
            비공개
          </Button>
        </div>
      </CommentBox>
    </div>
  )
}
