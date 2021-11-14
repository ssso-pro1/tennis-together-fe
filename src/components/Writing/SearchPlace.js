import styled from 'styled-components'
import { Form, Input, Select, Button } from 'antd'
const { Option } = Select

export const SearchPlace = ({ onFinish, courts }) => {
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

  console.log('모달검색창', courts)

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
            {/* ******************************* */}
            {/*           
            <Select
              className="form-select"
              defaultValue="시/도"
              style={{ width: 200 }}
              placeholder="시/도"
            >
              {courts.content.map((court) => {
                ;<Option key={court.locSd} value={court.name}>
                  {court.name}
                </Option>
                console.log('안들어가는디', court.locCd)
              })}
            </Select> */}
            {/* ************************************* */}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </InputGroup>
      </Form>
    </div>
  )
}
