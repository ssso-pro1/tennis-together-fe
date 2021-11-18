import { Input, Form } from 'antd'

import React, { useState } from 'react'
import { useParams } from 'react-router'

import axios from 'axios'
import baseApi from 'service/baseApi'
import Button from 'styled-components/Buttons'
import CommentBox from 'styled-components/CommentBox'

import CommentItem from 'components/Detail/CommentItem'

function DetailComments({ comments }) {
  const { gameNo } = useParams()

  const onFinish = (values) => {
    baseApi
      .post(
        `/games/${gameNo}/comments`,
        {
          reviewContent: values.comments,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(function (response) {
        console.log('댓글완료', response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  console.log(comments)
  return (
    <>
      {comments.content.map(
        (comment) =>
          comment && <CommentItem comment={comment} key={comment.commentNo} />
      )}

      <Form onFinish={onFinish}>
        <CommentBox TextBox>
          <Form.Item
            name="comments"
            rules={[
              {
                required: true,
                message: '댓글을 입력하세요',
              },
            ]}
          >
            <Input.TextArea
              placeholder="댓글을 입력하세요"
              className="CommentBox"
            />
          </Form.Item>
          <Form.Item>
            <Button type="submit">댓글달기</Button>
          </Form.Item>
        </CommentBox>
      </Form>
    </>
  )
}

export default DetailComments
