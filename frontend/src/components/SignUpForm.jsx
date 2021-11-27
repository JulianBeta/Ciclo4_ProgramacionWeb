import SendIcon from '@mui/icons-material/Send';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearForm = () => {
    setName('');
    setSurname('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch POST
    console.log('submitted', name, surname, email, password);
    clearForm();
  };
  return (
    <Container>
      <Box>
        <Typography variant='h5'>
          Welcome! Please fill in the form to sign up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='firstName'
              label='Name'
              variant='outlined'
              fullWidth
              required
            />
            <TextField
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              id='lastName'
              label='Surname'
              variant='outlined'
              fullWidth
              required
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              label='Email'
              variant='outlined'
              required
              fullWidth
              type='email'
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              label='Password'
              variant='outlined'
              type='password'
              fullWidth
              required
            />
            {/* select */}
            <Button variant='contained' endIcon={<SendIcon />} type='submit'>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpForm;
