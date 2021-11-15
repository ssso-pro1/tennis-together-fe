import React, { useState } from 'react'

import Button from 'styled-components/Buttons'
import CommentBox from 'styled-components/CommentBox'
import Avatar from 'styled-components/Avatar'
import Flexbox from 'styled-components/Flexbox'

const CommentItem = ({ comment }) => {
  return (
    <div>
      <CommentBox className="commentItem">
        <Flexbox jc={'space-between'} className="writer">
          <Flexbox ColomnFlexbox>
            <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
              수정
            </Button>
            <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
              삭제
            </Button>
          </Flexbox>
        </Flexbox>
        <div className="content">{comment}</div>
        <div>
          <Button Secondary fs={'12px'} height={'20px'} width={'45px'}>
            답글
          </Button>
        </div>
      </CommentBox>
    </div>
  )
}

export default CommentItem
