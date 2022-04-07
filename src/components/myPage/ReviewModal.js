import { Modal, Input, Form, Rate } from 'antd'
import Button from 'components/common/Buttons'
import Flexbox from 'components/common/Flexbox'
import styled from 'styled-components'
import { customIcons } from 'components/common/constants'
import Avatar from 'components/common/Avatar'

const ReviewModal = ({
  isModalVisible,
  handleCancel,
  editing,
  onSubmitReview,
  values,
}) => {
  const [form] = Form.useForm()
  console.log(values)
  const { nickname, profileUrl, date, court, gameNo } = values

  if (editing) {
    form.setFieldsValue({
      reviewContent: editing.reviewContent,
      score: editing.score,
      reviewNo: editing.reviewNo,
    })
  } else {
    form.setFieldsValue({
      gameNo: gameNo,
    })
  }

  const onFinish = (values) => {
    onSubmitReview(values)
    form.resetFields()
  }
  return (
    <div>
      <ModalStyle
        title="리뷰쓰기 "
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        {values && (
          <Flexbox>
            <div>
              <Avatar nickName={nickname} userImg={profileUrl} $Profile />
              <p className="info">
                <span>{court}</span>
                <span>{date.split('T')[0]}</span>
              </p>
            </div>
          </Flexbox>
        )}

        <Form onFinish={onFinish} form={form}>
          <Flexbox>
            <p className="innerP manner">매너평가</p>
            <Form.Item
              name="score"
              rules={[
                {
                  required: true,
                  message: '별점을 입력하세요',
                },
              ]}
            >
              <Rate
                className="rate"
                character={({ index }) => customIcons[index + 1]}
              />
            </Form.Item>
          </Flexbox>
          <p className="innerP">리뷰작성</p>
          <Form.Item
            name="reviewContent"
            rules={[
              {
                required: true,
                message: '리뷰를 입력하세요',
              },
            ]}
          >
            <Input.TextArea placeholder="자세하고 솔직한 리뷰는 다른 사용자에게 큰 도움이 됩니다"></Input.TextArea>
          </Form.Item>
          {editing ? (
            <Form.Item name="reviewNo">
              <p className="none"></p>
            </Form.Item>
          ) : (
            <Form.Item name="gameNo">
              <p className="none"></p>
            </Form.Item>
          )}

          <Flexbox>
            <Form.Item>
              {editing ? (
                <Button type="submit" className="submitBtn">
                  수정하기
                </Button>
              ) : (
                <Button type="submit" className="submitBtn">
                  발행하기
                </Button>
              )}
            </Form.Item>
          </Flexbox>
        </Form>
      </ModalStyle>
    </div>
  )
}

export default ReviewModal

const ModalStyle = styled(Modal)`
  .ant-modal-title {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }
  .ant-modal-footer {
    display: none;
  }
  .userInfo {
    margin-left: 15px;
    .nickname {
      margin: 0;
    }
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .submitBtn {
    width: 200px;
  }
  .innerP {
    font-size: 14px;
    font-weight: 700;
  }
  .manner {
    margin: 5px 10px 0 0;
  }
  textarea {
    margin: 10px 0 30px 0;
  }
  .info {
    padding: 15px 0 5px;
    span:not(:last-child)::after {
      content: '|';
      margin: 0 5px;
    }
  }
  .none {
    display: none;
  }
`
