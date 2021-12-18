import { Button, Card, CardActions, CardContent, Grid, List, ListSubheader, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import ListCommits from './ListCommits'
import ListRequests from './ListRequests'
const ProjectInfo = () => {
  const { currentUser } = useContext(GlobalContext)
  const location = useLocation()
  const { project } = location.state
  const navigate = useNavigate()
  const [participants, setParticipants] = useState(project.participants)

  useEffect(() => {
    if (!project) {
      navigate('/home')
    }
  }, [project, navigate])

  const handleClick = async (p) => {
    const newParticipants = participants.map((student) => {
      if (student._id === p._id) {
        student.status === 'Pending' ? (student.status = 'Accepted') : (student.status = 'Pending')
      }
      return student
    })
    await handleFetch(p)
    await setParticipants(newParticipants)
  }

  const handleFetch = async (p) => {
    const endPoint = 'http://localhost:8000/project/updateStatus'
    // find user and take the status from there
    const targetUser = project.participants.find((s) => s.user._id === p.user._id)
    try {
      const payload = {
        _id: project._id,
        user: p.user._id,
        status: targetUser.status,
      }
      const res = await fetch(endPoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization'),
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data) {
        console.log('status updated')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid container justifyContent='space-around'>
      <Grid item key={project._id} xs={12} md={6}>
        <Card variant='outlined'>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              Author: {project.author}
            </Typography>
            <Typography variant='h5' component='div'>
              {project.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>Status: {project.status}</Typography>
            <Typography variant='body2'>Phase: {project.phase}</Typography>
            <Typography sx={{ mt: 1.5 }}>General Objectives: {project.generalObjectives}</Typography>
            <Typography sx={{ mt: 1.5 }}>Specific Objectives: {project.specificObjectives}</Typography>
            <Typography sx={{ mt: 1.5 }}>Initial budget: {project.budget}</Typography>
            {project.commits.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <List subheader="Student's commits:">
                  {project.commits.map((commit) => (
                    <ListCommits commit={commit} key={commit._id} project={project} />
                  ))}
                </List>
              </Box>
            )}
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                navigate(-1)
              }}
              size='small'
            >
              Go back
            </Button>

            {currentUser.rol === 'Admin' && (
              <Link to={`/home/projects/editProject/${project._id}`} state={{ project }}>
                <Button size='small'>Edit</Button>
              </Link>
            )}
          </CardActions>
        </Card>
      </Grid>
      {project.author === currentUser.email && (
        <Grid item>
          <List subheader={<ListSubheader>Participants</ListSubheader>}>
            {participants.map((p) => {
              return <ListRequests p={p} handleClick={handleClick} key={p.user._id} />
            })}
          </List>
        </Grid>
      )}
    </Grid>
  )
}

export default ProjectInfo
