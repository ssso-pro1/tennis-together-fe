import React from 'react'
import styled from 'styled-components'
import Button from '../styled-components/Buttons'

import { Select } from 'antd'

const { Option } = Select

function handleChange(value) {
  console.log(`selected ${value}`)
}

const UserInfo = styled.section`
  margin-top: 25px;
`
const ButtonDiv = styled.div`
  margin-top: 10px;
`

const Search = (props) => {
  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="locSd"
          rules={[{ required: true, message: '시/도를 선택해주세요' }]}
        >
          <Select
            defaultValue="시/도"
            style={{ width: 200 }}
            onChange={handleLocSdChange}
          >
            {locSdData.map((locSd) => (
              <Option key={locSd.value} value={locSd.value}>
                {locSd.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="locSk"
          rules={[{ required: true, message: '군/구를 선택해주세요' }]}
        >
          <Select
            style={{ width: 200 }}
            defaultValue="군/구"
            onChange={handleLocSkkChange}
          >
            {locSkkData[locSds].map((locSkk) => (
              <Option key={locSkk.value} value={locSkk.value}>
                {locSkk.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 사용자가 선택한 지역에 해당하는 코트장 이름 */}
        <Form.Item
          name="courtNo"
          rules={[{ required: true, message: '테니스장을 선택해주세요' }]}
        >
          <Select
            style={{ width: 200 }}
            defaultValue="테니스장"
            onChange={handleCourtChange}
          >
            {courtData &&
              courtData.map((court) => (
                <Option key={court.courtNo} value={court.courtNo}>
                  {court.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <UserInfo>
          <Form.Item name="genderType">
            <Select
              defaultValue="성별"
              style={{ width: 200 }}
              onChange={handleChange}
            >
              <Option value="여성">여성</Option>
              <Option value="남성">남성</Option>
              <Option value="0">무관</Option>
            </Select>
          </Form.Item>

          <Form.Item name="historyType">
            <Select
              defaultValue="경력"
              style={{ width: 200 }}
              onChange={handleChange}
            >
              <Option value="0">무관</Option>
              <Option value="1">6개월미만</Option>
              <Option value="2">6개월이상~1년미만</Option>
              <Option value="3">1년이상~5년이하</Option>
              <Option value="4">5년이상</Option>
            </Select>
          </Form.Item>

          <Form.Item name="ageType">
            <Select
              defaultValue="나이"
              style={{ width: 200 }}
              onChange={handleChange}
            >
              <Option value="0">무관</Option>
              <Option value="1">10대</Option>
              <Option value="2">20대</Option>
              <Option value="3">30대</Option>
              <Option value="4">40대</Option>
              <Option value="5">50대</Option>
              <Option value="6">60대</Option>
            </Select>
          </Form.Item>
        </UserInfo>

        <ButtonDiv>
          <Button width={'200px'}>검색</Button>
        </ButtonDiv>
      </Form>
    </>
  )
}

export default Search
