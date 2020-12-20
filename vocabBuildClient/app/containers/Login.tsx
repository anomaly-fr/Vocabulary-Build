/* eslint-disable promise/always-return */
/* eslint-disable prettier/prettier */
import {
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  Grid,
  Paper,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import HomePage from './HomePage';
import 'fontsource-roboto';
import { Theme } from '../constants/theme';
import { myConsole } from '../constants/constants';


const theme = Theme;
const Login = () => {
  const history = useHistory();
  const [account, hasAccount] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpassword, setCPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message,setMessage] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const classes = useStyles();

  const createAccount = () => {
    // myConsole.log(name)
    // myConsole.log(email)
    // myConsole.log(password)
    Axios.post('http://localhost:3000/api/register', {
      email,
      name,
      password,
    })
      .then((response) => {
        myConsole.log(`resp ${response}`);
        history.push('/home');
      })
      .catch((error) => {
        myConsole.log(`Error ${error}`);
      });
  };
  const login = () => {

    Axios.get(`http://localhost:3000/api/login/${email}`)
      .then((response) => {
     myConsole.log(response)
    //  if(response.data == null || response.data === undefined)
     if(password !== response.data.password)
     setMessage('Password incorrect');
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };
 useEffect(() => {


 },[])
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" className={classes.root}>
        <Grid container direction="row" className={classes.main}>
          <Grid item xs={false} sm={4} md={7}>
            <Paper elevation={0} variant="outlined">
              <Typography
                className={classes.text}
                variant="h4"
                component="h5"
                align="center"
              >
                Vocab Builder
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                {account ? 'Sign In' : 'Sign Up'}
              </Typography>
              <form className={classes.form} noValidate>
                {!account ? (
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                ) : null}
                <TextField
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                {!account ? (
                  <Grid container direction="column">
                    <Grid container>
                      <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={cpassword}
                        onChange={(event) => setCPassword(event.target.value)}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
                           myConsole.log('Register')
              //            createAccount();
                        }}
                        className={classes.submit}
                      >
                        Create Account
                      </Button>
                    </Grid>

                    <Grid container>
                      <Button
                        style={{ fontSize: 14 }}
                        onClick={() => hasAccount(true)}
                        variant="text"
                      >
                        Login to existing account
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container direction="column">
                    <Grid container>
                      <Button
                        style={{ flex: 1 }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
      if(email === '' || password === ''){
      setMessage('Please enter all fields');


    }else{
      login();

    }
                        }}
                      >
                        Sign In
                      </Button>
                      <Grid container style={{margin: '2%'}}>
                        <Typography style={{color: 'red'}}>{message}</Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Button
                        style={{ fontSize: 14 }}
                        onClick={() => hasAccount(false)}
                        variant="text"
                      >
                        Create a new account
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </form>
            </div>
          </Grid>

          {/* <Typography variant='h4'>Login</Typography> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const useStyles = makeStyles({
  root: {
    height: '100vh',
    background: 'linear-gradient(to bottom, #ff9966, #ff5e62)',
    alignItems: 'center',
    justifyContent: 'center',
    //  alignSelf: 'center'
  },
  main: {
    height: '90vh',
    width: '95vw',
    margin: '3%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    margin: '5%',
    borderWidth: 0.5,
    fontWeight: 'bold',
    // color : '#6F47A7'
  },
  paper: {
    margin: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '10%',
  },
  submit: {
    margin: '10%',
    alignSelf: 'center',
  },
});

export default Login;
