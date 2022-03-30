import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import firebaseApp from './firebase'
import baseApi from './baseApi'

export const UserContext = React.createContext(null)

export const AuthState = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid

        const token = await firebaseApp.auth().currentUser.getIdToken()

        localStorage.setItem('token', token)
        baseApi.get('/users/me').then(async (res) => {
          // console.log(res.data)
          const user = await res.data

          if (res.status === 200) {
            setUser(user)
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
