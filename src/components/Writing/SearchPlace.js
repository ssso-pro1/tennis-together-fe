import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styled from 'styled-components'
import { Form, Input, Select } from 'antd'
const { Option } = Select

export const SearchPlace = ({ onFinish }) => {
  // style-component
  const InputGroup = styled.div`
    width: 100%;

    .addressInput {
      width: 100%;
      height: 46px;
      border: 1px solid rgba(0, 0, 0, 0.25);
      margin-top: 30px;
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.25);
      }
    }
  `
  // 코트장 정보 세팅
  const [address, setAddress] = useState(null)

  //코트정보 불러오기
  useEffect(() => {
    axios(`/courts`) //
      .then((response) => {
        console.log(response)
        setAddress(response.data)
      })
  }, [])
  console.log('www', address)

  return (
    <div>
      <Form onFinish={onFinish}>
        <InputGroup>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: '주소를 입력하세요!',
              },
            ]}
          >
            <Input
              className="addressInput"
              bordered={false}
              placeholder="주소를 입력하세요"
              allowClear
            />
          </Form.Item>
        </InputGroup>
      </Form>
    </div>
  )
}
