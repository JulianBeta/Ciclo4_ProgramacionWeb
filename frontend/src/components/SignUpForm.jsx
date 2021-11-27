import SendIcon from '@mui/icons-material/Send';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const options = ['Student', 'Leader', 'Teacher'];

  const clearForm = () => {
    setName('');
    setSurname('');
    setEmail('');
    setPassword('');
    setRol('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endPoint = 'http://localhost:8000/signup';
    const payload = {
      firstName: name,
      lastName: surname,
      email,
      password,
      rol,
    };
    try {
      await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      clearForm();
    } catch (err) {
      console.log(err);
    }
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
            <FormControl fullWidth>
              <InputLabel id='select-label'>Rol</InputLabel>
              <Select
                labelId='select-label'
                id='rol'
                value={rol}
                label='Rol'
                onChange={(e) => setRol(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
