import React, { useEffect, useState } from 'react'

import Button from 'styled-components/Buttons'
import CommentBox from 'styled-components/CommentBox'

import CommentItem from 'components/Detail/CommentItem'

function DetailComments({
  todos,
  setTodos,
  onInsertComment,
  onChangeSelectedComment,
  selectedComment,
}) {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onInsertComment(value)
    setValue('')
  }

  // 댓글삭제함수
  const onRemove = (game_no) => {
    setTodos((todos) => todos.filter((todo) => todo.game_no !== game_no))
  }

  useEffect(() => {
    if (selectedComment) {
      setValue(selectedComment.content)
    }
  }, [selectedComment])
  return (
    <div>
      {/* {todos.map((todo) => (
        <CommentItem
          todo={todo}
          key={todo.game_no}
          value={value}
          onSubmit={onSubmit}
          onChange={onChange}
          onRemove={onRemove}
          selectedComment={selectedComment}
          onChangeSelectedComment={onChangeSelectedComment}
        />
      ))} */}
      <form onSubmit={onSubmit}>
        <CommentBox TextBox>
          <textarea
            placeholder="댓글을 입력하세요"
            value={value}
            onChange={onChange}
          />
          <Button type="submit">댓글달기</Button>
        </CommentBox>
      </form>
    </div>
  )
}

export default DetailComments
