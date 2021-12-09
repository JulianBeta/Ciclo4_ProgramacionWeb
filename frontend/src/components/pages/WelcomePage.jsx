import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import LoginForm from '../forms/LoginForm'
import SignUpForm from '../forms/SignUpForm'
import WelcomeHeader from '../WelcomeHeader'

const WelcomePage = () => {
  const [signUp, setSignUp] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem('Authorization')
    const user = localStorage.getItem('user')
    if (auth && user) {
      navigate('/home')
    } else {
      localStorage.clear()
    }
  })
  return (
    <Container>
      <WelcomeHeader setSignUp={setSignUp} />
      {signUp ? <SignUpForm /> : <LoginForm />}
    </Container>
  )
}

export default WelcomePage
