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

  // const Courts = courts.content
  // // console.log('서치바', Courts)
  // const newArr = Courts.locCd.filter((element) =>
  //   {return element != null}
  // )

  // console.log('서치바바', newArr)

  // // const unique = Courts.map(function (val, index) {
  // //   return val['price']
  // // }).filter(function (val, index, arr) {
  // //   return arr.indexOf(val) === index
  // // })

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
          </Form.Item>
          {/* <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: '주소를 입력하세요!',
              },
            ]}
          >
            <Select
              defaultValue="시/도"
              style={{ width: '50%' }}
              placeholder="시/도"
            >
              {courts.content.map(
                (court) =>
                  court.locCd && (
                    <Option ket={court.locCd.locSd} value={court.locCd.locSd}>
                      {court.locCd.locSdName}
                    </Option>
                  )
              )}
            </Select>
          </Form.Item> */}
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
