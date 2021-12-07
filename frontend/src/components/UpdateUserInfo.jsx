// HU_003
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import SendIcon from '@mui/icons-material/Send'
import { useNavigate } from 'react-router'

const UpdateUserInfo = () => {
  const { currentUser } = useContext(GlobalContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let timer = setTimeout(() => {
      setError(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      const endPoint = 'http://localhost:8000/updateUser'
      const payload = {
        ...currentUser,
        firstName,
        lastName,
        email,
        password,
      }
      try {
        const res = await fetch(endPoint, {
          method: 'PUT',
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (data) {
          console.log('user updated')
          navigate('/')
          let updatedUser = JSON.stringify(data.data)
          console.log(data.data)
          localStorage.setItem('user', updatedUser)
        }
      } catch (err) {
        console.log(err)
        setError(true)
      }
    } else {
      setError(true)
    }
  }
  return (
    <Box sx={{ my: 4 }}>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={8} md={5}>
          <Typography variant='h4'>Editing {currentUser.firstName}'s info!</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 2 }}>
              <TextField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id='firstName'
                label='First Name'
                variant='outlined'
                fullWidth
                required
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id='lastName'
                label='Last Name'
                variant='outlined'
                fullWidth
                required
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField
                value={email}
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
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                label='Password'
                variant='outlined'
                type='password'
                fullWidth
                required
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id='confirmPassword'
                label='Confirm Password'
                variant='outlined'
                type='password'
                fullWidth
                required
              />
            </Box>
            <Button variant='contained' endIcon={<SendIcon />} type='submit'>
              Submit
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

export default UpdateUserInfo
