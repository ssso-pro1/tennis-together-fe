import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import firebase from 'firebase'
import firebaseApp from '../../service/firebase'
import { defaultHeaders } from '../../config/clientConfig'

import Navbar from 'components/Common/Navbar'

import { Input, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled, { css } from 'styled-components'
import Button from 'styled-components/Buttons'
// import LoginIcon from 'styled-components/LoginIcon'

const AuthPage = ({ props }) => {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)

  /**
   * 버튼 클릭 시 해당 번호, 코드 넘겨주는 함수들 -----------------
   */

  const handlePhone = (e) => {
    const phoneNumber = e.target.value
    setPhoneNumber(phoneNumber)
    console.log(phoneNumber)
  }

  const onLogin = (e) => {
    // const phoneNumber = document.querySelector('input[name=phoneNum]').value
    e.preventDefault()
    console.log(phoneNumber)
    handlePhoneNumberAuth({ phoneNumber })
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    console.log('인증코드')

    const code = document.querySelector('input[name=authCode]').value
    handleAuthCode({ code, phoneNumber })
  }

  /**
   * firebase PhoneNumber sign-in -------------------------------------
   */

  // 1. 사용자 전화로 인증 코드 전송
  // signInWithPhoneNumber 호출하면서 사용자의 전화번호 전달
  const handlePhoneNumberAuth = ({ phoneNumber }) => {
    // 보이지 않는 reCAPTCHA 사용
    console.log('인증 코드 전송 - recap만드는단계')
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-div',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    )
    console.log(`${phoneNumber}에 인증요청`)

    firebaseApp.auth().languageCode = 'ko'
    firebaseApp
      .auth()
      .signInWithPhoneNumber('+82' + phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // 인증번호 발송성공. 인증번호 입력 필요
        alert('인증번호가 전송되었습니다.')
        window.confirmationResult = confirmationResult
      })
      .catch((error) => {
        console.log('signInWithPhoneNumber 실패')
        alert('핸드폰 번호를 입력해주세요')
      })
  }

  // 2. 인증 코드로 사용자 로그인 처리 (인증코드 확인)
  const handleAuthCode = ({ code }) => {
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        // 인증 성공
        alert('인증이 완료되었습니다.')
        const user = result.user
        console.log(user)
        console.log(user.uid) // *출력확인
        console.log(phoneNumber)

        // const token = await user.getIdToken()
        // const token = await firebase.User.getIdToken()
        const token = await firebaseApp.auth().currentUser.getIdToken()

        // header에 인증 정보 추가
        defaultHeaders.Authorization = `Bearer ${token}`

        // * 테니스 투게더 db, 로그인 시도 (백엔드 api 필요)
        const res = await fetch(`http://localhost:3000/users/me`, {
          method: 'GET',
          headers: defaultHeaders,
        })
        console.log(res) // *출력 확인

        // firebase 인증O + 백엔드db에서 계정 O : 로그인 성공시 user를 넘겨줌 (200: 성공)
        if (res.data) {
          const user = await res.json()
          setUser(user)
          console.log(`성공3${user.uid}`)
          console.log(`성공3${token}`)
          history.push('/')

          // firebase 인증O + 백엔드 db에서 계정 x : 회원가입 페이지로 이동 // (404 Unauthorized)
        } else if (!res.data) {
          alert('계정이 존재하지 않습니다.')
          // const user = await res.json() //추가
          // 위에서 인증한 user
          console.log(user)
          console.log(user.uid)
          console.log(phoneNumber)

          history.push({
            pathname: '/signup',
            state: {
              // user: user, // 이거넣으면 DOMException: Failed to execute 'pushState' on 'History': function () { [native code] } could not be cloned.
              id: user.uid,
              phone: phoneNumber,
            },
          })
        }
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)

        console.log(error)
        console.log('handleAuthCode() 실패')
        alert('인증번호를 확인해주세요')
      })
  }

  // 3. 사용자 로그아웃
  const handleSignOut = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        alert('로그아웃 되었습니다.')
      })
      .catch((error) => {
        // An error happened.
        console.log('handleSignOut() 실패')
        window.alert('로그아웃 실패했습니다')
      })
  }

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
                // name="phoneNum"
                placeholder="(-없이)핸드폰번호를 입력하세요"
                onChange={handlePhone}
                value={phoneNumber}
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
            <div id="recaptcha-div"></div>
          </SignInSection>
        </Flexbox>
      </section>
    </>
  )
}

export default AuthPage

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
