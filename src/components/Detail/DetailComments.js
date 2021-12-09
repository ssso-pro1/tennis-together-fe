import { Input, Form } from 'antd'
import { useParams } from 'react-router'
import baseApi from 'service/baseApi'
import Button from 'components/common/Buttons'
import CommentBox from 'components/common/CommentBox'
import CommentItem from 'components/detail/CommentItem'

const DetailComments = ({ comments, setComments }) => {
  const { gameNo } = useParams()
  const [form] = Form.useForm()

  // 댓글발행
  const onFinish = async (values) => {
    try {
      await baseApi.post(`/games/${gameNo}/comments`, {
        reviewContents: values.comments,
      })
      form.resetFields()
      const res = await baseApi.get(`/games/${gameNo}/comments`)
      setComments(res.data)
    } catch (error) {
      console.log(error)
      alert('로그인 후 이용가능합니다.')
    }
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
          <Form.Item style={{ alignSelf: 'self-end' }}>
            <Button type="submit">댓글달기</Button>
          </Form.Item>
        </CommentBox>
      </Form>
    </>
  )
}

export default DetailComments
