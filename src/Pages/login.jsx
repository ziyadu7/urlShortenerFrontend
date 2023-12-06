import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()
  return (
    <div className="">
    <div className=" min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className=" px-6 py-8 rounded shadow-md w-full">
          <h1 className="mb-8 text-3xl text-center">User Login</h1>

         <div className='text-black'>
         <input
            type="text"
            onChange={(e) => ''}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="username" />

          <input
            type="password"
            onChange={(e) => ''}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password" />
         </div>
          <div className='felx justify-center'>
            <p className='text-red-600 text-center'>{''}</p>
          </div>
          <p className='text-center text-blue-600 cursor-pointer' onClick={() => navigate('/register')}>Don't have an account ?</p>
          <button
            type="button"
            onClick={() => ''}
            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >Login Account</button>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Login