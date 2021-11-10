import { Row, Col, Input, Form } from 'antd'
import React, { useState, useEffect } from 'react'

import axios from 'axios'

import styled from 'styled-components'
import Button from 'styled-components/Buttons'
import Flexbox from 'styled-components/Flexbox'
import Selects from 'components/Writing/select'

import MapModal from 'components/Writing/MapModal'

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
      padding: 280px 0 0 0;
      border: none;
      width: 100%;
      max-height: 100vh;
      resize: none;
      &:hover {
        border: none;
      }
      &:focus {
        outline: none;
      }
    }
  `

  const [value, setValue] = useState('')
  console.log('코트정보가 오나', value)

  // **********************************************
  // ant-design 사용시
  // 1. input과 textarea가 동시에 입력되는 오류 발생
  // 2. Select로 handlechange함수 props가 안됨
  // *********************************************
  // const handleChange = (e) => {
  //   console.log('입력값', e.target.value)
  //   setValue(e.target.value)
  // }
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  return (
    <div>
      <Row>
        <Col span={22} offset={1}>
          <Write>
            <Form onFinish={onFinish}>
              <div className="absolute">
                <Flexbox ai={'flex-start'} jc={'space-between'}>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your address!',
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
                <p>{value.name}</p>
                <MapModal setValue={setValue} />
                <Selects />
              </div>
              <Form.Item
                name="text"
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
            </Form>
          </Write>
        </Col>
      </Row>
    </div>
  )
}

export default Writing
