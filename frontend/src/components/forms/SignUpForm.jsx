//HU_001
import SendIcon from '@mui/icons-material/Send'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'

const SignUpForm = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('')
  const options = ['Student', 'Leader', 'Admin']
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const clearForm = () => {
    setName('')
    setSurname('')
    setEmail('')
    setPassword('')
    setRol('')
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      setError(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endPoint = 'http://localhost:8000/signup'
    const payload = {
      firstName: name,
      lastName: surname,
      email,
      password,
      rol,
    }
    try {
      const res = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      console.log(data)
      if (data) {
        clearForm()
        setSuccess(true)
      }
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }
  return (
    <Box sx={{ my: 4 }}>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={8} md={5}>
          <Typography variant='h4'>Welcome aboard!</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 2 }}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='firstName'
                label='Name'
                variant='outlined'
                fullWidth
                required
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                id='lastName'
                label='Surname'
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
              <FormControl fullWidth>
                <InputLabel id='select-label'>Rol</InputLabel>
                <Select
                  error={error}
                  labelId='select-label'
                  id='rol'
                  value={rol}
                  label='Rol'
                  onChange={(e) => setRol(e.target.value)}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          {success && (
            <Box sx={{ mt: 2 }}>
              <Typography align='center' color='green'>
                Account successfully created! You may login now.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignUpForm
