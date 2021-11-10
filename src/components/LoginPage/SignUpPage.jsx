import React, { useContext, useEffect, useState } from 'react'
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
    // axios 안에 api주소로 등록할 user 정보담아서 json.stringify
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

  useEffect(() => {
    axios('http://localhost:3000/locations') //
      .then((response) => {
        console.log(response.data)
      })
  }, [])

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

  /*
  const locSdData = [
    {
      label: '서울시',
      name: '서울시',
      value: 1,
      locSkkData: [
        { label: '종로구', name: '종로구', value: 1 },
        { label: '중구', name: '중구', value: 2 },
        { label: '용산구', name: '용산구', value: 3 },
        { label: '성동구', name: '성동구', value: 4 },
        { label: '광진구', name: '광진구', value: 5 },
        { label: '동대문구', name: '동대문구', value: 6 },
        { label: '중랑구', name: '중랑구', value: 7 },
        { label: '성북구', name: '성북구', value: 8 },
        { label: '강북구', name: '강북구', value: 9 },
        { label: '도봉구', name: '도봉구', value: 10 },
        { label: '노원구', name: '노원구', value: 11 },
        { label: '은평구', name: '은평구', value: 12 },
        { label: '서대문구', name: '서대문구', value: 13 },
        { label: '마포구', name: '마포구', value: 14 },
        { label: '양천구', name: '양천구', value: 15 },
        { label: '강서구', name: '강서구', value: 16 },
        { label: '구로구', name: '구로구', value: 17 },
        { label: '금천구', name: '금천구', value: 18 },
        { label: '영등포구', name: '영등포구', value: 19 },
        { label: '동작구', name: '동작구', value: 20 },
        { label: '관악구', name: '관악구', value: 21 },
        { label: '서초구', name: '서초구', value: 22 },
        { label: '강남구', name: '강남구', value: 23 },
        { label: '송파구', name: '송파구', value: 24 },
        { label: '강동구', name: '강동구', value: 25 },
      ],
    },
    {
      label: '경기도',
      name: '경기도',
      value: 2,
      locSkkData: [
        { label: '수원시', name: '수원시', value: 1 },
        { label: '성남시', name: '성남시', value: 2 },
        { label: '고양시', name: '고양시', value: 3 },
        { label: '용인시', name: '용인시', value: 4 },
        { label: '부천시', name: '부천시', value: 5 },
        { label: '안산시', name: '안산시', value: 6 },
        { label: '안양시', name: '안양시', value: 7 },
        { label: '남양주시', name: '남양주시', value: 8 },
        { label: '화성시', name: '화성시', value: 9 },
        { label: '평택시', name: '평택시', value: 10 },
        { label: '의정부시', name: '의정부시', value: 11 },
        { label: '시흥시', name: '시흥시', value: 12 },
        { label: '파주시', name: '파주시', value: 13 },
        { label: '광명시', name: '광명시', value: 14 },
        { label: '김포시', name: '김포시', value: 15 },
        { label: '군포시', name: '군포시', value: 16 },
        { label: '광주시', name: '광주시', value: 17 },
        { label: '이천시', name: '이천시', value: 18 },
        { label: '양주시', name: '양주시', value: 19 },
        { label: '오산시', name: '오산시', value: 20 },
        { label: '구리시', name: '구리시', value: 21 },
        { label: '안성시', name: '안성시', value: 22 },
        { label: '포천시', name: '포천시', value: 23 },
        { label: '의왕시', name: '의왕시', value: 24 },
        { label: '하남시', name: '하남시', value: 25 },
        { label: '여주시', name: '여주시', value: 26 },
        { label: '양평군', name: '양평군', value: 27 },
        { label: '동두천시', name: '동두천시', value: 28 },
        { label: '과천시', name: '과천시', value: 29 },
        { label: '가평군', name: '가평군', value: 30 },
        { label: '연천군', name: '연천군', value: 31 },
      ],
    },
  ]*/

  //2
  /*
  const locSdData = [
    {
      label: '서울시',
      name: '서울시',
      value: 1,
    },
    {
      label: '경기도',
      name: '경기도',
      value: 2,
    },
  ]
  const locSkkData = [
    {
      서울시: [
        { label: '종로구', name: '종로구', value: 1 },
        { label: '중구', name: '중구', value: 2 },
        { label: '용산구', name: '용산구', value: 3 },
        { label: '성동구', name: '성동구', value: 4 },
        { label: '광진구', name: '광진구', value: 5 },
      ],
    },
    {
      경기도: [
        { label: '수원시', name: '수원시', value: 1 },
        { label: '성남시', name: '성남시', value: 2 },
        { label: '고양시', name: '고양시', value: 3 },
        { label: '용인시', name: '용인시', value: 4 },
        { label: '부천시', name: '부천시', value: 5 },
        { label: '안산시', name: '안산시', value: 6 },
        { label: '안양시', name: '안양시', value: 7 },
      ],
    },
  ]

  // const [locSd, setLocSd] = React.useState(locSkkData[locSdData[0]])
  // const [locSkk, setLocSkk] = React.useState(locSkkData[locSdData[0]][0])

  const [locSd, setLocSd] = React.useState(locSdData.locSkkData[locSdData[0]])
  const [locSkk, setLocSkk] = React.useState(
    locSdData.locSkkData[locSdData[0]][0]
  )

  const handleLocSdChange = (value) => {
    setLocSd(locSdData[value])
    setLocSkk(locSdData[value][0])
  }

  const handleLocSkkChange = (value) => {
    setLocSkk(value)
  }
  */

  // {/*
  //               locCdNo : 시+구 (서울시중구:1, 서울시성동구:2)
  //               locSd : 시 도 (서울시 :1, 경기도:2)
  //               locSkk : 군 구 (중구:2, 성동구:4, 광진구:5) */}

  //             {/* 1. ***** api 어떻게 사용 ? ***** */}
  //             {/* /locations?locCdNo=1
  //                 /locations?locCdNo=1&locSkk=2  */}
  //             {/* 2. ***** 닉네임 중복확인 기능  ***** */}

  return (
    <>
      <Navbar />
      <Flexbox>
        <SignUpSection>
          <h2>회원가입</h2>
          <h3>추가정보</h3>
          <form>
            <InputData>
              <>
                {/* <Select
                  defaultValue={locSdData[0]}
                  style={{ width: 120 }}
                  onChange={handleLocSdChange}
                >
                  {locSdData.map((locSd) => (
                    <Option key={locSd}>{locSd}</Option>
                  ))}
                </Select>
                <Select
                  style={{ width: 120 }}
                  value={locSkk}
                  onChange={handleLocSkkChange}
                >
                  {locSd.map((locSkk) => (
                    <Option key={locSkk}>{locSkk}</Option>
                  ))}
                </Select> */}
              </>

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
