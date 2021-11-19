import React, { useContext } from 'react'
import { UserContext } from '../../service/authState'
import { useHistory } from 'react-router'
import axios from 'axios'
import styled from 'styled-components'
import ReviewList from './ReviewList'

const PopUpProfile = (props) => {
  const history = useHistory()
  history.push('/popup')

  const { user } = useContext(UserContext)

  //   const uid = user.uid
  //   /users/{userUid}

  //   console.log(user.uid)

  //   (`/users/${user.uid}`)
  //   axios.get(`/users/${user.uid}`).then((response) => {
  //     console.log(response.data)
  //   })

  //   axios
  //     .get(`/reviews`, {
  //       params: { recipientUid: uid },
  //     })
  //     .then((response) => {
  //       console.log(response.data)
  //     })

  const Profile = styled.div``

  return <ReviewList />
}

export default PopUpProfile
