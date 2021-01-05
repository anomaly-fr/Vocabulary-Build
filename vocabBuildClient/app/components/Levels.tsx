import React, { useEffect, useState } from 'react';

import {
  makeStyles,
  Grid,
  createMuiTheme,
  Typography,
  ThemeProvider,
  Box,
  Card,
  Button,
} from '@material-ui/core';

import { useSpring, animated } from 'react-spring';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rounds from './Rounds';
import Quiz from './Quiz';
import { myConsole } from '../constants/constants';
import { Theme } from '../constants/theme';

const levelDimensions = {
  width: window.innerWidth / 9,
  height: window.innerHeight / 4,
};

const theme = Theme;

const useStyles = makeStyles({
  level: {
    width: levelDimensions.width,
    height: levelDimensions.height,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 20,
    //  alignItem: 'flex-start',
    justifyContent: 'center',
    elevation: 2,
    // borderWidth: 4,
    //  border: 4
  },
  text: {
    color: theme.palette.secondary.main,
    //   fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    //   alignSelf: 'center'
  },
  sets: {
    borderRadius: 20,
    // alignItem: 'flex-start',
    justifyContent: 'center',
    width: levelDimensions.width - 50,
    height: levelDimensions.height - 60,
    backgroundColor: 'white',
    alignSelf: 'center',
    opacity: 0,
    margin: '5%',
  },
  set: {
    margin: '0.5%',
    alignItems: 'center',
    justifyContent: 'center',
    //  flex: 1
  },
  card: {
    flex: 1,
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    //  margin: '1%',
  },
  oneSet: {
    borderRadius: 10,
    padding: '2%',
    margin: '1%',
    backgroundColor: theme.palette.primary.light,
    color: 'white',
  },
});

interface Props {
  setLevel: (level: number) => void;
  setSet: (set: string) => void;
  instructorEmail: string;
  setInstructorChosen: (ins: number) => void;
}

