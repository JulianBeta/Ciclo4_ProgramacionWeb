// HU_005
// HU_011
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
const EditUserProps = () => {
  const location = useLocation()
  const { user } = location.state
  const [props, setProps] = useState({ rol: '', status: '' })
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const rolOptions = ['Leader', 'Teacher', 'Student']
  const statusOptions = ['Pending', 'Accepted', 'Rejected']
  const handleSubmit = async (e) => {
    e.preventDefault()
    const endPoint = 'http://localhost:8000/user/update'
    if (props.rol && props.status) {
      try {
        const payload = { ...user, ...props }
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
          navigate(-1)
        }
      } catch (err) {
        console.log(err)
        setError(true)
      }
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      setError(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [error])
  return (
    <Grid container justifyContent='center'>
      <Grid>
        <Typography>Do you want to edit this user's rol and status?</Typography>
        {user && (
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 2 }}>
              <Typography>Name: {user.firstName}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography>Surname: {user.lastName}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography>Email: {user.email}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography>
                Current user's rol: {user.rol} and status: {user.status}
              </Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <FormControl fullWidth>
                <InputLabel id='select-rol'>Rol</InputLabel>
                <Select
                  labelId='select-label'
                  id='rol'
                  value={props.rol}
                  label='Rol'
                  onChange={(e) => setProps({ ...props, rol: e.target.value })}
                >
                  {rolOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ my: 2 }}>
              <FormControl fullWidth>
                <InputLabel id='select-status'>Status</InputLabel>
                <Select
                  labelId='select-label'
                  id='status'
                  value={props.status}
                  label='Status'
                  onChange={(e) => setProps({ ...props, status: e.target.value })}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              sx={{ mr: 2 }}
              onClick={() => {
                navigate(-1)
              }}
              size='small'
            >
              Go back
            </Button>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </form>
        )}
        {error && (
          <Box sx={{ mt: 2 }}>
            <Typography align='center' color='error'>
              Error: Verify your credentials
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default EditUserProps
