// HU_005
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
const EditProject = () => {
  const location = useLocation()
  const { project } = location.state
  const [props, setProps] = useState({ phase: '', status: '' })
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const phaseOptions = ['Development', 'Suspended', 'Completed']
  const statusOptions = ['Pending', 'Accepted', 'Rejected']
  const handleSubmit = async (e) => {
    e.preventDefault()
    const endPoint = 'http://localhost:8000/updateProject'
    if (props.phase && props.status) {
      try {
        const payload = { ...project, ...props }
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
    <Box sx={{ m: 2 }}>
      <Grid container justifyContent='center'>
        <Grid>
          <Typography>Do you want to edit this project's phase, and status?</Typography>
          {project && (
            <form onSubmit={handleSubmit}>
              <Box sx={{ my: 2 }}>
                <Typography>Title: {project.title}</Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography>Author: {project.author}</Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography>Budget: {project.budget}</Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography>
                  Current project's phase: {project.phase} and status: {project.status}
                </Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id='select-phase'>Phase</InputLabel>
                  <Select
                    labelId='select-label'
                    id='phase'
                    value={props.phase}
                    label='Phase'
                    onChange={(e) => setProps({ ...props, phase: e.target.value })}
                  >
                    {phaseOptions.map((option) => (
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
    </Box>
  )
}

export default EditProject
