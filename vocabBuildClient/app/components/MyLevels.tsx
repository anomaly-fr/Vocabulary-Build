import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  ThemeProvider,
  TextField,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';
import { Theme } from '../constants/theme';
import { myConsole } from '../constants/constants';

import AddWords from './AddWords';

const theme = Theme;

const useStyles = makeStyles({
  container: {
    // alignItems: 'center',
    //  justifyContent: 'center',
    //  width: window.innerWidth,
    //  height: window.innerHeight,
    //  flexDirection: 'column',
    padding: '2%',
    backgroundColor: 'white',
    margin: '15%',
    borderRadius: 20,

    marginTop: '5%',
  },
  heading: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
  },
  body: {
    //  margin: '10%',
    borderRadius: 20,
    backgroundColor: 'white',
    height: 300,
    flex: 1,
    width: window.innerWidth,
  },
  createLevel: {
    fontWeight: 'bold',
    // margin: '3%',
    justifyContent: 'center',
    fontSize: 20,
    marginStart: '1%',
  },
  level: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: '0.5%',
    borderRadius: 10,
    padding: '1%',
  },
});

interface Props {
  level: number;
  set: string;
  tutorEmail: string;
  setCurrentMenuItem: (item: number) => void;
}

const MyLevels: React.FC<Props> = ({
  level,
  set,
  tutorEmail,
  setCurrentMenuItem,
}) => {
  myConsole.log('My Levels');

  const classes = useStyles();
  const [levels, setLevels] = useState([]);
  const [sets, setSets] = useState([]);
  const [newLevel, showNewLevel] = useState<boolean>(false);
  const [newSet, showNewSet] = useState<boolean>(false);
  const [levelName, setLevelName] = useState<string>('');
  const [setName, setSetName] = useState<string>('');
  const [levelSel, setLevelSel] = useState<number>(0);
  const [setSel, setSetSel] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const fetchSets = (levelNo) => {
    myConsole.log('Fetching sets for '+levelNo);
    Axios.get(`http://localhost:3000/api/getSetsByLevelNo/${levelNo}`)
      .then((response) => {
        setSets(response.data);
        setLevelSel(levelNo);

        myConsole.log(`Sets ${JSON.stringify(response.data)}`);

        return myConsole.log(sets);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  const fetchLevels = () => {
    Axios.get(`http://localhost:3000/api/getLevelsByTutor/${tutorEmail}`)
      .then((response) => {
        setLevels(response.data);

        myConsole.log(`Levels: ${response.data.length}`);
        // setLevelSel(response.data.le)
        //   fetchSets();

        return myConsole.log(levels);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  useEffect(() => {
    fetchLevels();
  }, [tutorEmail, setLevelSel]);

  const createLevel = () => {
    myConsole.log(tutorEmail);
    Axios.post('http://localhost:3000/api/createLevel', {
      level_name: levelName,
      tutor_email: tutorEmail,
    })
      .then((response) => {
        setLevelName('');
        fetchLevels();

        return myConsole.log(`resp ${response.data}`);
      })
      .catch((error) => {
        myConsole.log(`Error ${error}`);
      });
  };

  const createSet = () => {
    Axios.post('http://localhost:3000/api/createSet', {
      set_name: setName,
      level_id: levelSel,
    })
      .then((response) => {
        setSetName('');
        fetchSets(levelSel);

        myConsole.log('Level now is '+levelSel)

        return myConsole.log(`resp ${response.data}`);
      })
      .catch((error) => {
        myConsole.log(`Error ${error}`);
      });
  };

  if (levelSel === 0 && setSel === 0)
    return (
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid direction="column" container className={classes.container}>
            <Grid
              container
              direction="row"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid
                container
                spacing={4}
                direction="row"
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              >
                <Grid
                  item
                  onClick={() => {
                    setCurrentMenuItem(0);
                  }}
                >
                  <ArrowBackIcon />
                </Grid>
                <Grid
                  container
                  style={{
                    padding: '2%',
                    alignItems: 'center',
                  }}
                >
                  <AddCircleOutlineIcon
                    onClick={() => {
                      showNewLevel(!newLevel);
                    }}
                  />

                  <Typography className={classes.createLevel}>
                    Create level{' '}
                  </Typography>
                </Grid>
                {newLevel ? (
                  <Grid item>
                    <TextField
                      value={levelName}
                      variant="outlined"
                      placeholder="Level Name"
                      onChange={(event) => setLevelName(event.target.value)}
                    />
                  </Grid>
                ) : null}
                {newLevel ? (
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (levelName !== '') createLevel();
                      }}
                      color="primary"
                    >
                      Create
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
              <Grid style={{ flex: 1, alignSelf: 'center', marginTop: '2%' }}>
                {levels.length === 0 ? (
                  <Grid container style={{flex:1,margin:'3%'}}>
                    <Typography style={{color:'gray',fontSize:14}}>No levels yet</Typography>
                  </Grid>
                ) : (
                  <Grid container>
                    {levels.map((lev, idx) => {
                      return (
                        <Grid
                          onClick={() => {
                            fetchSets(lev.level_id);
                          }}
                          className={classes.level}
                          style={{
                            backgroundColor: Theme.palette.primary.dark,
                          }}
                          container
                          key={idx.toString()}
                        >
                          <Typography style={{ color: 'white' }}>
                            {lev.level_name}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );

  // Level is selected

  //  fetchSets();
  if (levelSel !== 0 && setSel === 0)
    return (
      <ThemeProvider theme={theme}>
        <Grid container style={{ margin: '3%' }}>
          <Grid direction="column" container className={classes.container}>
            <Grid
              container
              direction="row"
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Grid
                onClick={() => {
                  setLevelSel(0);
                }}
                item
                style={{ flex: 1 }}
              >
                <Grid item>
                  <ArrowBackIcon />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={4}
                direction="row"
                style={{ alignItems: 'center' }}
              >
                <Grid
                  container
                  style={{
                    alignItems: 'center',
                    margin: '2%',
                    marginTop: '8%',
                  }}
                >
                  <Grid item>
                    <AddCircleOutlineIcon
                      onClick={() => {
                        showNewSet(!newSet);
                      }}
                    />
                  </Grid>

                  <Typography className={classes.createLevel}>
                    Create Set{' '}
                  </Typography>
                </Grid>
                {newSet ? (
                  <Grid item>
                    <TextField
                      value={setName}
                      variant="outlined"
                      placeholder="Set Name"
                      onChange={(event) => setSetName(event.target.value)}
                    />
                  </Grid>
                ) : null}
                {newSet ? (
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (setName !== '') createSet();
                      }}
                      color="primary"
                    >
                      Create
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
              <Grid style={{ flex: 1, marginTop: '2%' }}>
                {sets.length === 0 ? <Grid container style={{flex:1,margin:'3%'}}>
                    <Typography style={{color:'gray',fontSize:14}}>No Sets yet</Typography>
                  </Grid> : <Grid container>
                  {sets.map((se, idx) => {
                  return (
                    <Grid
                      onClick={() => {
                        setSetSel(se.set_id);
                      }}
                      className={classes.level}
                      style={{ backgroundColor: Theme.palette.primary.dark }}
                      container
                      key={idx.toString()}
                    >
                      <Typography style={{ color: 'white' }}>
                        {se.set_name}
                      </Typography>
                    </Grid>
                  );
                })}
                    </Grid> }

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  return <AddWords setSetSel={setSetSel} setNo={setSel} levelNo={levelSel} />;
};

export default MyLevels;
