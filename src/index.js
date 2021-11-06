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

ReactDOM.render(
  <>
    <BrowserRouter>
      <App authService={authService} />
    </BrowserRouter>
  </>,
  document.getElementById('root')
)
