import { Button } from '@mui/material'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../context/GlobalContext'

const LogoutButton = () => {
  const { setCurrentUser } = useContext(GlobalContext)
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    setCurrentUser({})
    navigate('/')
  }
  return (
    <>
      <Button onClick={handleClick}>Log out</Button>
    </>
  )
}

export default LogoutButton
