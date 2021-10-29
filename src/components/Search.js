import React from 'react'
import '../styled-components/search.css'

import { Input, Select } from 'antd'

const { Option } = Select

const Search = () => {
  return (
    <div className="site-input-group-wrapper">
      <Input.Group compact>
        <Select defaultValue="Option1">
          <Option value="Option1">서울특별시</Option>
          <Option value="Option2">부산광역시</Option>
        </Select>
      </Input.Group>
      <Input.Group compact>
        <Select defaultValue="Option1">
          <Option value="Option1">강남구</Option>
          <Option value="Option2">강동구</Option>
          <Option value="Option3">강북구</Option>
          <Option value="Option4">강서구</Option>
          <Option value="Option5">관악구</Option>
          <Option value="Option6">광진구</Option>
          <Option value="Option7">등등</Option>
        </Select>
      </Input.Group>
      <Input.Group compact>
        <Select defaultValue="Option3">
          <Option value="Option1">강서테니스장</Option>
          <Option value="Option2">강서서테니스장</Option>
          <Option value="Option3">테니스장</Option>
        </Select>
      </Input.Group>

      <Input.Group compact>
        <Select defaultValue="Option3">
          <Option value="Option1">여성</Option>
          <Option value="Option2">남성</Option>
          <Option value="Option3">성별</Option>
        </Select>
      </Input.Group>
      <Input.Group compact>
        <Select defaultValue="Option5">
          <Option value="Option1">1개월이내</Option>
          <Option value="Option2">1~3개월</Option>
          <Option value="Option3">3~6개월</Option>
          <Option value="Option4">6개월이상</Option>
          <Option value="Option5">경력</Option>
        </Select>
      </Input.Group>
    </div>
  )
}

export default Search
