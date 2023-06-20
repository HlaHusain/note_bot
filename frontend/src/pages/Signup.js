import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
const Signup = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [study, setStudy] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const useStyles = makeStyles((theme) => ({
    root: {
      cursor: "pointer",
      color: "white",
      background: "#ED7D31",
      borderRadius: "0.25rem",
      padding: "0.375rem 0.75rem",
      textTransform: "capitalize",
      display: "inline-block",
      boxSizing: "border-box",
      marginTop: "0.5rem",
      '&:hover': {
        background: "#FFA34D",
      },
    },
    formContainer: {
      backgroundColor: '#A5A5A51A',
      padding: '2rem 2.5rem',
      margin: '2rem 0',
      boxShadow: '5px 5px 10px #ccc',
      borderRadius: 4,
      maxWidth: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontFamily: 'Poppins',
      marginBottom: '1.2rem', 
    },
    input: {
      background: "white"
    }
  }));

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return; //if there is no name or email
    setUser({ name: name, email: email, study: study, password: password });
    console.log(name, email);
    navigate('/dashboard');
  };


  return (

<Box sx=
{{display: 'flex',flexDirection:{sm:'column',md:'row'} ,
justifyContent:'center',
alignItems: 'center',
}}>
      <Box sx={{ maxWidth: '100%', height: 'auto' ,display: {xs:'none',sm:'block'}}}>
        <img src={require("../assets/sign-up.gif")} alt="singup" className="singup-img" loading='lazy' />
      </Box>

        <Box className={classes.formContainer}>
          <Typography variant="h5" className={classes.heading}> Sign Up </Typography>


          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField  InputProps={{ className: classes.input }}
              variant='outlined'
              margin="normal"
              required
              fullWidth
              name="name"
              label="User Name"
              type="text"
              id="name"
              autoComplete="name"
              size='small'
              autoFocus
              value={name}
              sx={{ backgroundColor: 'white'}}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField  InputProps={{ className: classes.input }}
              variant='outlined'

              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              size='small'
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />

            <TextField  InputProps={{ className: classes.input }}
              variant='outlined'
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="text"
              id="mail"
              size='small'
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
            <TextField  InputProps={{ className: classes.input }}
              variant='outlined'
              margin="normal"
              required
              fullWidth
              name="study"
              label="Study Field"
              type="text"
              id="study"
              size='small'
              autoComplete="your study field"
              value={study}
              onChange={(e) => setStudy(e.target.value)}

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={classes.root}
            >
              Sign up
            </Button>
          </Box>
        </Box>

      </Box>
  );
};
export default Signup;
