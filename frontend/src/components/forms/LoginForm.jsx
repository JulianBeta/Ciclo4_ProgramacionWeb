import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../../context/GlobalContext'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  // globalContext
  const { setCurrentUser } = useContext(GlobalContext)

  useEffect(() => {
    let timer = setTimeout(() => {
      setError(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endPoint = 'http://localhost:8000/login'
    const payload = { email, password }
    try {
      const res = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!data) {
        setError(true)
      } else {
        console.log(data.data)
        navigate('/home')
        setCurrentUser(data.data)
      }
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }
  return (
    <Box sx={{ my: 4 }}>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={8} md={4}>
          <Typography variant='h4'>Welcome back!</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 2 }}>
              <TextField
                value={email}
                error={error}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                label='Email'
                variant='outlined'
                required
                fullWidth
                type='email'
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField
                value={password}
                error={error}
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                label='Password'
                variant='outlined'
                type='password'
                fullWidth
                required
              />
            </Box>

            <Button variant='contained' type='submit'>
              Login
            </Button>
          </form>
          {error && (
            <Box sx={{ mt: 2 }}>
              <Typography align='center' color='error'>
                Error: Verify your credentials
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginForm
