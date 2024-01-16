import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)

  const handleEyeClick = () => {
    setVisible(!visible)
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
  
      const userData = await res.json()
      const userDataString = JSON.stringify(userData)
      
      localStorage.setItem('userInfo', userDataString)
      navigate('/')
    } 
    catch (error) {
      setError(error.message)
    }
  
  }



  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7'>Admin Sign In</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input 
          name='email' 
          type='email' 
          placeholder='Email' 
          className='border p-3 rounded-lg'
          onChange={handleChange}
          required
          >
        </input>

        <div className='border p-3 rounded-lg flex justify-between'>
          <input 
            name='password' 
            type={!visible ? 'password' : 'text'} 
            placeholder='Password' 
            className='w-full'
            onChange={handleChange}
            required
            >
          </input>

          <div>
            {!visible && <svg onClick={handleEyeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>}

            {visible && <svg onClick={handleEyeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>}
          </div>
          
        </div>
        
        <button 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75'>
          Sign In
        </button>

        {error && <p className='text-red-600'>{error}</p>}

      </form>
      
    </div>
  )
}

export default SignIn
