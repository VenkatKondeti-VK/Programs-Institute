import React, { useState, useEffect } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

function Header({viewDashboard, setViewDashboard}) {
  const navigate = useNavigate()
  const [time, setTime] = useState('')
  
  const updateTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()

    // Add leading zeros to minutes and seconds
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    // Create a string representing the current time
    const currentTimeString = `${hours}:${formattedMinutes}`
    setTime(currentTimeString)
  }

  useEffect(() => {
    updateTime()
  }, [])

  setInterval(updateTime, 60000)

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/signin')
  }

  return (
    <div className='bg-black h-14 flex items-center justify-between'>

      <div className='flex gap-5 px-4' onClick={() => {setViewDashboard(!viewDashboard)}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <div className='bg-white w-20'>
          <h1 className='text-center'>Logo</h1>
        </div>
      </div>

      <div className='flex gap-5 px-4'>
        <div className='bg-white w-full rounded-xl flex gap-2 px-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h1 className='text-center'>Admin</h1>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
          <h1>{time}</h1>
        </div>

        <div className='bg-white rounded-xl px-3 hover:bg-red-400' onClick={handleSignOut}>
          <h1 className='text-center'>SingOut</h1>
        </div>
      </div>

    </div>
  )
}

export default Header
