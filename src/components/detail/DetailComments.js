import Button from 'components/common/Buttons'
import styled from 'styled-components'
import React, { useState, useContext } from 'react'
import { UserContext } from 'service/authState'
import { MoreOutlined } from '@ant-design/icons'
import { useParams } from 'react-router'
import Flexbox from 'components/common/Flexbox'
import { Input, Form } from 'antd'
import Avatar from 'components/common/Avatar'
import { getComment } from 'service/api'

const CommentItem = ({ comment, onCommentEdit, onCommentDelete }) => {
  const { user } = useContext(UserContext)
  const { gameNo } = useParams()
  const [click, setClick] = useState(false)
  const [editComment, setEditComment] = useState(true)

  const updates = comment.regDtm.split('T')
  const [form] = Form.useForm()
  const commentNo = comment.commentNo
  const { nickname, profileUrl } = comment.comtWriteUser

  const onEditComment = async () => {
    setEditComment(false)
    const res = await getComment(gameNo)
    const prevData = res.data.content.find(
      (e) => e.commentNo === comment.commentNo
    )
    form.setFieldsValue({
      reviewContent: prevData.reviewContent,
    })
  }

  const onFinish = (values) => {
    onCommentEdit(values, commentNo)
    alert('수정이 완료되었습니다')
  }

  const deleteComment = () => {
    onCommentDelete(commentNo)
  }

  const handleClearClick = () => {
    setEditComment(true)
  }

  const showBox = () => {
    setClick(!click)
  }

  return (
    <div>
      <Flexbox jc={'space-between'} className="writer">
        <Flexbox ColomnFlexbox>
          <Avatar nickName={nickname} userImg={profileUrl} />
        </Flexbox>
        {user && user.uid === comment.comtWriteUser.uid && (
          <EditBox onClick={showBox}>
            <MoreOutlined className="point" />
            {click && (
              <Box>
                <span onClick={onEditComment}>수정</span>
                <span onClick={deleteComment}>삭제</span>
              </Box>
            )}
          </EditBox>
        )}
      </Flexbox>
      {editComment ? (
        <Content>
          <p>{comment.reviewContent}</p>
          <time>{updates[0]}</time>
        </Content>
      ) : (
        <Form form={form} onFinish={onFinish}>
          <EditForm>
            <Form.Item name="reviewContent">
              <Input />
            </Form.Item>
            <div className="buttonGroup">
              <button type="submit">수정</button>
              <button onClick={handleClearClick}>취소</button>
            </div>
          </EditForm>
        </Form>
      )}
    </div>
  )
}

const DetailComments = ({
  comments,
  setComments,
  onCommentSubmit,
  onCommentEdit,
  onCommentDelete,
}) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    onCommentSubmit(values)
    form.resetFields()
  }

  return (
    <>
      {comments &&
        comments.content.map(
          (comment) =>
            comment && (
              <CommentItem
                comment={comment}
                key={comment.commentNo}
                setComments={setComments}
                onCommentEdit={onCommentEdit}
                onCommentDelete={onCommentDelete}
              />
            )
        )}

      <Form form={form} onFinish={onFinish}>
        <TextBox>
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
              className="commentBox"
            />
          </Form.Item>
          <Form.Item style={{ alignSelf: 'self-end' }}>
            <Button type="submit">댓글달기</Button>
          </Form.Item>
        </TextBox>
      </Form>
    </>
  )
}

export default DetailComments

const TextBox = styled.div`
  padding: 20px 16px 0 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: end;
  margin-bottom: 50px;
  border-top: 1px solid ${(props) => props.theme.gray};
  border-bottom: 1px solid ${(props) => props.theme.gray};
  background-color: rgba(0, 0, 0, 0.05);
  .commentBox {
    min-height: 70px;
  }
`
const EditForm = styled.div`
  display: flex;
  justify-content: space-between;
  .ant-form-item {
    margin: 10px 0 10px 0;
    width: 83%;
  }

  .buttonGroup {
    align-self: end;
    margin-bottom: 10px;
    button {
      margin-left: 5px;
      font-size: 12px;
      color: #8c8d96;
      background-color: transparent;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #8c8d96;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
    }
  }
`
const EditBox = styled.div`
  position: relative;
  .point {
    cursor: pointer;
    padding: 10px;
    color: #8c8d96;
  }
`
const Box = styled.div`
  position: absolute;
  top: 35px;
  left: -20px;
  border: 1px solid #8c8d96;
  width: 50px;
  span {
    cursor: pointer;
    display: block;
    background-color: transparent;
    padding: 5px;
    font-size: 14px;
    color: #8c8d96;
    text-align: center;
    transition: background-color 100ms ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
`

const Content = styled.div`
  padding: 15px 5px;
  p {
    padding-bottom: 10px;
    font-size: 15px;
  }
  time {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.005em;
    color: #8c8d96;
  }
`
