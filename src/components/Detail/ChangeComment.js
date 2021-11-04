import React from 'react'
import CommentBox from 'styled-components/CommentBox'
import Button from 'styled-components/Buttons'

const ChangeComment = ({
  todo,
  value,
  onSubmit,
  onChange,

  onChangeSelectedComment,
}) => {
  return (
    <div className="changecomment">
      <form onSubmit={onSubmit}>
        <CommentBox TextBox>
          <textarea
            className="active"
            placeholder="댓글을 입력하세요"
            value={value}
            onChange={onChange}
          />
          <Button
            type="submit"
            onClick={() => {
              onChangeSelectedComment(todo)
            }}
          >
            수정하기
          </Button>
        </CommentBox>
      </form>
    </div>
  )
}

export default ChangeComment
