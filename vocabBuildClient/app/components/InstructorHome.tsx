import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import GroupIcon from '@material-ui/icons/Group';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TopBar from './AppBar';
import Levels from './Levels';
import { myConsole } from '../constants/constants';
import MyLevels from './MyLevels';
import InstructorStats from './InstructorStats';
import { Theme } from '../constants/theme';

export default function InstructorHome() {
  const theme = Theme;
  const location = useLocation();

  const history = useHistory();

  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [currentMenuItem, setCurrentMenuItem] = useState<number>(0);
  const [loggedIn, setIsLoggedIn] = useState<number>(0); // 0 not logged, 1 logged

  const [name, setName] = useState<string>('Loading');

  const useStyles = makeStyles({
    heading: {
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
      color: 'white',
      marginBottom: '1%',
    },
    subheading: {
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
      color: 'white',
      marginBottom: '3%',
    },
    item: {
      backgroundColor: theme.palette.primary.dark,
      borderRadius: 10,
      padding: '2%',
      margin: '1%',
      width: window.innerWidth / 2,
      justifyContent: 'space-between',
    },
    menuItemNames: {
      color: 'white',
    },
  });
  const classes = useStyles();

  useEffect(() => {
    myConsole.log(`Welcome Sir ${location.state.name}`);
    window.localStorage.setItem("userType","tutor");
    setName(location.state.name);
  }, [location]);

  const setLogged = (log: number) => {
    setIsLoggedIn(log);
  };
  const setLevel = (level: number) => {
    myConsole.log(`Home level${level}`);
    setCurrentLevel(level);
  };

  const setSet = (set: string) => {
    myConsole.log(`Seth ${set}`);
    setCurrentMenuItem(set);
  };

  const renderContent = () => {
    if (!currentMenuItem) {
      return (
        <Grid container style={{ marginTop: '30vh' }}>
          <Grid
            container
            direction="column"
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Grid
             style={{cursor:'pointer'}}
              onClick={() => {
                setCurrentMenuItem(1);
              }}
              className={classes.item}
              container
            >
              <Typography className={classes.menuItemNames}>
                My Levels
              </Typography>
              <FilterNoneIcon />
            </Grid>
            <Grid
            style={{cursor:'pointer'}}
              onClick={() => {
                setCurrentMenuItem(2);
              }}
              className={classes.item}
              container
            >
              <Typography  className={classes.menuItemNames}>
                Statistics
              </Typography>
              <EqualizerIcon />
            </Grid>
            {/* <Grid item className={classes.item}>
            <Typography className={classes.menuItemNames}>
              My Tutees
            </Typography>
            <EqualizerIcon />
          </Grid> */}
          </Grid>
        </Grid>
      );
    }
    if (currentMenuItem === 1) {
      return (
        <Grid
          container
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flex: 1,
          }}
        >

          <MyLevels
            level={currentLevel}
            set={currentMenuItem}
            setCurrentMenuItem={setCurrentMenuItem}
            tutorEmail={location.state.email}
          />
        </Grid>
      );
    } if (currentMenuItem === 2)
      return (
        <InstructorStats
          setCurrentMenuItem={setCurrentMenuItem}
          tutorEmail={location.state.email}
        />
      );
  };

  return (
    <Grid container>
      <TopBar
        logout={() => {
          history.goBack();
          myConsole.log('Logout home');
        }}
        name={name}
        levelNo={currentLevel}
      />

      {renderContent()}
    </Grid>
  );
  // return(<Login setLogged={setLogged} />)
}
