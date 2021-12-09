// HU_004
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

const ListAllUsers = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      const endPoint = 'http://localhost:8000/allUsers'
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
          setUsers(data.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers()
  }, [navigate])

  return (
    <Container>
      <Grid container spacing={1}>
        {users &&
          users.map((user) => (
            <Grid item key={user._id} xs={12} md={3}>
              <Card variant='outlined'>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {user.email}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    {user.status}
                  </Typography>
                  <Typography variant='body2'>{user.rol}</Typography>
                </CardContent>
                <CardActions>
                  {/* pass the whole user through the Link */}
                  <Link to={`/home/users/editUser/${user._id}`} state={{ user }}>
                    <Button size='small'>More</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default ListAllUsers
