import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import BookDetailsRoute from './components/BookDetailsRoute'
import Notfound from './components/Notfound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path='/login' component={LoginForm} />
    <ProtectedRoute exact path='/' component={Home} />
    <ProtectedRoute exact path='/shelf' component={Bookshelves} />
    <ProtectedRoute exact path='/books/:id' component={BookDetailsRoute} />
    <Route exact path='/bad-path' component={Notfound} />
    <Redirect to='bad-path' />
  </Switch>
)

export default App
