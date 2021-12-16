import { Button, Grid, Typography } from '@mui/material'

const WelcomeHeader = ({ setSignUp }) => {
  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ mt: 1 }}>
      <Grid item xs={7} md={4}>
        <Typography variant='h4'>AppName</Typography>
      </Grid>
      <Grid item xs={2} md={2}>
        <Button onClick={() => setSignUp(true)}>Sign Up</Button>
        <Button onClick={() => setSignUp(false)}>Login</Button>
      </Grid>
    </Grid>
  )
}

export default WelcomeHeader
