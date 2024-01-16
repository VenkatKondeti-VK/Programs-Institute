import React, {useState, useEffect} from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('userInfo'))

  return (
      currentUser ? <Outlet /> : <Navigate to="/signin" />
  )
}

export default PrivateRoute
