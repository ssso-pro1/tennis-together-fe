// import React, { useEffect } from 'react'
import React from 'react'
import { useHistory } from 'react-router'

import firebase from 'firebase'
import firebaseApp from './firebase'
// import { authState } from './authState'
import AuthState from './authState'
import AuthPage from 'components/loginPage/AuthPage'

class AuthService {
  // const AuthService = ({ props }) => {
  // const history = useHistory()
  /**
   * firebase PhoneNumber sign-in -------------------------------------
   */

  // 1. 사용자 전화로 인증 코드 전송
  // signInWithPhoneNumber 호출하면서 사용자의 전화번호 전달

  handlePhoneNumberAuth = ({ phoneNumber }) => {
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

  handleAuthCode = ({ code }) => {
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // 인증 성공
        alert('인증이 완료되었습니다.')
        const user = result.user
        // console.log(user, user.uid)
        console.log(user)
        console.log(user.uid)

        // authState에서 true false확인후에 페이지 넘어감
        // if else 페이지 이동 여기서 처리
        // o : 메인페이지 x: 회원가입페이지
        // history.push

        // *** 여기서 인증성공했을 때 authState로 넘어가게 : authState.handleAuthCodeState() 갈지?

        const loginResult = AuthState.handleAuthStateChange()

        console.log(loginResult)

        // if (loginResult === true) {
        //   history.push('/')
        // } else if (loginResult === false) {
        //   history.push('/signup')
        // }
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log('handleAuthCode() 실패')
        alert('인증번호를 확인해주세요')
      })
  }

  // 3. 사용자 로그아웃
  handleSignOut = () => {
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
}

export default AuthService
