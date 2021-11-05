import Navbar from 'components/Common/Navbar'
import React from 'react'
import Flexbox from '../../styled-components/Flexbox'
import Button from '../../styled-components/Buttons'
import styled from 'styled-components'
import { Select, Input } from 'antd'

const { Option } = Select

const SignUpPage = (props) => {
  const confirmNick = () => {
    console.log('닉네임중복확인하는 함수넣기')
  }

  const Flexbox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 1.8rem;
      margin: 5rem;
    }
  `

  const SignUpSection = styled.div`
    Input {
      width: 80%;
    }

    Button {
      width: 20%;
    }

    padding-bottom: 20%;
  `

  const InputData = styled.div`
    display: flex;
    flex-direction: column;
  `

  const Nickname = styled.div`
    display: flex;
  `

  return (
    <>
      <Navbar />
      <Flexbox>
        <SignUpSection>
          <h2>회원가입</h2>
          <h3>추가정보</h3>
          <InputData>
            <Select defaultValue="서울특별시" style={{ width: 300 }}>
              <Option value="서울특별시">서울특별시</Option>
              <Option value="부산광역시">부산광역시</Option>
              <Option value="부산광역시">...</Option>
            </Select>
            <br />
            <Select defaultValue="강남구" style={{ width: 300 }}>
              <Option value="강남구">강남구</Option>
              <Option value="강동구">강동구</Option>
              <Option value="강북구">강북구</Option>
              <Option value="강서구">강서구</Option>
              <Option value="관악구">관악구</Option>
              <Option value="광진구">광진구</Option>
              <Option value="광진구">...</Option>
            </Select>
            <br />

            <Select defaultValue="성별" style={{ width: 300 }}>
              <Option value="여성">여성</Option>
              <Option value="남성">남성</Option>
            </Select>
            <br />

            <Select defaultValue="경력" style={{ width: 300 }}>
              <Option value="1개월이내">1개월이내</Option>
              <Option value="1~3개월">1개월이상~3개월미만</Option>
              <Option value="3개월이상~6개월미만">3개월이상~6개월미만</Option>
              <Option value="6개월이상~1년미만">6개월이상~1년미만</Option>
              <Option value="1년이상">1년이상</Option>
            </Select>
            <br />

            <Nickname>
              <Input placeholder="닉네임" />
              <Button
                Secondary
                onClick={() => {
                  confirmNick()
                }}
              >
                중복확인
              </Button>
            </Nickname>
            <br />

            <Button style={{ width: 300 }}>회원가입</Button>
          </InputData>
        </SignUpSection>
      </Flexbox>
    </>
  )
}

export default SignUpPage
