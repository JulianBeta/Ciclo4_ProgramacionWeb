// HU_005
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
const EditMyProject = () => {
  const location = useLocation()
  const { project } = location.state
  const [props, setProps] = useState({
    title: project.title,
    generalObjectives: project.generalObjectives,
    specificObjectives: project.specificObjectives,
    budget: project.budget,
  })
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const endPoint = 'http://localhost:8000/project/update'
    if (props.title && props.generalObjectives && props.specificObjectives && props.budget) {
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
    <Box>
      <Grid container justifyContent='center'>
        <Grid item xs={10} md={6}>
          <Typography>Do you want to edit your project?</Typography>
          {project && (
            <form onSubmit={handleSubmit}>
              <Box sx={{ my: 1.5 }}>
                <TextField
                  value={props.title}
                  placeholder='Title'
                  required
                  fullWidth
                  onChange={(e) => {
                    setProps({ ...props, title: e.target.value })
                  }}
                />
              </Box>
              <Box sx={{ my: 1.5 }}>
                <TextField
                  value={props.generalObjectives}
                  placeholder='General Objectives'
                  multiline
                  minRows={3}
                  fullWidth
                  required
                  onChange={(e) => {
                    setProps({ ...props, generalObjectives: e.target.value })
                  }}
                />
              </Box>
              <Box sx={{ my: 1.5 }}>
                <TextField
                  value={props.specificObjectives}
                  placeholder='Specific Objectives'
                  fullWidth
                  multiline
                  minRows={3}
                  required
                  onChange={(e) => {
                    setProps({ ...props, specificObjectives: e.target.value })
                  }}
                />
              </Box>
              <Box sx={{ my: 1.5 }}>
                <TextField
                  value={props.budget}
                  placeholder='Budget'
                  required
                  fullWidth
                  onChange={(e) => {
                    setProps({ ...props, budget: e.target.value })
                  }}
                />
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

export default EditMyProject
