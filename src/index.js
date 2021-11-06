import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'
import AuthService from './service/authService'
import firebaseApp from 'service/firebase'
import AuthState from 'service/authState'
import GetPost from 'service/getPost'
import axios from 'axios'

const authService = new AuthService()

/*
const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  // params: { key: process.env.REACT_APP_FIREBASE_API_KEY }, //키 헤더에 넣나..?
})

// axios.get('http://localhost:3000/users').then((res) => console.log(res.data))

// const getPost = new GetPost(httpClient)
*/

ReactDOM.render(
  <>
    <BrowserRouter>
      <App authService={authService} />
    </BrowserRouter>
  </>,
  document.getElementById('root')
)
