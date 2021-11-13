import { Row, Col, Input, Form } from 'antd'
import React, { useState, useEffect } from 'react'

import axios from 'axios'

import styled from 'styled-components'
import Button from 'styled-components/Buttons'
import Flexbox from 'styled-components/Flexbox'
import Selects from 'components/Writing/select'

import MapModal from 'components/Writing/MapModal'
import { useHistory, useParams } from 'react-router'

function Writing() {
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
  const { gameNo } = useParams()

  const [form] = Form.useForm()
  const [courtInfo, setCourtInfo] = useState('')
  console.log('글쓰기페이지', courtInfo)

  function onAddressChange(value) {
    console.log('onAddressChange', value)
    form.setFieldsValue({
      court: `${value.name}`,
      courtInfo: value,
    })
  }

  const onFinish = (values) => {
    console.log('Success:', values)
    console.log('게임넘버:', values.gameNo)

    axios
      .post('http://localhost:3000/games/', {
        title: values.title,
        genderType: values.genderType,
        historyType: values.historyType,
        ageType: values.ageType,
        strDt: values.strDt,
        content: values.content,
        court: values.courtInfo,
      })
      .then(function (response) {
        console.log(response)
        alert('발행이 완료되었습니다')
        history.push(`/detail/${response.data.gameNo}`)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <Write>
            <Form form={form} onFinish={onFinish} courtInfo={courtInfo}>
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

                  <Button fs={'16px'} type="submit">
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
                name="courtInfo"
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
          </Write>
        </Col>
      </Row>
    </div>
  )
}

export default Writing
