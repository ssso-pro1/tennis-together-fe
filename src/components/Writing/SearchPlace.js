import React, { useState } from 'react'

import styled from 'styled-components'
import { Form, Input, Button } from 'antd'

export const SearchPlace = ({ onFinish }) => {
  // style-component
  const InputGroup = styled.div`
    width: 100%;

    input {
      width: 100%;
      height: 46px;
      margin: 20px 0;
    }
  `
  /* 
  // 주소검색
  const [inputText, setInputText] = useState('')
  const [place, setPlace] = useState('')
  const [form] = Form.useForm()

  // inpur form 함수

  const onChange = (e) => {
    //setInputText(e.target.value)
    console.log(e.target.value)
  }

  const onFinish = (address) => {
    console.log('Success:', address)
    // setPlace(inputText)
    // setInputText('')
  }
  console.log(form.getFieldValue('address'))
  // const address = form.getFieldValue('address') */

  return (
    <div>
      <Form onFinish={onFinish}>
        <InputGroup>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              },
            ]}
          >
            <Input bordered={false} placeholder="주소를 입력하세요" />
          </Form.Item>
          <Button htmlType="submit">검색</Button>
        </InputGroup>
        <strong></strong>
        <p></p>
      </Form>
    </div>
  )
}
