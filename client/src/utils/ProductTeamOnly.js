import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProductTeamOnlyRoute = ({ children }) => {
  const { user } = useSelector(state => state.user)
  let location = useLocation()

  if (!user.isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />
  } else if (user.role !== 'product' && user.role !== 'admin') {
    return <Navigate to='/no-access' state={{ from: location }} replace />
  }
  return children
}

export default ProductTeamOnlyRoute
