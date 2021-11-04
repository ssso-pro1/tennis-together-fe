import React, { useState } from 'react'

import Button from 'styled-components/Buttons'
import CommentBox from 'styled-components/CommentBox'
import AvatarBase from 'styled-components/Avatar'
import Flexbox from 'styled-components/Flexbox'

import ChangeComment from './ChangeComment'

const CommentItem = ({
  todo,
  onChangeSelectedComment,
  value,
  onSubmit,
  onChange,
  onRemove,
  selectedComment,
}) => {
  const [insertToggle, setInsertToggle] = useState(false)

  const onInsertComment = () => {
    setInsertToggle((prev) => !prev)
  }

  const { content } = todo
  return (
    <div>
      <CommentBox className="commentItem">
        <Flexbox jc={'space-between'} className="writer">
          <AvatarBase>
            <a href="" className="avatarImg" size={'24px'}>
              {/* <img
                src="../styled-components/assets/images/img-user-02.png"
                alt=""
              /> */}
            </a>
            <a href="" className="nickname">
              <strong>{todo.nickname}</strong>
            </a>
          </AvatarBase>
          <Flexbox ColomnFlexbox>
            <Button
              Secondary
              fs={'12px'}
              height={'20px'}
              width={'45px'}
              onClick={() => {
                onInsertComment()
                onChangeSelectedComment(todo)
              }}
            >
              수정
            </Button>
            <Button
              Secondary
              fs={'12px'}
              height={'20px'}
              width={'45px'}
              onClick={() => {
                onRemove(selectedComment.game_no)
              }}
            >
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
      {insertToggle && (
        <ChangeComment
          todo={todo}
          value={value}
          onSubmit={onSubmit}
          onChange={onChange}
          selectedComment={selectedComment}
          onInsertComment={onInsertComment}
          onChangeSelectedComment={onChangeSelectedComment}
        />
      )}
    </div>
  )
}

export default CommentItem
