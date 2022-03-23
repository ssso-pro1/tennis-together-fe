import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { locSdData, locSkkData } from 'components/common/constants'
import baseApi from '../../service/baseApi'
import Button from 'components/common/Buttons'
import { Form, Select, Input } from 'antd'
import styled from 'styled-components'

const SignUpView = () => {
  const { Option } = Select
  const history = useHistory()
  history.push('/pages/signup')

  // const location = useLocation()
  const historyState = history.location.state
  const [form] = Form.useForm()
  // const [user, setUser] = useState(historyState && historyState.id)
  const [user, setUser] = useState(historyState && historyState.user)
  const [nickInput, setNickInput] = useState(null)

  user && console.log(user)
  user && console.log(user.phone)

  const [locSds, setLocSds] = React.useState(locSdData[0].value)
  const [locSkks, setLocSkks] = React.useState(locSkkData[locSds][0].value)

  const handleLocSdChange = (value) => {
    setLocSds(value)
  }

  const handleLocSkkChange = (value) => {
    setLocSkks(value)
  }

  // 닉네임 수정 시 set
  const handleNick = (e) => {
    e.preventDefault()
    const nick = e.target.value
    setNickInput(nick)
    console.log(nick)
  }

  // 닉네임 중복확인
  const confirmNick = () => {
    // console.log('닉네임중복확인 (api)')
    baseApi
      .get(`/users/nickname/${nickInput}`, {
        nickname: nickInput,
      })
      .then(function (response) {
        // console.log(response)
        // console.log('response된닉', nickInput)
        alert('사용가능한 닉네임입니다.')
        setNickInput(nickInput)
      })
      .catch((error) => {
        console.log(error)
        // console.log('수정실패된 nick', nickInput)
        alert('이미 사용중인 닉네임입니다.')
      })
  }

  const onFinish = async (values) => {
    // console.log(values)
    // console.log(localStorage.getItem('token'), '회원가입에넘기는토큰')

    baseApi
      .post('/users', {
        // phone: historyState.phone,
        phone: historyState.user.phone,
        nickname: values.nickName,
        birth: values.birth,
        gender: values.gender,
        history: parseInt(values.history),
        locSd: values.locSd.toString(),
        locSkk: values.locSkk.toString(),
      })
      .then(
        await function (response) {
          // const user = await response.data
          console.log(response)
          console.log(values)
          console.log('user', user)
          console.log('historyState.user', historyState.user)
          console.log('historyState.user.phone', historyState.user.phone)
          // console.log('등록완료')
          alert('회원가입이 완료되었습니다.')
          setUser(user)
          history.push('/')
        }
      )
      .catch((error) => {
        console.log(error)
        alert('회원가입에 실패했습니다.')
      })
  }

  return (
    <>
      <Flexbox>
        <SignUpSection>
          <InputData>
            <h2>회원가입</h2>

            <Form onFinish={onFinish} form={form}>
              <Nickname>
                <Form.Item name="nickname" initialValue={nickInput}>
                  <Input
                    type="text"
                    name="nickname"
                    placeholder="닉네임"
                    style={{ width: 240 }}
                  />
                </Form.Item>
                <Button
                  height={'32px'}
                  width={'80px'}
                  onChange={(e) => handleNick(e)}
                  htmlType="button"
                  Outlined
                  style={{ fontSize: '12px', fontWeight: '400' }}
                  onClick={confirmNick}
                >
                  중복확인
                </Button>
              </Nickname>
              <Form.Item
                name="locSd"
                rules={[{ required: true, message: '시/도를 선택해주세요' }]}
              >
                <Select
                  placeholder={<span>시/도</span>}
                  style={{ width: 300 }}
                  onChange={handleLocSdChange}
                >
                  {locSdData.map((locSd) => (
                    <Option key={locSd.value} value={locSd.value}>
                      {locSd.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="locSkk"
                rules={[{ required: true, message: '군/구를 선택해주세요' }]}
              >
                <Select
                  style={{ width: 300 }}
                  placeholder={<span>군/구</span>}
                  onChange={handleLocSkkChange}
                >
                  {locSkkData[locSds].map((locSkk) => (
                    <Option key={locSkk.value} value={locSkk.value}>
                      {locSkk.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="gender"
                rules={[{ required: true, message: '성별을 선택해주세요' }]}
              >
                <Select
                  placeholder={<span>성별</span>}
                  style={{ width: 300 }}
                  required
                >
                  <Option name="gender" value="여성">
                    여성
                  </Option>
                  <Option name="gender" value="남성">
                    남성
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="history"
                rules={[{ required: true, message: '경력을 선택해주세요' }]}
              >
                <Select placeholder={<span>경력</span>} style={{ width: 300 }}>
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
                </Birth>
              </Form.Item>
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
  )
}

export default SignUpView

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
