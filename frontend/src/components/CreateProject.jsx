import SendIcon from '@mui/icons-material/Send'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'

const CreateProject = () => {
  const [project, setProject] = useState({
    title: '',
    generalObjectives: '',
    specificObjectives: '',
    author: {},
    phase: '',
    budget: '',
    status: 'Pending',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const phaseOptions = ['Development', 'Suspended', 'Completed']
  const handleSubmit = async () => {}
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
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id='select-label'>Phase</InputLabel>
                  <Select
                    error={error}
                    labelId='select-label'
                    id='rol'
                    value={project.phase}
                    onChange={(e) => setProject({ ...project, phase: e.target.value })}
                    label='Phase'
                  >
                    {phaseOptions.map((option) => (
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
    </>
  )
}

export default CreateProject
