import React from 'react'
import { Navigate, Route } from 'react-router-dom'

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem('isLogin')
  console.log('this', isAuthenticated)

  return (
    <Route {...restOfProps} render={(props) => (isAuthenticated ? <Component {...props} /> : <Navigate to='/' />)} />
  )
}

export default ProtectedRoute
