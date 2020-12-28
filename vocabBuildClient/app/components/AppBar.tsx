/* eslint-disable prettier/prettier */
import React from 'react';
import { purple } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import {
  makeStyles,
  Grid,
  createMuiTheme,
  TextField,
  Typography,
  AppBar,
  Avatar,
  fade,
  ThemeProvider,
  Button,
  Menu,
  MenuItem
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
  name ?: string;
  levelNo ?: number;
  logout? : () => void;

}


const TopBar : React.FC<Props> = ({levelNo,name,logout}) => {
 // myConsole.log(JSON.stringify(levelNo))
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    logout();
    setAnchorEl(null);
  };
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
        <div>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button> */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
          <Grid container direction="row" alignItems="center">
            <Avatar
            onClick={handleClick}
            >{name.substring(0,1).toUpperCase()}</Avatar>
            {/* <Button>A</Button> */}
           <Typography style={{margin: '2%',fontWeight: 'bold'}}>{name}</Typography>
          </Grid>
        </Grid>

        <Grid container style={{flexDirection:'row'}}>
          <Grid container style={{position:'absolute',alignSelf: 'center',left:1180,flex:1,color:'gray'}}>
          <SearchIcon />

          </Grid>
<Grid container style={{alignSelf:'flex-end'}}>
<TextField
style={{padding: '1%'}}
          variant='outlined'
          fullWidth
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

        </Grid>

        {/* <Grid container alignItems="center" justify='flex-end'>
          {`Level ${levelNo.levelNo}`}
        </Grid> */}





      </AppBar>
    </ThemeProvider>
  );
}

export default TopBar;
