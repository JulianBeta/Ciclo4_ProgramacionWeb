const WelcomeHeader = ({ setSignUp }) => {
  return (
    <div>
      <button onClick={() => setSignUp(true)}>sign up</button>
      <button onClick={() => setSignUp(false)}>login</button>
    </div>
  );
};

export default WelcomeHeader;
