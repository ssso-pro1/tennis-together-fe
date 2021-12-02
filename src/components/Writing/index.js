import { Row, Col, Input, Form } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'styled-components/Buttons'
import Flexbox from 'styled-components/Flexbox'
import Selects from 'components/Writing/Select'
import MapModal from 'components/Writing/MapModal'
import { useHistory } from 'react-router'
import baseApi from 'service/baseApi'

const Writing = () => {
  const Write = styled.div`
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
  const history = useHistory()

  const [form] = Form.useForm()
  const [courtInfo, setCourtInfo] = useState('')

  // map container에서 지도정보 가져오기
  const onAddressChange = (value) => {
    console.log('onAddressChange', value)
    form.setFieldsValue({
      court: `${value.name}`,
      courtNo: ` ${value.courtNo}`,
    })
  }

  // 발행하기

  const onFinish = async (values) => {
    console.log('마감날짜', values.endDt)
    try {
      const post = await baseApi.post(
        '/games',
        {
          title: values.title,
          genderType: values.genderType,
          historyType: Number(values.historyType),
          ageType: Number(values.ageType),
          strDt: values.strDt,
          endDt: values.endDt,
          content: values.content,
          courtNo: values.courtNo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      console.log('발행완료', post)
      alert('발행이 완료되었습니다')
      history.push(`/pages/detail/${post.data.gameNo}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Write>
        <Row>
          <Col lg={{ span: 22, offset: 1 }} xs={{ span: 20, offset: 2 }}>
            <Form
              form={form}
              onFinish={onFinish}
              courtInfo={courtInfo}
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
                  setCourtInfo={setCourtInfo}
                  courtInfo={courtInfo}
                  onAddressChange={onAddressChange}
                />
                <Selects />
              </div>
              <Form.Item
                name="content"
                rules={[
                  {
                    required: false,
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
      </Write>
    </div>
  )
}

export default Writing
