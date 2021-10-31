import firebase from 'firebase'
import firebaseApp from './firebase'

class AuthService {
  /**
   * firebase google sign-in ------------------------------------------
   */
  // signInGoogle() {
  //   const authProvider = new firebase.auth.GoogleAuthProvider()
  //   return firebaseApp.auth().signInWithPopup(authProvider)
  // }

  /**
   * firebase PhoneNumber sign-in -------------------------------------
   */

  // 3. 사용자 전화로 인증 코드 전송
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
        this.firebaseError(error)
        alert('firebase auth error')
      })
  }

  // 4. 인증 코드로 사용자 로그인 처리 (인증코드 확인)

  handleAuthCode = ({ code }) => {
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // 인증 성공
        alert('인증이 완료되었습니다.')
        const user = result.user
        console.log(user, user.uid)
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        this.firebaseError(error)
      })
  }
}

export default AuthService