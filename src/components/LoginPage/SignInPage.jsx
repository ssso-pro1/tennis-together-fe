import React from 'react'
import { useHistory } from 'react-router'
import Navbar from 'components/common/Navbar'
import { Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Button from '../common/Buttons'
import styled, { css } from 'styled-components'
import Flexbox from 'components/common/Flexbox'

const SignInPage = (props) => {
  const history = useHistory()

  const goToAuth = () => {
    // firebase에서 user 정보 받아오면
    // 해당 번호 입력 값 가지고 넘어감?
    history.push('/authin')
  }

  const Flexbox = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 1.8rem;
      margin: 5rem;
    }
  `
  const SignInSection = styled.div`
    Input {
      width: 100%;
    }

    Button {
      width: 100%;
    }

    padding-bottom: 20%;
  `

  return (
    <>
      <Navbar />
      <Flexbox>
        <SignInSection>
          <h2>로그인</h2>
          <br />
          <br />
          <Input
            className="input"
            size="large"
            placeholder="'-'없이 핸드폰번호를 입력하세요"
            prefix={<UserOutlined />}
          />
          <br />
          <br />
          <Button onClick={() => goToAuth()}>로그인하기</Button>
        </SignInSection>
      </Flexbox>
    </>
  )
}

export default SignInPage
