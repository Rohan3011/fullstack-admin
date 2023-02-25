import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { themeSettings } from './theme'
import Layout from './scenes/layout'
import Dashboard from './scenes/dashboard'
import Products from './scenes/products'
import Customers from './scenes/customers'
import Transactions from './scenes/transactions'
import Geography from './scenes/geography'
import Overview from './scenes/overview'
import Daily from './scenes/daily'
import Monthly from './scenes/monthly'
import Breakdown from './scenes/breakdown'
import Admin from './scenes/admin'
import Performance from './scenes/performance'
import Login from './scenes/auth/Login'
import Register from 'scenes/auth/Register'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'redux/store'
import AdminOnlyRoute from 'utils/AdminOnly'
import SalesTeamOnlyRoute from 'utils/SalesTeamOnly'
import ProductTeamOnlyRoute from 'utils/ProductTeamOnly'
import NotFound from 'scenes/404/NotFound'
import NotAuthenticated from 'utils/NotAuthenticated'
import NoAccess from 'scenes/404/NoAccess'
import ProtectedRoute from 'utils/ProtectedRoute'

function App () {
  return (
    <div className='app'>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <AppWrapper />
        </ReduxProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

function AppWrapper () {
  const mode = useSelector(state => state.theme.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/products' element={<Products />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/geography' element={<Geography />} />

          <Route path='/overview' element={<Overview />} />
          <Route path='/daily' element={<Daily />} />
          <Route path='/monthly' element={<Monthly />} />
          <Route path='/breakdown' element={<Breakdown />} />

          <Route element={<AdminOnlyRoute />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/performance' element={<Performance />} />
          </Route>
        </Route>

        <Route
          path='/login'
          element={
            <NotAuthenticated>
              <Login />
            </NotAuthenticated>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/no-access' element={<NoAccess />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}
