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
      <Select
        defaultValue="서울특별시"
        style={{ width: 150 }}
        onChange={handleChange}
      >
        <Option value="서울특별시">서울특별시</Option>
        <Option value="부산광역시">부산광역시</Option>
        <Option value="부산광역시">...</Option>
      </Select>
      <Select
        defaultValue="강남구"
        style={{ width: 150 }}
        onChange={handleChange}
      >
        <Option value="강남구">강남구</Option>
        <Option value="강동구">강동구</Option>
        <Option value="강북구">강북구</Option>
        <Option value="강서구">강서구</Option>
        <Option value="관악구">관악구</Option>
        <Option value="광진구">광진구</Option>
        <Option value="광진구">...</Option>
      </Select>
      <Select
        defaultValue="테니스장"
        style={{ width: 150 }}
        onChange={handleChange}
      >
        <Option value="강서테니스장">강서테니스장</Option>
        <Option value="강서서테니스장">강서서테니스장</Option>
        <Option value="강북구">...</Option>
      </Select>
      <UserInfo>
        <Select
          defaultValue="성별"
          style={{ width: 150 }}
          onChange={handleChange}
        >
          <Option value="여성">여성</Option>
          <Option value="남성">남성</Option>
        </Select>
        <Select
          defaultValue="경력"
          style={{ width: 150 }}
          onChange={handleChange}
        >
          <Option value="1개월이내">1개월이내</Option>
          <Option value="1~3개월">1개월이상~3개월미만</Option>
          <Option value="3개월이상~6개월미만">3개월이상~6개월미만</Option>
          <Option value="6개월이상~1년미만">6개월이상~1년미만</Option>
          <Option value="1년이상">1년이상</Option>
        </Select>
      </UserInfo>
      <ButtonDiv>
        <Button width={'150px'}>검색</Button>
      </ButtonDiv>
    </>
  )
}

export default Search
