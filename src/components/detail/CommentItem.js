import React, { useState, useContext } from 'react'
import { UserContext } from 'service/authState'
import styled from 'styled-components'
import { MoreOutlined } from '@ant-design/icons'
import baseApi from 'service/baseApi'
import { useParams } from 'react-router'
import CommentBox from 'components/common/CommentBox'
import Flexbox from 'components/common/Flexbox'
import Button from 'components/common/Buttons'
import { Input, Form } from 'antd'
import Avatar from 'components/common/Avatar'

const CommentItem = ({ comment, setComments }) => {
  const { user } = useContext(UserContext)
  const { gameNo } = useParams()
  const [click, setClick] = useState(false)
  const [editComment, setEditComment] = useState(true)
  const updates = comment.regDtm.split('T')
  const [form] = Form.useForm()

  const getComment = async () => {
    setEditComment(false)
    try {
      const res = await baseApi(`/games/${gameNo}/comments`) //
      if (res.data) {
        const thisComment = res.data.content
        const prevData = thisComment.find(
          (e) => e.commentNo === comment.commentNo
        )
        form.setFieldsValue({
          reviewContent: prevData.reviewContent,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onFinish = async (values) => {
    const commentNo = comment.commentNo
    try {
      await baseApi.patch(`/games/${gameNo}/comments/${commentNo}`, {
        reviewContents: values.reviewContent,
      })
      alert('수정이 완료되었습니다')
      const res = await baseApi.get(`/games/${gameNo}/comments`)
      setComments(res.data)
      setEditComment(true)
    } catch (error) {
      console.log(error)
    }
  }

  const del = async () => {
    const commentNo = comment.commentNo

    if (window.confirm('삭제 하시겠습니까?')) {
      try {
        const del = await baseApi.delete(
          `/games/${gameNo}/comments/${commentNo}`
        )
        if (del.status === 200) {
          alert('삭제되었습니다')
        }
        const res = await baseApi.get(`/games/${gameNo}/comments`)
        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showBox = () => {
    setClick(!click)
  }

  console.log(comment)
  const nickName = comment.comtWriteUser.nickname
  const userImg = comment.comtWriteUser.profileUrl
  return (
    <div>
      <CommentBox className="commentItem">
        <Flexbox jc={'space-between'} className="writer">
          <Flexbox ColomnFlexbox>
            <Avatar nickName={nickName} userImg={userImg} />
          </Flexbox>
          {user && user.uid === comment.comtWriteUser.uid && (
            <EditBox onClick={showBox}>
              <MoreOutlined className="point" />
              {click && (
                <div className="box">
                  <span onClick={getComment}>수정</span>
                  <span onClick={del}>삭제</span>
                </div>
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
          <div style={{ padding: '15px 5px' }}>
            <Form form={form} onFinish={onFinish}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item name="reviewContent" style={{ width: '94%' }}>
                  <Input style={{ borderRadius: '4px' }}></Input>
                </Form.Item>
                <Form.Item name="button">
                  <Button
                    type="submit"
                    style={{
                      height: '32px',
                      width: '50px',
                      fontSize: '14px',
                      marginLeft: '10px',
                    }}
                  >
                    수정
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        )}
      </CommentBox>
    </div>
  )
}
const EditBox = styled.p`
  position: relative;
  .point {
    cursor: pointer;
    padding: 10px;
    color: #8c8d96;
  }
  .box {
    position: absolute;
    top: 35px;
    left: -20px;
    border: 1px solid #8c8d96;

    width: 50px;

    span {
      cursor: pointer;
      display: block;
      padding: 5px;
      font-size: 14px;
      color: #8c8d96;
      text-align: center;
      transition: background-color 100ms ease-in-out;
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
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
export default CommentItem
