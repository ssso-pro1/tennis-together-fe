import styled from 'styled-components'
import { Form, Select, Button } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

const SearchPlace = ({ onFinish, courts }) => {
  const [locSds, setLocSds] = useState('시/도')

  let locCdSet = []

  if (courts) {
    for (let item of courts.content) {
      if (item.locCd) {
        locCdSet.push(item.locCd)
      }
    }
  } else if (!courts) {
    return
  }

  const handleLocSdChange = (value) => {
    setLocSds(value)
  }

  return (
    <div>
      <Form onFinish={onFinish} autoComplete="off">
        <InputGroup>
          <Form.Item
            name="sido"
            initialValue={locSds}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              className="address_select"
              placeholder="시/도"
              onChange={handleLocSdChange}
            >
              {locCdSet
                .filter(
                  (arr, index, callback) =>
                    index ===
                    callback.findIndex((t) => t.locSdName === arr.locSdName)
                )
                .map((el) => (
                  <Option key={el.locSd} value={el.locSdName}>
                    {el.locSdName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dong"
            initialValue="구"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select className="address_select" placeholder="구">
              {locSds &&
                locCdSet
                  .filter(
                    (arr, index, callback) =>
                      index ===
                      callback.findIndex(
                        (t) =>
                          locSds === arr.locSdName &&
                          t.locSkkName === arr.locSkkName
                      )
                  )
                  .map((el) => (
                    <Option key={el.locSkk} value={el.locSkkName}>
                      {el.locSkkName}
                    </Option>
                  ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              검색
            </Button>
          </Form.Item>
        </InputGroup>
      </Form>
    </div>
  )
}

export default SearchPlace

const InputGroup = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .address_select {
    width: 250% !important;
  }
  .ant-btn-primary {
    height: 44px;
    margin-left: 5px;
    &:hover {
      color: white !important;
    }
  }
`
