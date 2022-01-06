import { Modal, Input, Form, Rate } from 'antd'
import Button from 'components/common/Buttons'
import AvatarBase from 'components/common/AvatarBase'
import Flexbox from 'components/common/Flexbox'
import styled from 'styled-components'
import { customIcons } from 'components/common/constants'
import DefaultImg from 'styled-components/assets/images/img-user-default.png'

const ReviewModal = ({ isModalVisible, handleCancel, onFinish, gameData }) => {
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
  const [form] = Form.useForm()

  const onFill = () => {
    form.setFieldsValue({
      gameNo: gameData.joinedGame.gameNo,
    })
  }

  return (
    <div>
      <ModalStyle
        title="리뷰쓰기 "
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <Flexbox>
          {gameData && (
            <AvatarBase>
              <a
                href="#!"
                className="avatarImg"
                style={{ height: '80px', width: '80px' }}
              >
                <img src={DefaultImg} alt={DefaultImg} />
              </a>
              <div className="userInfo">
                <strong
                  className="nickname"
                  style={{ fontSize: '18px', fontWeight: '700' }}
                >
                  {gameData.userPlayedWith.nickname}
                </strong>

                <p className="info">
                  <span>{gameData.joinedGame.court.name}</span>
                  <span>{gameData.joinedGame.regDtm.split('T')[0]}</span>
                  <span>경기완료</span>
                </p>
              </div>
            </AvatarBase>
          )}
        </Flexbox>

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
          <Form.Item name="gameNo">
            <Input style={{ display: 'none' }} />
          </Form.Item>

          <Flexbox>
            <Form.Item>
              <Button type="submit" className="submitBtn" onClick={onFill}>
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
