import { Modal, Input, Form, Rate } from 'antd'
import Button from 'components/common/Buttons'
import Flexbox from 'components/common/Flexbox'
import styled from 'styled-components'
import { customIcons } from 'components/common/constants'
import Avatar from 'components/common/Avatar'

const VALUES = {
  nickname: '',
  profileUrl: '',
  court: '',
  date: '',
}

const ReviewModal = ({
  isModalVisible,
  handleCancel,
  onFinish,
  editing,
  values = VALUES,
}) => {
  const [form] = Form.useForm()

  if (editing) {
    form.setFieldsValue({
      gameNo: editing.game.gameNo,
      reviewContent: editing.reviewContent,
      score: editing.score,
    })
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
              <Avatar
                nickName={values.nickname}
                userImg={values.profileUrl}
                $History={true}
              />
              <p className="info">
                <span>{values.court}</span>
                <span>{values.date}</span>
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

          <Flexbox>
            <Form.Item>
              <Button type="submit" className="submitBtn">
                발행
              </Button>
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
`
