import React from 'react'
import Writing from './Writing'
import DetailMain from './DetailMain'
import './Styles/main.scss'

import { Link, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Route path="/writing">
        <Writing />
      </Route>
      <Route path="/" component={DetailMain}>
        <DetailMain />
      </Route>
    </div>
  )
}

export default App
