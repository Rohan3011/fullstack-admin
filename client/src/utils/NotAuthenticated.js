const { useSelector } = require('react-redux')
const { Navigate, useLocation } = require('react-router-dom')

const NotAuthenticated = ({ children }) => {
  const { user } = useSelector(state => state.user)
  let location = useLocation()

  if (user && user.isLoggedIn) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />
  }
  return children
}

export default NotAuthenticated
