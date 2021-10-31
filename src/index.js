import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'
import AuthService from './service/authService'

const authService = new AuthService()

ReactDOM.render(
  <>
    <BrowserRouter>
      <App authService={authService} />
    </BrowserRouter>
  </>,
  document.getElementById('root')
)
