import { Button, Card, CardActions, CardContent, Grid, List, Typography } from '@mui/material'

import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import ListRequests from './ListRequests'
const ProjectInfo = () => {
  const { currentUser } = useContext(GlobalContext)
  const location = useLocation()
  const { project } = location.state
  const navigate = useNavigate()
  const [participants, setParticipants] = useState(project.participants)
  console.log(project)
  const handleClick = async (p) => {
    console.log(p)
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
    const endPoint = 'http://localhost:8000/updateParticipant'
    try {
      const payload = {
        _id: project._id,
        user: p.user._id,
        status: p.status,
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
        console.log(data)
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
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Status: {project.status}
            </Typography>
            <Typography variant='body2'>Phase: {project.phase}</Typography>
            <Typography sx={{ mt: 1.5 }} color='text.secondary'>
              General Objectives: {project.generalObjectives}
            </Typography>
            <Typography sx={{ mt: 1.5 }} color='text.secondary'>
              Specific Objectives: {project.specificObjectives}
            </Typography>
            <Typography sx={{ mt: 1.5 }} color='text.secondary'>
              Initial budget: {project.budget}
            </Typography>
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
      {/* conditional render this item, p.author === currentUser.email */}
      <Grid item>
        <List>
          {participants.map((p) => {
            return <ListRequests p={p} handleClick={handleClick} key={p.user._id} />
          })}
        </List>
      </Grid>
    </Grid>
  )
}

export default ProjectInfo
