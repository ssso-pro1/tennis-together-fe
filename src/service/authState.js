import React, { useEffect, useState } from 'react'
import firebaseApp from './firebase'
import { defaultHeaders } from '../config/clientConfig'

// firebase 로그인 감지하여 하위 컴포넌트에 전달

// 현재 firebase 에 로그인한 사용자의 토큰 가져와서
// 테니스 투게더에 로그인 시도

export const UserContext = React.createContext(null)

const AuthState = ({ children }) => {
  // user정보 담긴 UserContext
  const [user, setUser] = useState(null)

  // let uid = ''

  // useEffect(() => {
  const handleAuthStateChange = () => {
    // firebase의 user 정보
    // db에 존재유무확인만! boolean 값 return

    firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // firebase에 사용자 로그인
        const uid = user.uid
        console.log(`onAuthStateChanged2: ${uid}`)

        // firebase 에 로그인된 사용자의 토큰을 가져옴
        const token = await user.getIdToken()

        // header에 인증 정보 추가
        defaultHeaders.Authorization = `Bearer ${token}`

        // * 테니스 투게더 db, 로그인 시도 (백엔드 api 필요)
        // const res = await fetch(`http://localhost:3000/users/${uid}`, {
        const res = await fetch(`http://localhost:3000/users/me`, {
          method: 'GET',
          headers: defaultHeaders,
        })
        console.log(res)
        // console.log(res.data) //undefined

        // firebase 인증O + 백엔드db에서 계정 O : 로그인 성공시 user를 넘겨줌 (200: 성공)
        if (res.data) {
          const user = await res.json()
          setUser(user)
          console.log(`성공3${uid}`)
          console.log(`성공3${token}`)

          // firebase 인증O + 백엔드 db에서 계정 x : 회원가입 페이지로 이동 // (404 Unauthorized)
        } else if (!res.data) {
          alert('계정이 존재하지 않습니다.')
        }

        // firebase 인증O + 백엔드db에서 계정 O : 로그인 성공시 user를 넘겨줌 (200: 성공)
        // if (res.status === 200) {
        //   const user = await res.json()
        //   setUser(user)
        //   console.log(`성공3${uid}`)
        //   console.log(`성공3${token}`)
        //   // *** firebase 로그인 인증 시 여기까지 출력됨! *****
        //   history.push('/')
        // firebase 인증O + 백엔드 db에서 계정 x : 회원가입 페이지로 이동 // (404 Unauthorized)
        // } else if (res.status === 404) {
        //   const data = await res.json()
        //   if (data.code === 'USER_NOT_FOUND') {
        //     alert('계정이 존재하지 않습니다.')
        //     setSignUpPageOpen(true)
        //     history.push('/signup')
        //   }
        // }
      } else {
        // firebase X
        // 로그아웃시 header에서 삭제
        console.log(`삭제`)
        delete defaultHeaders.Authorizations
        setUser(null)
      }
    })
  }
  // }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthState
