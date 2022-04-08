import React from 'react'
import styled from 'styled-components'
import { Select, DatePicker, Form } from 'antd'
import { BREAKPOINT_TABLET, mediaQueries } from 'components/common/constants'

const { Option } = Select

const Selects = () => {
  return (
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
        <Select className="form-select" placeholder="성별">
          <Option value="genderType">성별</Option>
          <Option value=" ">무관</Option>
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
        <Select className="form-select" placeholder="연령대">
          <Option value="ageType">연령대</Option>
          <Option value=" ">무관</Option>
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
        <Select className="date_picker" placeholder="경력">
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
        <DatePicker placeholder="모집날짜" className="date_picker" />
      </Form.Item>
      <Form.Item
        name="endDt"
        rules={[
          {
            required: true,
            message: '필수값을 입력하세요',
          },
        ]}
      >
        <DatePicker placeholder="마감날짜" />
      </Form.Item>
    </SelectWrap>
  )
}

export default Selects

const SelectWrap = styled.div`
  display: flex;
  padding-bottom: 20px;
  width: 80%;
  justify-content: space-between;
  .ant-form-item {
    margin-right: 10px;
    width: 20%;
  }
  ${mediaQueries(BREAKPOINT_TABLET)} {
    width: 100% !important;
    .ant-form-item {
      margin-right: 5px;
    }
  }
`
