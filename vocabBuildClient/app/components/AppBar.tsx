/* eslint-disable prettier/prettier */
import React from 'react';
import { purple } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import {
  makeStyles,
  Grid,
  createMuiTheme,
  InputBase,
  Typography,
  AppBar,
  Avatar,
  fade,
  ThemeProvider
} from '@material-ui/core';
import { myConsole } from '../constants/constants';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff5e62',
    },
    secondary: {
      main: purple[800],
    },
  },
});

const useStyles = makeStyles({
  inputRoot: {
    color: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    // borderColor: theme.palette.secondary
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    alignSelf: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  }
});

interface Props {
  name ?: string,
  levelNo ?: number

}


const TopBar : React.FC<Props> = ({levelNo,name}) => {
 // myConsole.log(JSON.stringify(levelNo))
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <AppBar

        title="Home"
        style={{
          backgroundColor: 'whitesmoke',
          height: window.innerHeight / 10,
          flexDirection: 'row',
          alignItems: 'center',
          padding: '3%'
        }}
      >
        <Grid container justify="center" alignItems="center">
          <Grid container direction="row" alignItems="center">
            <Avatar>{name.substring(0,1).toUpperCase()}</Avatar>
            {/* <Button>A</Button> */}
           <Typography style={{margin: '2%'}}>{name}</Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <SearchIcon />

          <InputBase
            placeholder="Search for any word"
            classes={
              {
                 root: classes.inputRoot,
                 input: classes.inputInput,
              }
            }
            inputProps={{ 'aria-label': 'search' }}
          />
        </Grid>

        <Grid container alignItems="center" justify='flex-end'>
          {`Level ${levelNo.levelNo}`}
        </Grid>





      </AppBar>
    </ThemeProvider>
  );
}

export default TopBar;
