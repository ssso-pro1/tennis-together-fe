import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Navbar from 'components/Common/Navbar'
import { UserContext } from '../../service/authState'
import { defaultHeaders } from '../../config/clientConfig'

import { Form, Select, Button, Input, DatePicker, Space } from 'antd'
import styled from 'styled-components'

// import Flexbox from '../../styled-components/Flexbox'
import { useHistory, useLocation } from 'react-router-dom'
// import Button from '../../styled-components/Buttons'

const { Option } = Select
// useEffect(() => {
//   axios('http://localhost:3000/users') //
//     .then((response) => {
//       console.log(response)
//     })
// }, [])

// const id = 'firebasetempId'
// const phone = '010'

const SignUpPage = ({ props }) => {
  // const [cbirth, setCBirth] = useState('')
  const history = useHistory()
  const location = useLocation()
  const historyState = history.location.state
  const [form] = Form.useForm()
  const [user, setUser] = useState(historyState && historyState.id)
  // const [user, setUser] = useState(historyState && historyState.user)

  useEffect(() => {
    console.log('signuppage도달확인')
    console.log(location)
    console.log(historyState)
    console.log(historyState.user) //값안넘겨서undefined
    console.log(historyState.id)
    console.log(historyState.phone)
    // console.log(id)
    // console.log(phone)
  })

  const confirmNick = () => {
    console.log('닉네임중복확인하는 함수넣기 (api)')
  }

  axios
    // .post('http://localhost:3000/users', {
    .post('/users', {
      uid: historyState.id,
      phone: historyState.phone,
      // uid: id,
      // phone: phone,
      // nickName: values.nickName, //
      // birth: values.birth, //
      // birth: cbirth,
      // gender: values.gender,
      // history: parseInt(values.history),
      // locSd: values.locSd.toString(),
      // locSkk: values.locSkk.toString(),
      // history: values.history, //
      // locSd: values.locSd, //
      // locSkk: values.locSkk, //
      userName: '임의로보내기',
    })
    .then(function (response) {
      // console.log(values) //
      console.log(`${user}`)
      console.log('등록완료')
      alert('회원가입이 완료되었습니다.')
      setUser(user)
      history.push('/')
    })
    .catch((error) => {
      console.log(error) // 가입실패 Error: Request failed with status code 400
      alert('회원가입에 실패했습니다.') //뜸
    })

  /*
  function onChange(date, dateString) {
    console.log(dateString) //2021-11-05

    const selectedDate = new Date(dateString)
    const year = selectedDate.getFullYear().toString().substring(2, 4)
    console.log(year) //21

    let month = (selectedDate.getMonth() + 1).toString()
    console.log(month)
    if (month < 10) {
      month = 0 + month
    }
    console.log(month)

    let selDate = selectedDate.getDate().toString()
    console.log(selDate)
    if (selDate < 10) {
      selDate = 0 + selDate
    }
    console.log(selDate)

    const birthday = year + month + selDate
    console.log(birthday)
    setCBirth(birthday)
  }
*/
  const onFinish = async (values) => {
    console.log(values) //heroku 로 가입 시도 시 여기까지 출력되고 catch error

    axios
      // .post('http://localhost:3000/users', {
      .post('/users', {
        uid: historyState.id,
        phone: historyState.phone,
        // uid: id,
        // phone: phone,
        nickName: values.nickName,
        birth: values.birth,
        // birth: cbirth,
        gender: values.gender,
        history: parseInt(values.history),
        locSd: values.locSd.toString(),
        locSkk: values.locSkk.toString(),
        // history: values.history,
        // locSd: values.locSd,
        // locSkk: values.locSkk,
      })
      .then(function (response) {
        console.log(values)
        console.log(`${user}`)
        console.log('등록완료')
        alert('회원가입이 완료되었습니다.')
        setUser(user)
        history.push('/')
      })
      .catch((error) => {
        console.log(error) // 가입실패 Error: Request failed with status code 400
        alert('회원가입에 실패했습니다.') //뜸
      })
  }

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

  const locSkkData = {
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

  const [locSds, setLocSds] = React.useState(locSdData[0].value)
  const [locSkks, setLocSkks] = React.useState(locSkkData[locSds][0].value)

  const handleLocSdChange = (value) => {
    setLocSds(value)
  }

  const handleLocSkkChange = (value) => {
    setLocSkks(value)
  }

  // style
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
          <InputData>
            <Form onFinish={onFinish} form={form}>
              <Form.Item
                name="locSd"
                rules={[{ required: true, message: '시/도를 선택해주세요' }]}
              >
                <Select
                  defaultValue="시/도"
                  style={{ width: 300 }}
                  onChange={handleLocSdChange}
                >
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
              </Form.Item>
              <br />

              <Form.Item
                name="locSkk"
                rules={[{ required: true, message: '군/구를 선택해주세요' }]}
              >
                <Select
                  style={{ width: 300 }}
                  defaultValue="군/구"
                  onChange={handleLocSkkChange}
                >
                  {locSkkData[locSds].map((locSkk) => (
                    <Option key={locSkk.value} value={locSkk.value}>
                      {locSkk.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <br />

              <Form.Item
                name="gender"
                rules={[{ required: true, message: '성별을 선택해주세요' }]}
              >
                <Select defaultValue="성별" style={{ width: 300 }} required>
                  <Option name="gender" value="여성">
                    여성
                  </Option>
                  <Option name="gender" value="남성">
                    남성
                  </Option>
                </Select>
              </Form.Item>
              <br />

              <Form.Item
                name="history"
                rules={[{ required: true, message: '경력을 선택해주세요' }]}
              >
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
              </Form.Item>
              <br />

              <Form.Item
                name="birth"
                rules={[{ required: true, message: '생일을 선택해주세요' }]}
              >
                <Birth>
                  <Input
                    type="text"
                    name="birth"
                    placeholder="생년월일(900327)"
                    style={{ width: 300 }}
                  />
                  {/* <Space direction="vertical">
                    <DatePicker
                      name="birth"
                      placeholder="생년월일"
                      onChange={onChange}
                      style={{ width: 300 }}
                    />{' '}
                  </Space> */}
                </Birth>
              </Form.Item>
              <br />

              <Form.Item
                name="nickName"
                rules={[
                  { required: true, message: '닉네임을 선택해주세요' },
                  { pattern: '', message: '' },
                ]}
              >
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
              </Form.Item>
              <br />

              <Form.Item>
                <Button style={{ width: 300 }} htmlType="submit">
                  회원가입
                </Button>
              </Form.Item>
            </Form>
          </InputData>
        </SignUpSection>
      </Flexbox>
    </>
    // {/* <button onClick={onSubmit}>제출</button> */}
  )
}

export default SignUpPage
