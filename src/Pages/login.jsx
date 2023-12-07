import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../Components/userForm'
import toast from 'react-hot-toast'
import axiosInstance from '../api/axios'
import { useAuth } from '../context/authContext'

function Login() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [err,setErr] = useState('')
  const navigate = useNavigate()
  const {login} = useAuth()

  const handleRegister = ()=>{
    setLoading(true)
    if(username.trim().length<=0||password.trim().length<=0){
      setLoading(false)
      setErr('Fill all the fields')
    }else{
      axiosInstance.post('/login',{username,password}).then(res=>{
        setLoading(false)
        login(res?.data?.token)
        navigate('/')
      }).catch(err=>{
        setLoading(false)
        if(err?.response?.data?.message){
          toast.error(err?.response?.data?.message||err?.response?.data?.message[0])
        }else if(err?.message){
          toast.error(err?.message)
        }
        console.log(err);
      })
    }
  }
  return (
    <UserForm isLogin={true} handleSubmit={handleRegister} loading={loading} setPassword={setPassword} err={err} setUsername={setUsername}/>
  )
}

export default Login