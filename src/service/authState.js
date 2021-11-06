import React, { Children, useEffect, useState } from 'react'
import axios from 'axios'
import firebaseApp from './firebase'
import { defaultHeaders } from '../config/clientConfig'
import AuthService from './authService'
import Navbar from 'components/Common/Navbar'
import ListPage from 'components/ListPage/ListPage'
import AuthPage from 'components/LoginPage/AuthPage'
import SignUpPage from 'components/LoginPage/SignUpPage'
import App from '../App'
// firebase 로그인 감지하여 하위 컴포넌트에 전달

// 현재 firebase 에 로그인한 사용자의 토큰 가져와서
// 테니스 투게더에 로그인 시도

const AuthState = (props) => {
  // user정보 담긴 UserContext

  // const UserContext = React.createContext(null)
  // const [user, setUser] = useState(null)

  let uid = ''

  useEffect(() => {
    // firebase의 user 정보

    firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // firebase에 사용자 로그인
        const uid = user.uid
        console.log(`onAuthStateChanged2: ${uid}`)

        // firebase 에 로그인된 사용자의 토큰을 가져옴
        const token = user.getIdToken()

        // header에 인증 정보 추가
        defaultHeaders.Authorization = `${token}`

        // * 테니스 투게더 db, 로그인 시도 (백엔드 api 필요)
        // 이 부분 !! '/user' <- api문서

        const res = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: defaultHeaders,
        })

        // 로그인 성공시 user를 넘겨줌
        if (res.status === 200) {
          const user = await res.json()
          setUser(user)
          console.log(`성공3${uid}`)
        }
      } else {
        console.log(`삭제`)
        // 로그아웃
        // delete defaultHeaders.Authorizations
        setUser(null)
      }
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* <App UserContext={UserContext} /> */}
      {/* <Navbar UserContext={UserContext} /> */}
      {/* <ListPage UserContext={UserContext} /> */}
      {/* <AuthPage /> */}
      {props.children}
    </UserContext.Provider>
  )
  // <>{uid ? <ListPage /> : <SignUpPage />}</>

  //  <UserContext.Provider value={{ user, setUser }}>
  //      {db에 사용자 정보 없으면 ? <SignUpPage /> : <ListPage />}
  // </UserContext.Provider>
}

export default AuthState
