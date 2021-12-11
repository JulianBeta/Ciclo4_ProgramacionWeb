// HU_006
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { GlobalContext } from '../context/GlobalContext'

const ListAllProjects = () => {
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()
  const { currentUser } = useContext(GlobalContext)
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const endPoint = 'http://localhost:8000/getProjects'
    try {
      const res = await fetch(endPoint, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          'Content-Type': 'application/json',
        },
      })
      if (res.status === 401) {
        localStorage.clear()
        navigate('/')
      }
      const data = await res.json()
      if (data) {
        setProjects(data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleJoin = async (_id, user) => {
    const endPoint = 'http://localhost:8000/pushUser'
    try {
      const res = await fetch(endPoint, {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id, user }),
      })
      const data = await res.json()
      if (data) {
        console.log(data)
        fetchProjects()
      }
    } catch (err) {
      console.log(err)
    }
  }
  console.log(projects)
  return (
    <Container>
      <Grid container spacing={1}>
        {projects &&
          projects.map((project) => {
            const exist = project.participants.find((p) => p.user._id === currentUser._id)
            return (
              <Grid item key={project._id} xs={12} md={3}>
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
                  </CardContent>
                  <CardActions>
                    <Link to={`/home/projects/projectInfo/${project._id}`} state={{ project }}>
                      <Button size='small'>More info</Button>
                    </Link>
                    <Link to={`/home/projects/editProject/${project._id}`} state={{ project }}>
                      <Button size='small'>Edit</Button>
                    </Link>
                    {!exist ? (
                      <Button size='small' onClick={() => handleJoin(project._id, currentUser._id)}>
                        <AddIcon />
                      </Button>
                    ) : (
                      <CheckCircleIcon />
                    )}
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
      </Grid>
    </Container>
  )
}

export default ListAllProjects
