/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import {
  makeStyles,
  Grid,
  createMuiTheme,
  Typography,
  ThemeProvider,
  Box,
  Card,
} from '@material-ui/core';

import { useSpring, animated } from 'react-spring';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';
import { myConsole } from '../constants/constants';
import { Theme } from '../constants/theme';
import Quiz from './Quiz';
import Rounds from './Rounds';

const levelDimensions = {
  width: window.innerWidth / 10,
  height: window.innerHeight / 5,
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
    fontSize: 18,
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
  const [finalSet,setFinalSet] = useState<number>(0);
  const [randomData, setRandomData] = useState(0);

  const [sets, setSets] = useState([]);
  const AnimatedGrid = animated(Grid);
  const AnimatedText = animated(Typography);
  const AnimatedCard = animated(Card);
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
              } else myConsole.log('Closer');
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
      <Grid container style={{ flex: 1, alignSelf: 'flex-start' }}>
        <ArrowBackIcon
          onClick={() => {
            setInstructorChosen(0);
          }}
          style={{ margin: '2%' }}
        />
        <Grid
          container
          direction="column"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography style={{ fontSize: 20 }}>Levels: </Typography>
        </Grid>

        <Grid container>
          {levelsFetched.map((lev, inx) => (
            <Box
              key={inx.toString()}
              border={6}
              borderRadius={26}
              borderColor={lev.id ? theme.palette.primary.dark : 'transparent'}
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
            >
              <Typography style={{ fontSize: 20 }}>Sets: </Typography>
            </Grid>
            {sets.map((set, inx) => {
              return (
                <Grid
                  justify="space-between"
                  className={classes.oneSet}
                  onClick={() => {
                    myConsole.log('Quiz');
                  //  goToPlay(set.set_id);
                     setFinalSet(set.set_id);

                  }}
                  key={inx.toString()}
                  container
                >
                  <Typography>{`${set.set_name}`}</Typography>
                  <Typography>{`Number of words: ${set.number_of_words}`}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
  return <Rounds setFinalSet={setFinalSet} finalSet={finalSet} />

};



export default Levels;
