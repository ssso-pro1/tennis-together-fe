import React from 'react'
import styled from 'styled-components'
import { Select, DatePicker, Form } from 'antd'

const { Option } = Select
const SelectWrap = styled.div`
  display: flex;
  padding-bottom: 20px;
  .form-select {
    margin-right: 20px;
  }
`

const Selects = () => (
  <SelectWrap>
    <Form.Item
      name="genderType"
      rules={[
        {
          required: true,
          message: '필수값을 입력하세요',
        },
      ]}
    >
      <Select
        className="form-select"
        defaultValue="genderType"
        style={{ width: 200 }}
        placeholder="성별"
      >
        <Option value="genderType">성별</Option>
        <Option value="여성">여성</Option>
        <Option value="남성">남성</Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="ageType"
      rules={[
        {
          required: true,
          message: '필수값을 입력하세요',
        },
      ]}
    >
      <Select
        className="form-select"
        defaultValue="ageType"
        style={{ width: 200 }}
        placeholder="연령대"
      >
        <Option value="ageType">연령대</Option>
        <Option value="10">10대</Option>
        <Option value="20">20대</Option>
        <Option value="30">30대</Option>
        <Option value="40">40대</Option>
        <Option value="50">50대</Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="historyType"
      rules={[
        {
          required: true,
          message: '필수값을 입력하세요',
        },
      ]}
    >
      <Select
        className="form-select"
        defaultValue="historyType"
        style={{ width: 200 }}
        placeholder="경력"
      >
        <Option value="historyType">경력</Option>
        <Option value="0">무관</Option>
        <Option value="1">6개월 미만</Option>
        <Option value="2">6개월이상 ~ 1년 미만</Option>
        <Option value="3">1년 이상 ~ 5년 미만</Option>
        <Option value="4">5년 이상</Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="strDt"
      rules={[
        {
          required: true,
          message: '필수값을 입력하세요',
        },
      ]}
    >
      <DatePicker placeholder="모집날짜" style={{ width: 200 }} />
    </Form.Item>
  </SelectWrap>
)

export default Selects
