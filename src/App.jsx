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
      <Route path='/' element = {token!='undefined'?<UrlsPage/>:<Navigate to={'/login'}/>}/>
      <Route path='/login' element = {token!='undefined'?<Navigate to={'/'}/>:<Login/>}/>
      <Route path='/register' element = {token!='undefined'?<Navigate to={'/'}/>:<Register/>}/>
    </Routes>
  </Router>
  )
}

export default App
