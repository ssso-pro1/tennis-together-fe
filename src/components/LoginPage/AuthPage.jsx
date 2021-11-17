import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase'
import firebaseApp from '../../service/firebase'
import { defaultHeaders } from '../../config/clientConfig'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseAPI'

import Navbar from 'components/Common/Navbar'

import { Input, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled, { css } from 'styled-components'
import Button from 'styled-components/Buttons'
// import LoginIcon from 'styled-components/LoginIcon'

const AuthPage = ({ props }) => {
  const history = useHistory()

  const { user, setUser } = useContext(UserContext) //로그인때도 이렇게 해야할까?
  // const [user, setUser] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)

  useEffect(() => {
    const handleSignIn = () => {
      firebaseApp.auth().onAuthStateChanged(async (user) => {
        console.log('인증번호 없이 가져온 파이어베이스 유저', user)
        const token = await user.getIdToken();
        console.log('인증번호 없이 가져온 파이어베이스 토큰', token)
        localStorage.setItem('token', token)
      })
    };
    handleSignIn();
  })
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
        console.log(error)
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
        console.log(user) //ㅇ
        console.log(user.uid) // ㅇ
        console.log(phoneNumber) //ㅇ

        const token = await firebaseApp.auth().currentUser.getIdToken()
        console.log('인증 성공 토큰', token)
        localStorage.setItem('token', token)
        // defaultHeaders.Authorization = `Bearer ${token}`
        defaultHeaders.Authorization = `Bearer ${token}`

        const res = await fetch('/users/me', {
          // get 401 unauthorized
          method: 'GET',
          headers: defaultHeaders,
        })
        console.log(res) // ㅇ

        // if (res.status === 200) {
        if (res.data) {
          // if (res) {
          const user = await res.json()
          setUser(user)
          console.log(`성공3${user.uid}`)
          history.push('/')
        } else if (!res.data) {
          // } else if (!res) { // 가입안해도 인증만 하면 로그인됨
          // } else if (res.status === 401) {
          alert('계정이 존재하지 않습니다.')
          console.log(user)
          console.log(user.uid)
          console.log(phoneNumber)

          history.push({
            pathname: '/signup',
            state: {
              id: user.uid,
              phone: phoneNumber,
            },
          })
        }
      })
      .catch((error) => {
        console.log(error)

        console.log('handleAuthCode() 실패')
        alert('인증번호를 확인해주세요')
      })

    /*
      localStorage.setItem('token', token)

      baseApi
        .get('/users/me')
        .then(async (res) => {
          console.log(res)
          console.log(res.data)

          if (res.data) {
            const user = await res.data
            setUser(user)
            console.log(`성공3${user.uid}`)
            history.push('/')
          } else if (!res.data) {
            alert('계정이 존재하지 않습니다.')
            console.log(user.uid)
            console.log(phoneNumber)

            // console.log('127token', token)
            history.push({
              pathname: '/signup',
              state: {
                id: user.uid,
                phone: phoneNumber,
              },
            })
            // console.log('138token', token)
          }
        })
        .catch((error) => {
          console.log(error)
          console.log('handleAuthCode() 실패')
          alert('인증번호를 확인해주세요')
        })
        */
  }

  // 인증번호 없이 로그인하기
  const handleDirectSignIn = async () => {
    console.log('로그인에 사용하는 토큰', localStorage.getItem('token'))
    fetch('/users/me', {
      method: 'GET',
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    })
      .then(async (res) => {
        console.log(res)
        console.log(res.data)

        if (res.data) {
          const user = await res.data
          setUser(user)
          console.log(`성공3${user.uid}`)
          history.push('/')
        } else if (!res.data) {
          alert('계정이 존재하지 않습니다.')
          console.log(user.uid)
          console.log(phoneNumber)

          // console.log('127token', token)
          history.push({
            pathname: '/signup',
            state: {
              id: user.uid,
              phone: phoneNumber,
            },
          })
          // console.log('138token', token)
        }
      })
      .catch((error) => {
        console.log(error)
        console.log('handleAuthCode() 실패')
        alert('인증번호를 확인해주세요')
      })
  }

  /*
  const res = await fetch('/users/me', {
          // get 401 unauthorized
          method: 'GET',
          headers: defaultHeaders,
        })
        console.log(res) // ㅇ
        if (res.data) {
          // if (res) {
          const user = await res.json()
          setUser(user)
          console.log(`성공3${user.uid}`)
          console.log(`성공3${token}`)
          history.push('/')
        } else if (!res.data) {
          // } else if (!res) { // 가입안해도 인증만 하면 로그인됨
          alert('계정이 존재하지 않습니다.')
          console.log(user)
          console.log(user.uid)
          console.log(phoneNumber)

          console.log('127token', token)

          history.push({
            pathname: '/signup',
            state: {
              token: `Bearer ${token}`,
              id: user.uid,
              phone: phoneNumber,
            },
          })

          console.log('138token', token)
        }
      })
      .catch((error) => {
        console.log(error)

        console.log('handleAuthCode() 실패')
        alert('인증번호를 확인해주세요')
      })
    }
      */

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
            <InputRow>
              <Button Outlined onClick={handleDirectSignIn}>
                인증없이 토큰확인
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
