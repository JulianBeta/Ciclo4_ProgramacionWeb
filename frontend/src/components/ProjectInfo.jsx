import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const ProjectInfo = () => {
  const location = useLocation()
  const { project } = location.state
  const navigate = useNavigate()
  console.log(project)
  return (
    <Grid container justifyContent='center'>
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
            <Link to={`/editProject/${project._id}`} state={{ project }}>
              <Button size='small'>Edit</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProjectInfo
