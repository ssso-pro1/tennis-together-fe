import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import firebaseApp from './firebase'
import baseApi from './baseApi'

export const UserContext = React.createContext(null)

export const AuthState = ({ children }) => {
  // user정보 담긴 UserContext
  const [user, setUser] = useState(null)

  useEffect(() => {
    // const handleAuthStateChange = () => {
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // firebase에 사용자 로그인
        const uid = user.uid

        // firebase 에 로그인된 사용자의 토큰을 가져옴
        const token = await firebaseApp.auth().currentUser.getIdToken()
        // console.log('token', token)

        localStorage.setItem('token', token)
        baseApi.get('/users/me').then(async (res) => {
          // console.log(res.data)
          const user = await res.data

          if (res.status === 200) {
            setUser(user)
            // setUser(uid)
            // console.log(`성공3${uid}`)
            // console.log(`성공3${token}`)
          } else if (res.status === 404) {
            alert('계정이 존재하지 않습니다.')
          }
        })
      } else {
        // 로그아웃시 header에서 삭제
        localStorage.removeItem('token')
        setUser(null)
      }
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthState
