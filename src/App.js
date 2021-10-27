import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ListPage from './components/ListPage/ListPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <ListPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
