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
        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/geography' element={<Geography />} />
          <Route path='/overview' element={<Overview />} />
          <Route path='/daily' element={<Daily />} />
          <Route path='/monthly' element={<Monthly />} />
          <Route path='/breakdown' element={<Breakdown />} />
          <Route
            path='/admin'
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route
            path='/performance'
            element={
              <AdminOnlyRoute>
                <Performance />
              </AdminOnlyRoute>
            }
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route
          path='/register'
          element={
            <AdminOnlyRoute>
              <Register />
            </AdminOnlyRoute>
          }
        />
        <Route path='*' element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </ThemeProvider>
  )
}
