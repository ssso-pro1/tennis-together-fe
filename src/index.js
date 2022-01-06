import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
  document.getElementById('root')
)
