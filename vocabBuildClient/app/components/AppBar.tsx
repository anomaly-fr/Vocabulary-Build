import React, { useEffect, useState } from 'react';
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
  Card,
  Menu,
  MenuItem,
  Collapse,
  Button,
} from '@material-ui/core';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchBar from 'material-ui-search-bar';
import { myConsole } from '../constants/constants';
import LeaderBoard from '../containers/LeaderBoard';
import { WordsApiConfig } from '../constants/WordsAPIConfig';

import { Theme } from '../constants/theme';

const globalTheme = Theme;

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
  },
});

interface Props {
  name?: string;
  levelNo?: number;
  logout?: () => void;
  email?: string;
  leaderboard?: (b: boolean) => void;
}

const TopBar: React.FC<Props> = ({ name, logout, leaderboard }) => {
  // myConsole.log(JSON.stringify(levelNo))
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    logout();
    setAnchorEl(null);
  };

  const [leaderBoard, isLeaderboardShown] = useState<boolean>(false);

  const showLB = (whether) => {
    isLeaderboardShown(whether);
  };
  const leaderboardFunction = () => {
    showLB(true);
  };

  const [hover, setHover] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [wordSearchActive, isWordSearchActive] = useState<boolean>(false);
  const [definitions, setDefinitions] = useState([]);

  const wordSearch = () => {
    myConsole.log('definition');
    Axios.request({
      method: 'GET',
      url: `https://wordsapiv1.p.rapidapi.com/words/${searchTerm}/definitions`,

      headers: {
        'x-rapidapi-key': '2c63521ee0msh6f15f312dc2fe71p159026jsn0ca8a43c9af0',
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      },
    })
      .then((response) => {
        setDefinitions(response.data.definitions);
        isWordSearchActive(true);
        return myConsole.log(response.data);

      })
      .catch((e) => {});
  };

  const markLookUp = () => {
    Axios.put('http://localhost:3000/api/markLookUp', {
      user_email: window.localStorage.getItem('email'),
    })
      .then((response) => {
        myConsole.log("email " +window.localStorage.getItem('email'));
        isWordSearchActive(false);
        setSearchTerm('');
        return myConsole.log(response.data);
      })
      .catch((e) => myConsole.log(e));
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        style={{ backgroundColor: globalTheme.palette.primary.light }}
      >
        <Card variant="outlined" style={{ width: '100%' }}>
          <AppBar
            title="Home"
            style={{
              backgroundColor: 'whitesmoke',
              height: window.innerHeight / 10,
              flexDirection: 'row',
              alignItems: 'center',
              padding: '3%',
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
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
              <Grid container direction="row" alignItems="center">
                <Avatar onClick={handleClick}>
                  {name.substring(0, 1).toUpperCase()}
                </Avatar>
                {/* <Button>A</Button> */}
                <Typography style={{ margin: '2%', fontWeight: 'bold' }}>
                  {name}
                </Typography>
              </Grid>
            </Grid>

            <Grid container style={{ flexDirection: 'row' }}>
              <Grid container>
                <SearchBar
                  style={{
                    elevation: -10,
                    shadow: null,
                    backgroundColor: 'whitesmoke',
                  }}
                  placeholder="Search for any word"
                  value={searchTerm}
                  onChange={(word) => setSearchTerm(word)}
                  onRequestSearch={() => {
                    if (searchTerm !== '') wordSearch();
                  }}
                />
                {/* <TextField
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
          /> */}
                {/* <Button variant='contained' small>Search</Button> */}
              </Grid>
            </Grid>

            <Grid
              onMouseEnter={() => setHover(true)}
              container
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
              alignItems="center"
              justify="flex-end"
            >
              <Typography
                onClick={() => {
                  showLB(true);
                }}
              >
                Leader Board
              </Typography>
            </Grid>
          </AppBar>
          <Collapse in={leaderBoard} timeout={100} unmountOnExit>
            <LeaderBoard />
          </Collapse>
          <Grid container style={{ margin: '1%' }}>
            <ExpandLessIcon
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHover(false)}
              onClick={() => showLB(false)}
            />
          </Grid>
          <Collapse in={wordSearchActive} timeout={100} unmountOnExit>
            <Grid
              direction="column"
              style={{ padding: '3%', marginTop: '3%' }}
              container
            >
              <Typography
                style={{ color: 'gray', fontWeight: 'lighter', fontSize: 18 }}
              >
                {searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)}
              </Typography>
              {definitions.map((definition, inx) => {
                return (
                  <Grid key={inx.toString()} container>
                    <Typography>{`${(inx + 1).toString()}. ${
                      definition.definition.charAt(0).toUpperCase() +
                      definition.definition.slice(1)
                    }`}</Typography>
                  </Grid>
                );
              })}
              <ExpandLessIcon
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHover(false)}
                onClick={() => markLookUp()}
              />
            </Grid>
          </Collapse>
        </Card>
      </Grid>
    </ThemeProvider>
  );
};

export default TopBar;
