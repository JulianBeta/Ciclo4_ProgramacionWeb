// HU_014
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../context/GlobalContext'

const MyProjects = () => {
  const { currentUser } = useContext(GlobalContext)
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      const endPoint = 'http://localhost:8000/project/projects'
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
          const myProjects = data.data.filter((p) => p.author === currentUser.email)
          setProjects(myProjects)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchProjects()
  }, [navigate, currentUser.email])

  return (
    <Container>
      <Grid container spacing={1}>
        {projects &&
          projects.map((project) => (
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
                  {project.status === 'Accepted' && (
                    <Link to={`/home/projects/editMy/${project._id}`} state={{ project }}>
                      <Button size='small'>Edit</Button>
                    </Link>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default MyProjects
