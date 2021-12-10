// HU__12
import SendIcon from '@mui/icons-material/Send'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'

const CreateProject = () => {
  const { currentUser } = useContext(GlobalContext)
  const navigate = useNavigate()
  const [project, setProject] = useState({
    title: '',
    generalObjectives: '',
    specificObjectives: '',
    budget: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endPoint = 'http://localhost:8000/newProject'
    const payload = {
      ...project,
      author: currentUser.email,
    }
    try {
      const res = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization'),
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data) {
        setSuccess(true)
        navigate('/home')
      }
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={8} md={5}>
            <Typography variant='h4'>New Project</Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ my: 2 }}>
                <TextField
                  value={project.title}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                  id='title'
                  label='Title'
                  variant='outlined'
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <TextField
                  multiline
                  minRows={3}
                  value={project.generalObjectives}
                  onChange={(e) => setProject({ ...project, generalObjectives: e.target.value })}
                  id='generalObjectives'
                  label='General Objectives'
                  variant='outlined'
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <TextField
                  multiline
                  minRows={3}
                  value={project.specificObjectives}
                  onChange={(e) => setProject({ ...project, specificObjectives: e.target.value })}
                  id='specificObjectives'
                  label='Specific Objectives'
                  variant='outlined'
                  required
                  fullWidth
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <TextField
                  value={project.budget}
                  onChange={(e) => setProject({ ...project, budget: e.target.value })}
                  id='budget'
                  label='Budget'
                  variant='outlined'
                  required
                  fullWidth
                  type='number'
                />
              </Box>
              <Button variant='contained' endIcon={<SendIcon />} type='submit'>
                Submit
              </Button>
            </form>
            {error && (
              <Box sx={{ mt: 2 }}>
                <Typography align='center' color='error'>
                  Error: Verify your inputs
                </Typography>
              </Box>
            )}
            {success && (
              <Box sx={{ mt: 2 }}>
                <Typography align='center' color='green'>
                  Project successfully created!
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CreateProject
