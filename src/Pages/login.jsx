import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../Components/userForm'
import toast from 'react-hot-toast'
import axiosInstance from '../api/axios'

function Login() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState('')
  const navigate = useNavigate()

  const handleRegister = ()=>{
    if(username.trim().length<=0||password.trim().length<=0){
      setErr('Fill all the fields')
    }else{
      axiosInstance.post('/login',{username,password}).then(res=>{
        console.log(res)
        navigate('/')
      }).catch(err=>{
        if(err?.response?.data?.message){
          toast.error(err?.response?.data?.message||err?.response?.data?.message[0])
        }
        console.log(err);
      })
    }
  }
  return (
    <UserForm isLogin={true} handleSubmit={handleRegister} setPassword={setPassword} err={err} setUsername={setUsername}/>
  )
}

export default Login