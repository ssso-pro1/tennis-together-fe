import React, { useContext, useState, useEffect } from 'react'
import { LoadingSpin } from 'components/common/constants'
import baseApi from 'service/baseApi'
import { UserContext } from 'service/authState'

import ApplyGames from './ApplyGames'

const Notifications = () => {
  const { user } = useContext(UserContext)
  const [applyUsers, setApplyUsers] = useState(null)
  const [applyGames, setApplyGames] = useState(null)
  const [clickTab, setClickTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [myLists, setMyLists] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const allmygames = await baseApi(`/games`)
      setMyLists(allmygames.data.content)

      let array = []

      for await (let item of allmygames.data.content) {
        let gameNo = item.gameNo
        if (user && item.gameCreator.uid === user.uid) {
          let userData = await baseApi(`/games/${gameNo}/users`)
          array.push(...userData.data.content)
        }
      }
      setApplyUsers(array)
      setLoading(false)

      const applyGame = await baseApi(`games/histories/applygames`)
      setApplyGames(applyGame.data.content)
    } catch (err) {
      console.log(err)
    }
  }

  // 게임수락
  const approveGame = async (gameNo, userUid) => {
    try {
      const approve = await baseApi.post(`/games/${gameNo}/approve/${userUid}`)
      if (approve.data) {
        alert('수락 되었습니다')
      }
      const res = await baseApi.get(`games/histories/applygames`)
      setApplyUsers(res.data.content)
    } catch (error) {
      console.log(error)
      alert('수락기간이 지난 글 입니다.')
    }
  }

  // 게임거절
  const cancelGame = async (gameNo, userUid) => {
    if (window.confirm('거절 하시겠습니까?')) {
      try {
        const cancel = await baseApi.post(`/games/${gameNo}/refuse/${userUid}`)

        if (cancel.data) {
          alert('거절 되었습니다')
        }
        const res = await baseApi.get(`games/histories/applygames`)
        setApplyUsers(res.data.content)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      {loading ? (
        <LoadingSpin />
      ) : (
        <div>{clickTab === 1 && <ApplyGames applyGames={applyGames} />}</div>
      )}
    </div>
  )
}

export default Notifications
