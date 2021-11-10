import React, { useContext } from 'react'
import { useHistory } from 'react-router'

import { UserContext } from '../../service/authState'
import Navbar from 'components/Common/Navbar'
import AuthService from 'service/authService'
import AuthState from 'service/authState'

import { Input, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import styled, { css } from 'styled-components'
import Button from 'styled-components/Buttons'
// import LoginIcon from 'styled-components/LoginIcon'

const AuthPage = ({ authService }) => {
  // 1, 2. 로그인 버튼 클릭 시
  // input창에 입력된 전화번호 넘기면서 authService의 handle~함수 호출
  const { user } = useContext(UserContext) //useContext(글로벌하게 필요한 props사용가능) 로 user가져옴

  const history = useHistory()
  const uid = true

  const onLogin = (e) => {
    e.preventDefault()
    const phoneNumber = document.querySelector('input[name=phoneNum]').value
    console.log(phoneNumber)
    authService.handlePhoneNumberAuth({ phoneNumber })
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    console.log('인증코드')

    const code = document.querySelector('input[name=authCode]').value
    authService.handleAuthCode({ code })
  }

  /*
  useEffect(() => {
    AuthService.handleOnAuthChange(user => {
        // firebase말고 테니스투게더 db에서 찾아서 ?
        user && 
    })
  })
  */

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
    /* width: 80%; */
    .loginTitle {
      border-bottom: 1px solid lightgrey;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      text-align: center;
    }
    Input {
      width: 80%;
    }

    Button {
      width: 20%;
    }

    padding-bottom: 20%;
  `

  const InputRow = styled.div`
    display: flex;
    flex-direction: row;
  `

  return (
    <>
      <Navbar />
      <section>
        <Flexbox>
          <SignInSection>
            {/* <LoginIcon className="loginImg" size={'100px'} /> */}
            <h2 className="loginTitle">로그인</h2>
            <p>로그인을 위해 휴대폰 인증을 완료해주세요 :)</p>
            <br />
            <br />
            <InputRow>
              <Input
                name="phoneNum"
                placeholder="(-없이)핸드폰번호를 입력하세요"
                prefix={<UserOutlined />}
              />
              <Button Outlined onClick={onLogin}>
                인증요청
              </Button>
            </InputRow>
            <br />
            <br />
            <InputRow>
              <Input name="authCode" type="text" placeholder="인증번호6자리" />
              <Button Outlined onClick={handleConfirm}>
                인증확인
              </Button>
            </InputRow>

            {/* 
        1. authState에서 인증확인 완료시 user정보 갖고 
        tennistogether db에서 비교 (회원가입 유무)
        있으면 -> user정보 갖고 list page -history.push('/')
        없으면 -> '계정이없습니다' 알림창, 확인 클릭시 -> signup page -history.push('/signup')
        */}
            {/* {uid === false ? alert('계정이없습니다.') : } */}

            {/* 
        2. input창 입력없이 버튼 클릭 시 alert authService 에서 alert은 안되는데 어떻게 수정할지 고민 */}
            <div id="recaptcha-div"></div>
          </SignInSection>
        </Flexbox>
      </section>
    </>
  )
}

export default AuthPage
