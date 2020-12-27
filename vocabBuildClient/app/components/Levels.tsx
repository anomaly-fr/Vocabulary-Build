/* eslint-disable no-lone-blocks */
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
import { myConsole } from '../constants/constants';
import { Theme } from '../constants/theme';

import Axios from 'axios';
import { levels } from 'electron-log';

const levelDimensions = {
  width: window.innerWidth / 6,
  height: window.innerHeight / 3,
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
    fontWeight: 'bold',
    fontSize: 20,
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
    margin: '1%',
  },
});

interface Props {
  setLevel: (level: number) => void;
  setSet: (set: string) => void;
  instructorEmail: string;
}
const Levels: React.FC<Props> = ({ setLevel, setSet, instructorEmail }) => {
  const [level, selLevel] = useState<number>(0);
  const [levelsFetched, setLevelsFetched] = useState([]);
  const [randomData, setRandomData] = useState(0);
  const [sets,setSets] = useState([]);



  const [hover1, isHovered1] = useState<boolean>(false);

  // For sets
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

  //  const [level,setLevel] = useState<number>(0)

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

  const getSets = (levelNo) => {
    myConsole.log('Fetching Sets');
    Axios.get(`http://localhost:3000/api/getSetsByLevelNo/${levelNo}`)
      .then((response) => {
        const arr = response.data;
        let i;
        for (i in arr) {
          arr[i] = {
            ...arr[i],
            id: false,
          };
        }
        setSets(arr);
        return myConsole.log(`Sets ${response.data}`);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  useEffect(() => {
    getLevels();
  }, [instructorEmail]);

  const classes = useStyles();

  const AnimatedGrid = animated(Grid);
  const AnimatedText = animated(Typography);
  const AnimatedCard = animated(Card);


  const hoverEffect = (set: string) => {
    if (set === 'Set 1') setCardHovered(1);
    else if (set === 'Set 2') setCardHovered(2);
    else if (set === 'Set 3') setCardHovered(3);
  };

  const restore = (set: string) => {
    setCardHovered(0);
    //   if(set === 'Set 1'){
    //     isCard1Hovered(false)

    //   }
    //   else if(set === 'Set 2')
    //   isCard2Hovered(false)
    //   else isCard3Hovered(false)
  };

  const resolveSets = (set: string) => {
    if (set === 'Set 1') return card1AnimationProps;
    if (set === 'Set 2') return card2AnimationProps;
    return card3AnimationProps;
  };

  const renderSets = () => {
    return sets.map((set) => {
      return (
        <Grid
          direction="row"
          className={classes.set}
          key={set.set_name.toString()}
          container
        >
          <AnimatedCard
            onMouseEnter={() => hoverEffect(set.toString())}
            onMouseLeave={() => restore(set.toString())}
            style={resolveSets(set.toString())}
            className={classes.card}
            onClick={() => {
              // setSet(set);
            }}
          >
            <Typography style={{ color: theme.palette.primary.light }}>
              {set.set_name}
            </Typography>
          </AnimatedCard>
        </Grid>
      );
    });
  };
  // myConsole.log('Hello World!');

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container // Main
        alignItems="center"
        justify="space-around"
        direction="row"
        spacing={10}
      >
        {levelsFetched.map((lev, inx) => (
          <Box
            key={inx.toString()}
            border={6}
            borderRadius={26}
            borderColor={lev.id ? theme.palette.primary.dark : 'transparent'}
          >
            <Grid
              container
              onMouseEnter={() => isHovered1(true)}
              onMouseLeave={() => isHovered1(false)}
              onClick={() => {

                for(let i in levelsFetched){
                   levelsFetched[i].id = false;
                }
                lev.id = !lev.id;
                getSets(lev.level_no);
                setRandomData(Math.random());
                // setLevel(1);
                // selLevel(1);
                // myConsole.log('I work')
              }}
              className={classes.level}
            >
              <AnimatedText
                style={{ marginTop: lev.id ? 10 : 100 }}
                className={classes.text}
              >
                {lev.level_name}
              </AnimatedText>
              <AnimatedGrid
                style={{ opacity: lev.id ? 1 : 0 }}
                className={classes.set}
                container
              >
                <Grid container>{renderSets()}</Grid>
              </AnimatedGrid>
            </Grid>
          </Box>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default Levels;
