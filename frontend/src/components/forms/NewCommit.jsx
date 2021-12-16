import SendIcon from '@mui/icons-material/Send'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext'
const NewCommit = () => {
  const [commit, setCommit] = useState({
    title: '',
    content: '',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useContext(GlobalContext)
  const { project } = location.state
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const endPoint = 'http://localhost:8000/project/commit'
      const payload = {
        commit,
        _id: project._id,
        user: currentUser._id,
      }
      const res = await fetch(endPoint, {
        method: 'POST',
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
    }
  }
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={11} md={5}>
            <Typography variant='h4'>New Commit</Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ my: 2 }}>
                <TextField
                  value={commit.title}
                  onChange={(e) => setCommit({ ...commit, title: e.target.value })}
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
                  minRows={4}
                  value={commit.content}
                  onChange={(e) => setCommit({ ...commit, content: e.target.value })}
                  id='content'
                  label='Content'
                  variant='outlined'
                  fullWidth
                  required
                />
              </Box>
              <Button
                sx={{ mr: 3 }}
                onClick={() => {
                  navigate(-1)
                }}
                size='small'
              >
                Go back
              </Button>
              <Button variant='contained' endIcon={<SendIcon />} type='submit'>
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default NewCommit
