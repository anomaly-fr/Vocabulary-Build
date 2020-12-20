import React, { useState } from 'react';

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
  setSet: (set: number) => void;
}
const Levels: React.FC<Props> = ({ setLevel, setSet }) => {
  const [level, selLevel] = useState<number>(0);

  const level1AnimationProps = useSpring({
    marginTop: level === 1 ? 10 : 100,
    from: { marginTop: 100 },
  });
  const level2AnimationProps = useSpring({
    marginTop: level === 2 ? 10 : 100,
    from: { marginTop: 100 },
  });
  const level3AnimationProps = useSpring({
    marginTop: level === 3 ? 10 : 100,
    from: { marginTop: 100 },
  });

  const sets1AnimationProps = useSpring({
    to: { opacity: level === 1 ? 1 : 0 },
  });
  const sets2AnimationProps = useSpring({
    to: { opacity: level === 2 ? 1 : 0 },
  });
  const sets3AnimationProps = useSpring({
    to: { opacity: level === 3 ? 1 : 0 },
  });

  const [hover1, isHovered1] = useState<boolean>(false);
  const [hover2, isHovered2] = useState<boolean>(false);
  const [hover3, isHovered3] = useState<boolean>(false);

  // For sets
  const [card1Hovered, isCard1Hovered] = useState<boolean>(false);
  const [card2Hovered, isCard2Hovered] = useState<boolean>(false);
  const [card3Hovered, isCard3Hovered] = useState<boolean>(false);

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

  const classes = useStyles();

  const AnimatedGrid = animated(Grid);
  const AnimatedText = animated(Typography);
  const AnimatedCard = animated(Card);

  const sets = ['Set 1', 'Set 2', 'Set 3'];

  const hoverEffect = (set: string) => {
    if (set === 'Set 1') setCardHovered(1);
    else if (set === 'Set 2') setCardHovered(2);
    else if (set === 'Set 3') setCardHovered(3);
    // if(set === 'Set 1'){
    //   isCard1Hovered(true)
    //   isCard2Hovered(false)
    //   isCard3Hovered(false)
    //   myConsole.log(
    //  `Current set :    ${set}
    //     Set 1 : ${card1Hovered} Set 2 : ${card2Hovered} Set 3 :${card3Hovered}`
    //   )

    // }
    // else if(set === 'Set 2'){
    //   isCard2Hovered(true)
    //   isCard1Hovered(false)
    //   isCard3Hovered(false)
    //   myConsole.log(
    //     `Current set :    ${set}
    //        Set 1 : ${card1Hovered} Set 2 : ${card2Hovered} Set 3 :${card3Hovered}`
    //      )

    // }
    // else {
    //   isCard3Hovered(true)
    //   isCard1Hovered(false)
    //       isCard2Hovered(false)
    //       myConsole.log(
    //         `Current set :    ${set}
    //            Set 1 : ${card1Hovered} Set 2 : ${card2Hovered} Set 3 :${card3Hovered}`
    //          )
    // }
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
          key={set.toString()}
          container
        >
          <AnimatedCard
            onMouseEnter={() => hoverEffect(set.toString())}
            onMouseLeave={() => restore(set.toString())}
            style={resolveSets(set.toString())}
            className={classes.card}
            onClick={() => {
              const s = set.substring(4);
              myConsole.log(typeof(parseInt(s)));
              setSet(parseInt(s));
            }}
          >
            <Typography style={{ color: theme.palette.primary.light }}>
              {set.toString()}
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
        <Box
          border={6}
          borderRadius={26}
          borderColor={hover1 ? theme.palette.primary.dark : 'transparent'}
        >
          <Grid
            container
            onMouseEnter={() => isHovered1(true)}
            onMouseLeave={() => isHovered1(false)}
            onClick={() => {
              setLevel(1);
              selLevel(1);
              // myConsole.log('I work')
            }}
            className={classes.level}
          >
            <AnimatedText style={level1AnimationProps} className={classes.text}>
              Level 1
            </AnimatedText>
            <AnimatedGrid
              style={sets1AnimationProps}
              className={classes.set}
              container
            >
              <Grid container>{renderSets()}</Grid>
            </AnimatedGrid>
          </Grid>
        </Box>
        <Box
          border={6}
          borderRadius={26}
          borderColor={hover2 ? theme.palette.primary.dark : 'transparent'}
        >
          <Grid
            container
            onMouseEnter={() => isHovered2(true)}
            onMouseLeave={() => isHovered2(false)}
            onClick={() => {
              setLevel(2);
              selLevel(2);
            }}
            className={classes.level}
          >
            <AnimatedText style={level2AnimationProps} className={classes.text}>
              Level 2
            </AnimatedText>
            <AnimatedGrid
              style={sets2AnimationProps}
              className={classes.set}
              container
            >
              <Grid container>{renderSets()}</Grid>
            </AnimatedGrid>
          </Grid>
        </Box>
        <Box
          border={6}
          borderRadius={26}
          borderColor={hover3 ? theme.palette.primary.dark : 'transparent'}
        >
          <Grid
            container
            onMouseEnter={() => isHovered3(true)}
            onMouseLeave={() => isHovered3(false)}
            onClick={() => {
              setLevel(3);
              selLevel(3);
            }}
            className={classes.level}
          >
            <AnimatedText style={level3AnimationProps} className={classes.text}>
              Level 3
            </AnimatedText>
            <AnimatedGrid
              style={sets3AnimationProps}
              className={classes.set}
              container
            >
              <Grid container>{renderSets()}</Grid>
            </AnimatedGrid>
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default Levels;
