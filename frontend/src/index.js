import {React} from 'react';
import ReactDOM from 'react-dom'
import SongPage from './pages/songPage';
import FormPage from './pages/formpage'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'


function App() {

  let { id } = useParams()
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path = '/'>
          <FormPage />
      </Route>
      <Route path = '/song/:id'>
          <SongPage></SongPage>
      </Route>
    </Switch>
  </Router>,
document.getElementById('root')
);