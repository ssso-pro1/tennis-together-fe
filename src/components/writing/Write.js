import React from 'react'
import { Row, Col, Input, Form } from 'antd'
import styled from 'styled-components'
import Button from 'components/common/Buttons'
import Flexbox from 'components/common/Flexbox'
import Selects from 'components/writing/Selects'
import MapModal from 'components/writing/MapModal'
import { historyType } from 'components/common/constants'

const Write = ({
  onAddressChange,
  isModalVisible,
  setIsModalVisible,
  form,
  onFinish,
  location,
}) => {
  const historyName = historyType
  if (location.state) {
    const prevData = location.state
    const { title, genderType, historyType, ageType, content, court, courtNo } =
      prevData
    form.setFieldsValue({
      title: title,
      genderType: genderType,
      historyType: historyName[historyType],
      ageType: ageType === 0 ? '무관' : ageType + '대',
      content: content,
      court: court.name,
      courtNo: courtNo,
    })
  }

  return (
    <div>
      <WriteStyle>
        <Row>
          <Col lg={{ span: 22, offset: 1 }} xs={{ span: 20, offset: 2 }}>
            <Form
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              className="mainForm"
            >
              <div className="absolute">
                <Flexbox ai={'flex-start'} jc={'space-between'}>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: '제목을 입력하세요',
                      },
                    ]}
                  >
                    <Input
                      bordered={false}
                      placeholder="제목을 입력하세요"
                      className="title"
                    ></Input>
                  </Form.Item>
                  <Button fs={'16px'} type="submit" className="submitBtn">
                    발행하기
                  </Button>
                </Flexbox>
                <MapModal
                  onAddressChange={onAddressChange}
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                />
                <Selects />
              </div>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea
                  bordered={false}
                  className="textarea"
                  placeholder="추가정보를 입력하세요"
                />
              </Form.Item>
              <Form.Item
                name="courtNo"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input.TextArea
                  bordered={false}
                  className="courtInfo"
                  placeholder="추가정보를 입력하세요"
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </WriteStyle>
    </div>
  )
}
const WriteStyle = styled.div`
  .absolute {
    padding-top: 2rem;
    position: absolute;
    width: 100%;
    z-index: 2;

    .title {
      width: 90%;
      height: 66px;
      font-size: 48px;
      font-weight: bold;
      border: none;
      padding: 0;
      &::placeholder {
        color: rgb(134, 142, 150);
      }

      &:focus {
        outline: none;
      }
    }
    button {
      margin-top: 10px;
    }
  }

  .textarea {
    padding: 300px 0 0 0;
    border: none;
    width: 100%;
    min-height: 100vh;
    resize: none;
    &:hover {
      border: none;
    }
    &:focus {
      outline: none;
    }
  }
  .courtInfo {
    display: none;
  }
`

export default Write
