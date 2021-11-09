import React, { useContext, useEffect } from 'react'
import axios from 'axios'

import Navbar from 'components/Common/Navbar'
import { UserContext } from '../../service/authState'
import { defaultHeaders } from '../../config/clientConfig'

import { Select, Input, DatePicker, Space } from 'antd'
import styled from 'styled-components'
import Flexbox from '../../styled-components/Flexbox'
import Button from '../../styled-components/Buttons'

const { Option } = Select

const SignUpPage = ({ setSignUpPageOpen }) => {
  const { setUser } = useContext(UserContext)

  const confirmNick = () => {
    console.log('닉네임중복확인하는 함수넣기')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(`${e.target.nickName.value}`)

    // users 등록 api아직 작업 중
    // axios 안에 api주소로 등록할 user 정보담아서 json.stringify(string으로 바꿈?)
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        locCdNo: e.target.locSd.value,
        locSkk: e.target.locSkk.value,
        gender: e.target.gender.value,
        history: e.target.history.value,
        nickName: e.target.nickName.value,
      }),
    })

    // 등록되면 setUser(user)
    const user = await res.json()
    console.log(`post http://localhost:3000/users ${JSON.stringify(user)}`)
    setSignUpPageOpen(false)
    setUser(user)
  }

  // useEffect(() => {
  //   axios('http://localhost:3000/locations') //
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  // }, [])

  // axios('http://localhost:3000/locations/locCdNo') //
  //     .then((response) => {
  //       console.log(response.data)
  //     })

  useEffect(() => {
    console.log('signuppage도달확인')
  })

  function onChange(date, dateString) {
    console.log(date, dateString)
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
  const Birth = styled.div``

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
          <form>
            <InputData>
              {/* 
                locCdNo : 시+구 (서울시중구:1, 서울시성동구:2)
                locSd : 시 도 (서울시 :1, 경기도:2)
                locSkk : 군 구 (중구:2, 성동구:4, 광진구:5) */}

              {/* 1. ***** api 어떻게 사용 ? ***** */}
              {/* /locations?locCdNo=1
                  /locations?locCdNo=1&locSkk=2  */}
              {/* 2. ***** 닉네임 중복확인 기능  ***** */}

              <Select defaultValue="서울시" style={{ width: 300 }}>
                <Option name="locSd" value="1">
                  서울시
                </Option>
                <Option name="locSd" value="2">
                  경기도
                </Option>
              </Select>
              <br />
              <Select defaultValue="강남구" style={{ width: 300 }}>
                <Option name="locSkk" value="2">
                  중구
                </Option>
                <Option name="locSkk" value="4">
                  성동구
                </Option>
                <Option name="locSkk" value="5">
                  광진구
                </Option>
                <Option name="locSkk" value="6">
                  동대문구
                </Option>
                <Option name="locSkk" value="7">
                  중량구
                </Option>
                <Option name="locSkk" value="8">
                  성북구
                </Option>
                <Option name="locSkk" value="9">
                  강북구
                </Option>
                <Option name="locSkk" value="9">
                  ...
                </Option>
              </Select>
              <br />

              <Select defaultValue="성별" style={{ width: 300 }}>
                <Option name="gender" value="여성">
                  여성
                </Option>
                <Option name="gender" value="남성">
                  남성
                </Option>
              </Select>
              <br />

              <Select defaultValue="경력" style={{ width: 300 }}>
                <Option name="history" value="1">
                  6개월미만
                </Option>
                <Option name="history" value="2">
                  6개월이상~1년미만
                </Option>
                <Option name="history" value="3">
                  1년이상~5년이하
                </Option>
                <Option name="history" value="4">
                  5년이상
                </Option>
              </Select>
              <br />

              <Birth>
                <Space direction="vertical">
                  <DatePicker
                    onChange={onChange}
                    placeholder="생년월일"
                    style={{ width: 300 }}
                  />
                </Space>
              </Birth>
              <br />

              <Nickname>
                <Input type="text" name="nickName" placeholder="닉네임" />
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

              <Button style={{ width: 300 }} onSubmit={handleSubmit}>
                회원가입
              </Button>
            </InputData>
          </form>
        </SignUpSection>
      </Flexbox>
    </>
  )
}

export default SignUpPage
