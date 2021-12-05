import { Button, Grid, Typography } from '@mui/material'

const WelcomeHeader = ({ setSignUp }) => {
  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ mt: 2 }}>
      <Grid item xs={7} md={4}>
        <Typography variant='h4'>AppName</Typography>
      </Grid>
      <Grid item xs={4} md={4}>
        <Button onClick={() => setSignUp(true)}>Sign Up</Button>
        <Button onClick={() => setSignUp(false)}>Login</Button>
      </Grid>
    </Grid>
  )
}

export default WelcomeHeader
