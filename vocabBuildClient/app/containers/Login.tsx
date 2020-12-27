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
import 'fontsource-roboto';
import { Theme } from '../constants/theme';
import { myConsole } from '../constants/constants';

const theme = Theme;
interface Props {
  setLogged : (log : number) => void
}
const Login : React.FC<Props> = () => {
  const history = useHistory();
  const [account, hasAccount] = useState(true);
  const [userEmail, setEmail] = useState<string>('');
  const [tutorEmail,setTutorEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpassword, setCPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [instructor,isInstructor] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const classes = useStyles();



  const createTutorAccount = () => {
    // myConsole.log(name)
    // myConsole.log(email)
    // myConsole.log(password)
    Axios.post('http://localhost:3000/api/registerTutor', {
      tutorEmail,
      name,
      password,
    })
      .then((response) => {
        setMessage('Successful')
        hasAccount(true);
        return myConsole.log(`resp ${response.data}`);
        //   history.push('/home');
      })
      .catch((error) => {
        myConsole.log(`Error ${error}`);
      });
  };


  const createAccount = () => {
    // myConsole.log(name)
    // myConsole.log(email)
    // myConsole.log(password)
    Axios.post('http://localhost:3000/api/register', {
      email: userEmail,
      name,
      password,
    })
      .then((response) => {
        setMessage('Successful')
        hasAccount(true);
        return myConsole.log(`resp ${response.data}`);
        //   history.push('/home');
      })
      .catch((error) => {
        myConsole.log(`Error ${error}`);
      });
  };
  const login = () => {
    setMessage('Logging in');
    Axios.get(`http://localhost:3000/api/login/${userEmail}`)
      .then((response) => {
        myConsole.log(`Login response ${JSON.stringify(response.data[0])}`)
        if(response.data[0] === undefined){
          setMessage('User not found')
          return;
        }
        // eslint-disable-next-line promise/always-return
        if(response.data[0].password !== password){
          setMessage('Password incorrect')
     }
     else {
       history.push({
       pathname: '/home',
       state: {
          name : response.data[0].name,
          email : response.data[0].email,
          userType : 'tutee'
       }})
      //  setLogged(1);
      //  myConsole.log("Wha")
     }
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };
  const loginTutor = () => {
    setMessage('Logging in');
    Axios.get(`http://localhost:3000/api/loginTutor/${tutorEmail}`)
      .then((response) => {
        myConsole.log(`"RESPONSE "+${response.data[0]}`);
        if(response.data[0] === undefined)
        setMessage('User not found');
        // eslint-disable-next-line promise/always-return
        if(response.data[0].password !== password){
          setMessage('Password incorrect')
     }
     else {
       myConsole.log("What")
       history.push({
       pathname: '/home',
       state: {
          name : response.data[0].name,
          email : response.data[0].tutor_email,
          userType : 'tutor'

       }})
        //setLogged(1);
      //  myConsole.log("Wha")
     }
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };
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

              <FormControlLabel

        control={
          <Checkbox
            checked={instructor}
            onChange={() => {
              isInstructor(!instructor);
            }}
            name="checkedB"
            color="primary"
          />
        }
        label="Instructor?"
      />



              <form
                className={classes.form}
                onSubmit={() => {
                  myConsole.log('mdmdm');
                }}
              >
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
                  value={instructor ? tutorEmail : userEmail}
                  onChange={(event) => instructor ?  setTutorEmail(event.target.value) : setEmail(event.target.value)}
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
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          try {
                            if (
                              userEmail === '' ||
                              password === '' ||
                              name === '' ||
                              cpassword === ''
                            ) {
                              setMessage('Please enter all fields');
                            } else if (cpassword !== password) {
                              setMessage('Passwords do not match');
                            } if(instructor)
                              createTutorAccount()
                              else createAccount()
                          } catch (e) {
                            myConsole.log(e);
                          }
                        }}
                        className={classes.submit}
                      >
                        Create Account
                      </Button>
                      <Grid container style={{ margin: '2%' }}>
                        <Typography style={{ color: 'red' }}>
                          {message}
                        </Typography>
                      </Grid>
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
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                          if (((!instructor && userEmail === '') || password === '')||((instructor && tutorEmail === '') || password === '')) {
                            setMessage('Please enter all fields');
                          } else {
                            // eslint-disable-next-line no-lonely-if
                            if(!instructor)
                            login();
                            else
                             loginTutor();
                          }
                        }}
                      >
                        Sign In
                      </Button>
                      <Grid container style={{ margin: '2%' }}>
                        <Typography style={{ color: 'red' }}>
                          {message}
                        </Typography>
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
