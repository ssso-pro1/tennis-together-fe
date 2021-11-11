import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Navbar from 'components/Common/Navbar'
import { UserContext } from '../../service/authState'
import { defaultHeaders } from '../../config/clientConfig'

import { Select, Input, DatePicker, Space } from 'antd'
import styled from 'styled-components'
import Flexbox from '../../styled-components/Flexbox'
import Button from '../../styled-components/Buttons'
import { useDebugValue } from 'react/cjs/react.development'

const { Option } = Select

const SignUpPage = ({ setSignUpPageOpen }) => {
  // const { setUser } = useContext(UserContext)

  useEffect(() => {
    console.log('signuppage도달확인')
  })

  // const confirmNick = () => {
  //   console.log('닉네임중복확인하는 함수넣기')
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log(`${e.target.nickName.value}`)
  //   // console.log(`${setUser.uid}`)

  //   // users 등록 api아직 작업 중
  //   // axios 안에 api주소로 등록할 user 정보담아서 json.stringify
  //   const res = await fetch('http://localhost:3000/users', {
  //     method: 'POST',
  //     headers: defaultHeaders,
  //     body: JSON.stringify({
  //       locSd: e.target.locSd.value,
  //       locSkk: e.target.locSkk.value,
  //       gender: e.target.gender.value,
  //       history: e.target.history.value,
  //       nickName: e.target.nickName.value,
  //       birth: e.target.birth.value,
  //     }),
  //   })

  //   // 등록되면 setUser(user)
  //   const user = await res.json()
  //   console.log(`post http://localhost:3000/users ${JSON.stringify(user)}`)
  //   setSignUpPageOpen(false)
  //   setUser(user)
  // }

  // useEffect(() => {
  //   axios('/locations') //
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  // }, [])

  // useEffect(() => {
  //   axios('https://tennis-togeter.herokuapp.com/locations') //
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  // }, [])

  // function onChange(date, dateString) {
  //   console.log(date, dateString)
  // }

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
  }*/
  // 서울시, 경기도만 하기엔 value값을 보내줘야해서 객체로 해야함..흠..

  const locSdData = [
    {
      id: 1,
      label: '서울시',
      name: '서울시',
      value: 1,
    },
    {
      id: 2,
      label: '경기도',
      name: '경기도',
      value: 2,
    },
  ]

  // locSdData.forEach(function (value) {
  //   let obj_key = Object.keys(value)
  //   let obj_value = value[obj_key]
  //   console.log(obj_key + ':' + obj_value)
  // })

  // const pickLocSd = locSdData.filter(function(locSd) {return locSd.value == })

  const locSkkData = 
    {
      1: [
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
      2: [
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
    }

  // useState( cityData[Zhejiang]) -> 시도[0] 에 해당하는 군구 ->  객체들
  // const [locSds, setLocSds] = React.useState(locSkkData[locSdData[0]])
  const [locSds, setLocSds] = React.useState(locSdData[0].value)
  const [locSkks, setLocSkks] = React.useState(locSkkData[locSds][0].value)

  // useState ( cityData) -> 군구[0] 배열
  // const [locSkks, setLocSkks] = React.useState(locSkkData[locSdData[0]][0])

  const handleLocSdChange = (value) => {
    setLocSds(value)
    // setLocSkks(locSkkData[value][0])
  }

  const handleLocSkkChange = (value) => {
    setLocSkks(value)
  }
  const onSubmit = () => {
    console.log('도시 선택값', locSds)
    console.log('시군구 선택값', locSkks)

  }

  return (
    <>
      {/* <Navbar />
      <Flexbox>
        <SignUpSection>
          <h2>회원가입</h2>
          <h3>추가정보</h3>
          <form>
            <InputData> */}
              {/*  */}
              <button onClick={onSubmit}>제출</button>
              <Select
                defaultValue={locSdData[0].name}
                style={{ width: 120 }}
                onChange={handleLocSdChange}
              >
                {/* 배열에서 객체 선택 map됨 -> 객체의 name, value필요? */}
                {locSdData.map((locSd) => (
                  <Option
                    key={locSd.value}
                    value={locSd.value}
                    // name={locSd.name}
                  >
                    {locSd.name}
                  </Option>
                ))}
              </Select>

              {/* 첫번째 선택된 시,도 중 군구 map */}
              <Select
                style={{ width: 120 }}
                defaultValue={locSkkData[locSds][0].value}
                onChange={handleLocSkkChange}
              >
                {locSkkData[locSds].map((locSkk) => (
                  <Option key={locSkk.value} value={locSkk.value}>{locSkk.name}</Option>
                ))}
              </Select>
              {/*  */}
              <br />

              {/* <Select defaultValue="성별" style={{ width: 300 }}>
                <Option name="gender" value="여성">
                  여성
                </Option>
                <Option name="gender" value="남성">
                  남성
                </Option>
              </Select> */}
              <br />

              {/* <Select defaultValue="경력" style={{ width: 300 }}>
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
              </Select> */}
              <br />

              {/* <Birth>
                <Space direction="vertical">
                  <DatePicker
                    onChange={onChange}
                    placeholder="생년월일(900101)"
                    style={{ width: 300 }}
                    name="birth"
                  />
                </Space>
              </Birth> */}
              <br />

              {/* <Nickname>
                <Input type="text" name="nickName" placeholder="닉네임" />
                <Button
                  Secondary
                  onClick={() => {
                    confirmNick()
                  }}
                >
                  중복확인
                </Button>
              </Nickname> */}
              <br />

              {/* <Button style={{ width: 300 }} onSubmit={handleSubmit}>
                회원가입
              </Button>
            </InputData>
          </form>
        </SignUpSection>
      </Flexbox> */}
    </>
  )
}

export default SignUpPage
