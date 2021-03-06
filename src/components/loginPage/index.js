import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'
import firebaseApp from '../../service/firebase'
import firebase from 'firebase'

import styled from 'styled-components'
import Button from 'components/common/Buttons'
import { Popover } from 'antd'
import { Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const LoginPage = () => {
  const content = <div>재인증요청시 새로고침해주세요</div>
  const history = useHistory()
  // history.push('/pages/authin')

  const { user, setUser } = useContext(UserContext)
  // const [phoneNumber, setPhoneNumber] = useState(null)

  /**
   * 버튼 클릭 시 해당 번호, 코드 넘겨주는 함수들 -----------------
   */

  /*
  const handlePhone = (e) => {
    // e.preventDefault()
    const phoneNumber = e.target.value
    setPhoneNumber(phoneNumber)
    console.log(phoneNumber)
  }
  */
  const onLogin = (e) => {
    const phoneNumber = document.querySelector('input[name=phoneNum]').value
    e.preventDefault()
    console.log(phoneNumber)
    handlePhoneNumberAuth({ phoneNumber })
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    console.log('인증코드')
    const code = document.querySelector('input[name=authCode]').value
    handleAuthCode({ code })
  }

  /**
   * firebase PhoneNumber sign-in -------------------------------------
   */

  // 1. 사용자 전화로 인증 코드 전송
  const handlePhoneNumberAuth = ({ phoneNumber }) => {
    console.log('인증 코드 전송 - recap만드는단계')
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-div',
      {
        size: 'invisible',
        callback: (response) => {},
      }
    )
    console.log(`${phoneNumber}에 인증요청`)

    firebaseApp.auth().languageCode = 'ko'
    firebaseApp
      .auth()
      .signInWithPhoneNumber('+82' + phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        alert('인증번호가 전송되었습니다.')
        window.confirmationResult = confirmationResult
      })
      .catch((error) => {
        console.log(error)
        alert('핸드폰 번호를 입력해주세요')
      })
  }

  // 2. 인증 코드로 사용자 로그인 처리 (인증코드 확인)
  const handleAuthCode = ({ code }) => {
    window.confirmationResult.confirm(code).then(async (result) => {
      alert('인증이 완료되었습니다.')
      const user = result.user
      const token = await firebaseApp.auth().currentUser.getIdToken()
      // console.log('인증 성공 토큰', token)
      localStorage.setItem('token', token)

      try {
        const res = await baseApi.get('/users/me')
        if (res.status === 200) {
          const user = await res.data
          setUser(user)
          history.push('/')
        } else if (res.status === 404) {
          alert('계정이 존재하지 않습니다.')
          history.push({
            pathname: '/pages/signup',
            state: {
              user: user,
            },
          })
        }
      } catch (error) {
        console.log(error)
        alert('인증번호를 확인해주세요')
      }
    })
  }

  return (
    <>
      <Flexbox>
        <SignInSection>
          <div className="loginLogoDiv">
            <img
              className="loginLogo"
              src="/images/loginLogo.svg"
              alt="loginlogo"
            />
          </div>
          <div className="login">
            <h2 className="loginTitle">로그인</h2>
            <p>로그인을 위해 휴대폰 인증을 완료해주세요 :)</p>
            <br />
            <br />

            <InputRow>
              <Input
                placeholder="핸드폰 번호(01012341234)"
                // onChange={(e) => handlePhone(e)}
                // value={phoneNumber}
                name="phoneNum"
                prefix={<UserOutlined />}
              />
              <Popover content={content} title="주의">
                <Button
                  disabled=""
                  style={{ fontSize: '15px', fontWeight: '600' }}
                  Outlined
                  onClick={(e) => {
                    onLogin(e)
                    // handlePhoneNumberAuth()
                    e.currentTarget.disabled = true
                  }}
                >
                  인증요청
                </Button>
              </Popover>
            </InputRow>
            <br />
            <InputRow>
              <Input name="authCode" type="text" placeholder="인증번호6자리" />
              <Button
                style={{ fontSize: '15px', fontWeight: '600' }}
                Outlined
                onClick={(e) => handleConfirm(e)}
              >
                인증확인
              </Button>
            </InputRow>
          </div>
          <div id="recaptcha-div"></div>
        </SignInSection>
      </Flexbox>
    </>
  )
}

export default LoginPage

const Flexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SignInSection = styled.div`
  padding-bottom: 5rem;
  .loginLogoDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    .loginLogo {
      padding-right: 1.2rem;
      margin-top: 3rem;
    }
  }
  .login {
    text-align: center;
    h2 {
      font-size: 2rem;
      margin: 1.2rem;
      margin-bottom: 2rem;
      padding: 2rem;
      border-bottom: 2px solid #b2b3b9;
    }
    p {
      margin-bottom: 3rem;
    }
  }
`
const InputRow = styled.div`
  display: flex;
  flex-direction: row;
`
