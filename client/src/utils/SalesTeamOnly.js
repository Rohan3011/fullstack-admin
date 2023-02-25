import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const SalesTeamOnlyRoute = ({ children }) => {
  const { user, isLoggedIn } = useSelector(state => state.user)
  let location = useLocation()

  if (!user.isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />
  } else if (user.role !== 'sales' && user.role !== 'admin') {
    return <Navigate to='/no-access' state={{ from: location }} replace />
  }
  return children
}

export default SalesTeamOnlyRoute
