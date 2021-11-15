import React, { useEffect, useState } from 'react'

import Button from 'styled-components/Buttons'
import CommentBox from 'styled-components/CommentBox'

import CommentItem from 'components/Detail/CommentItem'

function DetailComments() {
  const [value, setValue] = useState('')
  const [comments, setCommemts] = useState([])

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (value === '') {
      return alert('댓글을 입력하세요')
    } else {
      setCommemts((currentArray) => [value, ...currentArray])
      setValue('')
    }
  }
  console.log(comments)
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem comment={comment} />
      ))}
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