const Levels: React.FC<Props> = ({
  setLevel,
  setSet,
  instructorEmail,
  setInstructorChosen,
}) => {
  const [level, selLevel] = useState<number>(0);
  const [levelsFetched, setLevelsFetched] = useState([]);
  const [finalSet, setFinalSet] = useState<number>(0);
  const [randomData, setRandomData] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openBoard, setOpenBoard] = useState<boolean>(false);
  const [sets, setSets] = useState([]);
  const AnimatedGrid = animated(Grid);
  const AnimatedText = animated(Typography);
  const AnimatedCard = animated(Card);
  const [setStats, setSetStats] = useState([
    {
      highest_quiz_score: -1,
      highest_audio_score: -1,
      average_quiz_score: -1,
      average_audio_score: -1,
      email: 'Loading',
    },
  ]);
  const [board, setBoard] = useState([
    { email: '', level_total: -1, name: '' },
  ]);
  const [cardHovered, setCardHovered] = useState<number>(0);
  const card1AnimationProps = useSpring({
    transform: cardHovered === 1 ? 'scale(1.15)' : 'scale(1)',
  });
  const card2AnimationProps = useSpring({
    transform: cardHovered === 2 ? 'scale(1.15)' : 'scale(1)',
  });
  const card3AnimationProps = useSpring({
    transform: cardHovered === 3 ? 'scale(1.15)' : 'scale(1)',
  });
  const hoverEffect = (set: string) => {
    if (set === 'Set 1') setCardHovered(1);
    else if (set === 'Set 2') setCardHovered(2);
    else if (set === 'Set 3') setCardHovered(3);
  };

  const restore = (set: string) => {
    setCardHovered(0);
  };

  const handleShowDialog = () => {
    setOpen(true);
  };

  const handleHideDialog = () => {
    //   setCurrentRound(0)
    setOpen(false);
  };
  const handleShowBoardDialog = () => {
    setOpenBoard(true);
  };

  const handleHideBoardDialog = () => {
    //   setCurrentRound(0)
    setOpenBoard(false);
  };

  const getLevels = () => {
    myConsole.log('Fetching levels');
    Axios.get(`http://localhost:3000/api/getLevelsByTutor/${instructorEmail}`)
      .then((response) => {
        const arr = response.data;
        let i;
        for (i in arr) {
          arr[i] = {
            ...arr[i],
            id: false,
          };
        }
        setLevelsFetched(arr);
        return myConsole.log(`Levels ${response.data}`);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  const getStats = (setId: number) => {
    Axios.get(`http://localhost:3000/api/getSetStats/${setId}`)
      .then((response) => {
        handleShowDialog();

        setSetStats(response.data);
        return myConsole.log(`Sets stats ${JSON.stringify(response.data)}`);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };
  const getLeaderBoard = (levelId: number) => {
    Axios.get(`http://localhost:3000/api/getLevelLeaderboard/${levelId}`)
      .then((response) => {
        handleShowBoardDialog();
        setBoard(response.data);
        return myConsole.log(
          `Level leaderboard ${JSON.stringify(response.data)}`
        );
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  const getSets = (levelNo: number) => {
    myConsole.log('Fetching Sets');
    Axios.get(`http://localhost:3000/api/getSetsByLevelNo/${levelNo}`)
      .then((response) => {
        const arr = response.data;
        // let i;
        // for (i in arr) {
        //   arr[i] = {
        //     ...arr[i],
        //     id: false,
        //   };
        // }
        setSets(arr);
        return myConsole.log(`Sets ${JSON.stringify(response.data)}`);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  useEffect(() => {
    getLevels();
  }, [instructorEmail]);

  const resolveSets = (set: string) => {
    if (set === 'Set 1') return card1AnimationProps;
    if (set === 'Set 2') return card2AnimationProps;
    return card3AnimationProps;
  };

  const renderCards = (lev) => {
    const cards = [
      {
        card_name: 'View Sets',
      },
      {
        card_name: 'Leader Board',
      },
    ];
    return cards.map((set) => {
      return (
        <Grid
          direction="row"
          className={classes.set}
          key={set.card_name.toString()}
          container
        >
          <AnimatedCard
            onMouseEnter={() => hoverEffect(set.card_name.toString())} // Here lies the issue
            onMouseLeave={() => restore(set.card_name.toString())}
            style={resolveSets(set.card_name.toString())}
            className={classes.card}
            onClick={() => {
              if (set.card_name === 'View Sets') {
                getSets(lev.level_id);
                setRandomData(Math.random());
              } else {
                getLeaderBoard(lev.level_id);
              }
            }}
          >
            <Typography
              style={{ color: theme.palette.primary.light, fontSize: 14 }}
            >
              {set.card_name}
            </Typography>
          </AnimatedCard>
        </Grid>
      );
    });
  };

  const classes = useStyles();

  if (!finalSet)
    return (
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          //     TransitionComponent={Transition}
          keepMounted
          onClose={handleHideDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Set Statistics
          </DialogTitle>
          <DialogContent
            style={{
              backgroundColor: theme.palette.primary.dark,
              borderRadius: 20,
              margin: '2%',
            }}
          >
            <Grid container justify="space-between">
              <DialogContentText style={{ color: 'white', fontSize: 14 }}>
                Highest Audio Round Score:
              </DialogContentText>
              <DialogContentText style={{ color: 'white', fontSize: 14 }}>
                {setStats[0].highest_audio_score}
              </DialogContentText>
            </Grid>
            <Grid container justify="space-between">
              <DialogContentText style={{ color: 'white', fontSize: 14 }}>
                Highest Quiz Round Score:
              </DialogContentText>
              <DialogContentText style={{ color: 'white', fontSize: 14 }}>
                {setStats[0].highest_quiz_score}
              </DialogContentText>
            </Grid>
            <Grid container justify="space-between">
              <DialogContentText style={{ color: 'white', fontSize: 14 }}>
                Average Audio Round Score:
              </DialogContentText>
              <DialogContentText style={{ color: 'white', fontSize: 14 }}>
                {setStats[0].average_audio_score}
              </DialogContentText>
              <Grid container justify="space-between">
                <DialogContentText style={{ color: 'white', fontSize: 14 }}>
                  Average Audio Round Score:
                </DialogContentText>
                <DialogContentText style={{ color: 'white', fontSize: 14 }}>
                  {setStats[0].average_quiz_score}
                </DialogContentText>
              </Grid>
              {/* <Grid container justify='space-between'>
         <DialogContentText style={{color:'white',fontSize:14}}>
         Set Top Scorer Name
          </DialogContentText>
          <DialogContentText style={{color:'white',fontSize:14}}>
         {setStats.topper.length === 0? '-' : setStats.topper[0].name}
          </DialogContentText>
         </Grid> */}
              {/* <Grid container justify='space-between'>
         <DialogContentText style={{color:'white',fontSize:14}}>
         Topper's total
          </DialogContentText>
          <DialogContentText style={{color:'white',fontSize:14}}>
          {setStats.topper.length === 0? '-' : setStats.topper[0].total}
          </DialogContentText>
         </Grid> */}
            </Grid>
          </DialogContent>
        </Dialog>

        {/* for leaderboard */}

        <Dialog
          open={openBoard}
          //     TransitionComponent={Transition}
          keepMounted
          onClose={handleHideBoardDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Leaderboard</DialogTitle>
          <DialogContent
            style={{
              backgroundColor: theme.palette.primary.dark,
              borderRadius: 20,
              margin: '2%',
            }}
          >
            {board.length === 0 ? (
              <Grid>
                <Typography style={{ fontSize: 14, color: 'white' }}>
                  No competitors yet!
                </Typography>
              </Grid>
            ) : (
              <Grid container>
                {board.map((row, inx) => {
                  myConsole.log(JSON.stringify(`b ${board.length}`));

                  return (
                    <Grid
                      style={{
                        backgroundColor: theme.palette.primary.dark,
                        margin: '1%',
                      }}
                      container
                      justify="space-between"
                      key={inx.toString()}
                    >
                      <Grid
                        container
                        justify="space-between"
                        direction="row"
                        style={{
                          backgroundColor: theme.palette.primary.light,
                          margin: '1%',
                          padding: '1%',
                          alignItems: 'center',
                          borderRadius: 5,
                          flex: 1,
                          width: 300,
                        }}
                      >
                        <DialogContentText
                          style={{
                            color: 'white',
                            fontSize: 16,
                            alignSelf: 'center',
                          }}
                        >
                          {`${(inx + 1).toString()}. ${row.name}`}
                        </DialogContentText>

                        <DialogContentText
                          style={{
                            color: 'white',
                            fontSize: 16,
                            alignSelf: 'center',
                          }}
                        >
                          {`${row.level_total}`}
                        </DialogContentText>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </DialogContent>
        </Dialog>
        <Grid
          container
          style={{ flex: 1, alignSelf: 'flex-start', marginTop: '5%' }}
        >
          <ArrowBackIcon
            onClick={() => {
              setInstructorChosen(0);
            }}
            style={{ margin: '2%' }}
          />
          <Grid
            container
            direction="column"
            style={{ flex: 1, justifyContent: 'center' }}
          />

          <Grid container style={{ marginTop: '3%' }}>
            {levelsFetched.map((lev, inx) => (
              <Box
                key={inx.toString()}
                style={{ cursor: 'pointer' }}
                border={6}
                borderRadius={26}
                borderColor={
                  lev.id ? theme.palette.primary.dark : 'transparent'
                }
              >
                <Grid
                  container
                  onClick={() => {
                    for (const i in levelsFetched) {
                      levelsFetched[i].id = false;
                    }
                    lev.id = !lev.id;
                    //   getSets(lev.level_no);
                    setRandomData(Math.random());
                  }}
                  className={classes.level}
                >
                  <Typography
                    style={{ marginTop: lev.id ? 5 : 80 }}
                    className={classes.text}
                  >
                    {lev.level_name}
                  </Typography>
                  <Grid
                    style={{ opacity: lev.id ? 1 : 0 }}
                    className={classes.set}
                    container
                  >
                    {renderCards(lev)}
                    {/* <Grid container>
                  <Typography>

                  </Typography>

                </Grid> */}
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Grid container>
              <Grid
                container
                direction="column"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              {sets.length === 0 ? (
                <Grid style={{width:window.innerWidth,alignItems:'center',justifyContent:'center',marginTop:'2%'}}>
                  <Typography style={{ color: 'white', fontSize: 20,margin:'2%' }}>
                    No sets added yet!
                  </Typography>
                </Grid>
              ) : (
                <Grid container>
                  {sets.map((set, inx) => {
                    return (
                      <Grid
                        direction="row"
                        style={{
                          backgroundColor: theme.palette.primary.dark,
                          borderRadius: 10,
                          margin: '1%',
                        }}
                        container
                        key={inx.toString()}
                      >
                        <Grid
                          justify="space-between"
                          style={{ flex: 7 }}
                          className={classes.oneSet}
                          onClick={() => {
                            myConsole.log('Quiz');
                            //  goToPlay(set.set_id);
                            setFinalSet(set.set_id);
                          }}
                          container
                        >
                          <Typography>{`${set.set_name}`}</Typography>

                          <Typography>{`Number of words: ${set.number_of_words}`}</Typography>
                        </Grid>
                        <Grid
                          container
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            margin: '1%',
                          }}
                        >
                          <Button
                            onClick={() => {
                              getStats(set.set_id);
                            }}
                            variant="contained"
                            style={{
                              backgroundColor: theme.palette.primary.light,
                              color: 'white',
                              alignItems: 'center',
                            }}
                          >
                            View Stats
                          </Button>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  return (
    <Rounds
      instructorEmail={instructorEmail}
      setFinalSet={setFinalSet}
      finalSet={finalSet}
    />
  );
};

export default Levels;
