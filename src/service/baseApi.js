import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
})

instance.defaults.headers.common['Authorization'] =
  localStorage.getItem('token') && `Bearer ${localStorage.getItem('token')}`

export default instance
