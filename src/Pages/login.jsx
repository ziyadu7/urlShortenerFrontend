import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../Components/userForm'

function Login() {

  return (
    <UserForm isLogin={true}/>
  )
}

export default Login