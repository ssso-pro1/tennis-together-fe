import React from 'react'

const LoginPage = ({ authService }) => {
  // const onLogin = () => {
  //   authService.signInGoogle()
  // }

  // 1, 2. 로그인 버튼 클릭 시
  // input창에 입력된 전화번호 넘기면서 authService의 handle~함수 호출

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

  return (
    <section>
      <form>
        <h1>Login</h1>
        <input name="phoneNum" placeholder="(-없이)핸드폰번호를 입력하세요" />
        <button onClick={onLogin}>인증요청</button>
        <input name="authCode" type="text" placeholder="인증번호6자리" />
        <button onClick={handleConfirm}>인증확인</button>
        <div id="recaptcha-div"></div>
        {/* <button onClick={onLogin}>Google</button> */}
      </form>
    </section>
  )
}

export default LoginPage
