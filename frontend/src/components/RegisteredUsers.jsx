// HU_004
//
import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RegisteredUsers = () => {
  const [users, setUsers] = useState()
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async (e) => {
    const endPoint = 'http://localhost:8000/allUsers'
    try {
      const res = await fetch(endPoint)
      const data = await res.json()
      if (!data) {
        // setError(true)
      } else {
        console.log(data.data)
        setUsers(data.data)
      }
    } catch (err) {
      console.log(err)
      // setError(true)
    }
  }
  return (
    <Grid container spacing={1}>
      {users &&
        users.map((user) => (
          <Grid item key={user._id} xs={12} md={2}>
            <Card sx={{ minWidth: 275 }}>
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
                <Link to={`/edit/${user._id}`}>
                  <Button size='small'>More</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default RegisteredUsers