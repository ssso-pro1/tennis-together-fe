import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../service/authState'
import baseApi from '../../service/baseApi'
import Navbar from 'components/Common/Navbar'
import RecomItem from './RecomItem'

const RecomList = (props) => {
  const { user } = useContext(UserContext)
  const [friends, setFriends] = useState(null)
  const [recommend, setRecommend] = useState(null)

  console.log(user)
  if (user) {
    const uid = user.uid
    console.log(uid)
  }

  // useEffect(() => {
  //   baseApi.get('/users/me/friends/recommend')
  // })
  //   .then(async (result) => {
  //     const res = await result
  //     console.log(res)
  //     // setRecommend(res)
  //   })
  //   .catch(
  //     (error) => {
  //       console.log(error)
  //     },
  //     [recommend]
  //   )

  if (!user) return <></>
  // const uid = user && user.uid
  return (
    <>
      {/* <RecomItem key={recommend.frdRelNo} friend={recommend} /> */}
      <RecomItem />
    </>
  )
}

export default RecomList
