import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    // borderRadius : 10
  },
  image: {
    backgroundImage: '../../resources/start',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#EDECFF',

    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // borderRadius : 100,
    backgroundColor: 'blue',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    borderTopRightRadius: 100,

    //  backgroundColor:'pink'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  parent: {
    paddingTop: '5%',
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <div
      style={{
        padding: '10%',
        alignItems: 'center',
        borderRadius: 100,
        flex: 1,
      }}
    >
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          component={Paper}
          className={classes.image}
        >
          <Typography component="h1" style={{ margin: '10%' }}>
            Welcome to VocabBuilder!
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Name"
                name="email"
                // autoComplete="email"
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                <Grid item>
                  {/* <Link to={} variant="body2">
                  {"Already have an account? Sign In"}
                </Link> */}
                </Grid>
              </Grid>
              <Box mt={5} />
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
