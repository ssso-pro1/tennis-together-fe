import React from 'react'
import styled from 'styled-components'
import { Select, DatePicker } from 'antd'

const { Option } = Select
const SelectWrap = styled.div`
  padding-bottom: 20px;
  .form-select {
    margin-right: 20px;
  }
`

// function handleChange(value) {
//   console.log(`selected ${value}`)
// }

const Selects = () => (
  <SelectWrap>
    <Select
      className="form-select"
      defaultValue="gender"
      style={{ width: 200 }}
      placeholder="성별"
    >
      <Option value="gender">성별</Option>
      <Option value="female">여성</Option>
      <Option value="male">남성</Option>
    </Select>
    <Select
      className="form-select"
      defaultValue="career"
      style={{ width: 200 }}
      placeholder="연령대"
    >
      <Option value="career">연령대</Option>
      <Option value="1">10대</Option>
      <Option value="2">20대</Option>
      <Option value="3">30대</Option>
      <Option value="4">40대</Option>
      <Option value="5">50대</Option>
    </Select>
    <Select
      className="form-select"
      defaultValue="career"
      style={{ width: 200 }}
      placeholder="경력"
    >
      <Option value="career">경력</Option>
      <Option value="1">~1년</Option>
      <Option value="2">~2년</Option>

      <Option value="3">~3년</Option>
      <Option value="4">3년 이상</Option>
    </Select>

    <DatePicker placeholder="모집날짜" style={{ width: 200 }} />
  </SelectWrap>
)

export default Selects
