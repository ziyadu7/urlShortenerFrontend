import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UrlsPage from './Pages/urlsPage'
import Login from './Pages/login'
import Register from './Pages/register'

function App() {

  return (
    <Router>
    <Routes>
      <Route path='/' element = {<UrlsPage/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>
    </Routes>
  </Router>
  )
}

export default App
