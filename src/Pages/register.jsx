import React, { useState } from 'react'
import UserForm from '../Components/userForm'

function Register() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState('')


  return (
    <UserForm isLogin={false}/>
  )
}

export default Register