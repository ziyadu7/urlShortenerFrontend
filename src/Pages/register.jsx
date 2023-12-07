import React, { useState } from 'react'
import UserForm from '../Components/userForm'
import axiosInstance from '../api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Register() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState('')
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const handleRegister = ()=>{
    setLoading(true)
    if(username.trim().length<=0||password.trim().length<=0){
      setLoading(false)
      setErr('Fill all the fields')
    }else{
      axiosInstance.post('/register',{username,password}).then(res=>{
        setLoading(false)
        toast.success('Registration successfull, Please login')
        navigate('/login')
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
    <UserForm isLogin={false} handleSubmit={handleRegister} loading={loading} setPassword={setPassword} err={err} setUsername={setUsername}/>
  )
}

export default Register