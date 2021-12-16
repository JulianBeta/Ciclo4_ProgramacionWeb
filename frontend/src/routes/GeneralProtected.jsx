import { Navigate, Outlet } from 'react-router-dom'

const checkPermit = () => {
  const authorization = localStorage.getItem('Authorization')
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  return authorization && user.status
}

const GeneralProtected = () => {
  const isAuth = checkPermit()
  return isAuth ? <Outlet /> : <Navigate to='/' />
}

export default GeneralProtected
