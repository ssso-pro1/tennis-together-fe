import { Input, Form } from 'antd'
import { useParams } from 'react-router'
import baseApi from 'service/baseApi'
import Button from 'styled-components/Buttons'
import CommentBox from 'styled-components/CommentBox'
import CommentItem from 'components/Detail/CommentItem'

function DetailComments({ comments, setComments }) {
  const { gameNo } = useParams()
  const [form] = Form.useForm()

  const onFinish = (values) => {
    baseApi
      .post(
        `/games/${gameNo}/comments`,
        {
          reviewContents: values.comments,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(function (response) {
        console.log(response)
        form.resetFields()
        baseApi.get(`/games/${gameNo}/comments`).then((response) => {
          setComments(response.data)
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      {comments.content.map(
        (comment) =>
          comment && (
            <CommentItem
              comment={comment}
              key={comment.commentNo}
              setComments={setComments}
            />
          )
      )}

      <Form form={form} onFinish={onFinish}>
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
