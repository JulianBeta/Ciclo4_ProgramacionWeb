import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import WelcomeHeader from './WelcomeHeader';

const WelcomePage = () => {
  const [signUp, setSignUp] = useState(false);
  return (
    <Container>
      <WelcomeHeader setSignUp={setSignUp} />
      {signUp ? <SignUpForm /> : <LoginForm />}
    </Container>
  );
};

export default WelcomePage;
