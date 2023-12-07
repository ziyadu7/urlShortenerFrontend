import {BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom'
import UrlsPage from './Pages/urlsPage'
import Login from './Pages/login'
import Register from './Pages/register'
import { useAuth } from './context/authContext'

function App() {

  const {token} = useAuth()

  return (
    <Router>
    <Routes>
      <Route path='/' element = {token!='null'?<UrlsPage/>:<Navigate to={'/login'}/>}/>
      <Route path='/login' element = {token!='null'?<Navigate to={'/'}/>:<Login/>}/>
      <Route path='/register' element = {token!='null'?<Navigate to={'/'}/>:<Register/>}/>
    </Routes>
  </Router>
  )
}

export default App
