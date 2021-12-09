import styled from 'styled-components'
import { Form, Input, Select, Button } from 'antd'

const { Option } = Select

const SearchPlace = ({ onFinish, courts }) => {
  // style-component
  const InputGroup = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ant-form-item-control {
      flex-direction: inherit !important;
    }
    .addressInput {
      width: 100%;
      height: 46px;
      border: 1px solid rgba(0, 0, 0, 0.25);
      .input {
        padding-left: 10px;
      }
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.25);
      }
    }
    .ant-btn-primary {
      height: 44px;
      margin-left: 5px;
      &:hover {
        color: white !important;
      }
    }
  `

  let locCdSet = []
  if (courts) {
    for (let item of courts.content) {
      if (item.locCd) {
        locCdSet[item.locCd.locSd - 1] = {
          locSd: item.locCd.locSd,
          locSdName: item.locCd.locSdName,
        }
      }
    }
  }

  let locSkkSet = {}
  if (courts) {
    for (let item of courts.content) {
      // if (item.locCd) {
      //   locSkkSet[item.locCd.locSd] = {
      //     locSd: item.locCd.locSd,
      //     locSkk: item.locCd.locSkk,
      //     locSkkName: item.locCd.locSkkName,
      //   }
      // }
    }
  }

  // console.log('전체값', courts)
  // console.log('시도', locCdSet)
  console.log('구동', locSkkSet)

  return (
    <div>
      <Form onFinish={onFinish} autoComplete="off">
        <InputGroup>
          {courts && (
            <Form.Item
              name="address"
              className="addressInput"
              rules={[
                {
                  required: true,
                  message: '주소를 입력하세요!',
                },
              ]}
            >
              <Input
                bordered={false}
                className="input"
                placeholder="주소를 입력하세요"
                allowClear
              />
            </Form.Item>
          )}
          {/* <Form.Item
            name="sido"
            rules={[
              {
                required: true,
                message: '주소를 입력하세요!',
              },
            ]}
          >
            <Select
              defaultValue="시/도"
              // style={{ width: '100%' }}

              placeholder="시/도"
            >
              {locCdSet.map(
                (court) =>
                  court && (
                    <Option key={court.locSd} value={court.locSdName}>
                      {court.locSdName}
                    </Option>
                  )
              )}
            </Select>
          </Form.Item> */}
          {/* <Form.Item
            name="dong"
            rules={[
              {
                required: true,
                message: '주소를 입력하세요!',
              },
            ]}
          >
            <Select
              defaultValue="구"
              // style={{ width: '100%' }}
              placeholder="구"
            >
              {locSkkSet.map(
                (court) =>
                  court && (
                    <Option key={court.locSkk} value={court.locSkkName}>
                      {court.locSkkName}
                    </Option>
                  )
              )}
            </Select>
          </Form.Item> */}
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
