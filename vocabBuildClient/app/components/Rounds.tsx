/* eslint-disable prettier/prettier */
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
import { Link } from 'react-router-dom';
import HearingIcon from '@material-ui/icons/Hearing';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import { myConsole } from '../constants/constants';
import { Theme } from '../constants/theme';
import Instructions from './Instructions';

const theme = Theme;

interface Props {
  // levelNo : number,
  // setNo : number,
  setSet: (set: number) => void;
  setRound: (round: number) => void;
}

const AnimatedGrid = animated(Grid);

const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.innerWidth,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: window.innerWidth * 0.75,
    height: window.innerHeight / 8,
    flexDirection: 'row',
  },
  cardAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 500,
    borderBottomWidth: 90,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.palette.primary.dark,
    borderLeftColor: 'transparent',
  },
  instructions: {
    alignItems :'center',
    justifyContent: 'center',
  }
});

const Rounds: React.FC<Props> = ({ setRound, setSet }) => {

  const [hover1, is1hovered] = useState<boolean>(false);
  const [hover2, is2hovered] = useState<boolean>(false);
  const [hover3, is3hovered] = useState<boolean>(false);

  const [round, selRound] = useState<number>(0);

  // myConsole.log(`Shows ${levelNo} ${setNo}`)
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.container}>
        <Grid container style={{ margin: '1%' }}>
          <Typography onClick={() => setSet(0)} style={{ color: 'white' }}>
            Back
          </Typography>
        </Grid>

        <Grid container className={classes.cardAlign}>
          <Box
            border={6}
            borderColor={hover1 ? theme.palette.primary.dark : 'transparent'}
          >
            <Card
              className={classes.card}
              onClick={() => {
                myConsole.log('sound');
                selRound(1);
              }}
              // style={{flex:1,     height : window.innerHeight/3,
              // }}

              border={6}
              borderRadius={26}
              onMouseEnter={() => is1hovered(true)}
              onMouseLeave={() => is1hovered(false)}
            >
              <Grid direction="row" container className={classes.triangle}>
                <Grid style={{ padding: '3%' }}>
                  <HearingIcon style={{ color: 'white', margin: '5' }} />
                </Grid>
                <Typography
                  style={{ alignSelf: 'center', color: 'white' }}
                  variant="h6"
                >
                  Audio
                </Typography>
              </Grid>
            </Card>
          </Box>
        </Grid>
        <Grid container className={classes.cardAlign}>
          <Box
            border={6}
            borderColor={hover2 ? theme.palette.primary.dark : 'transparent'}
          >
            <Card
              className={classes.card}
              onClick={() => {
                myConsole.log('eh')
                selRound(2)
              }}
              // style={{flex:1,     height : window.innerHeight/3,
              // }}

              border={6}
              borderRadius={26}
              onMouseEnter={() => is2hovered(true)}
              onMouseLeave={() => is2hovered(false)}
            >
              <Grid direction="row" item className={classes.triangle}>
                <MenuBookIcon style={{ color: 'white', margin: '5' }} />
                <Typography
                  style={{ alignSelf: 'center', color: 'white', margin: '1%' }}
                  variant="h6"
                >
                 Quiz
                </Typography>
              </Grid>
            </Card>
          </Box>
        </Grid>
        {/* <Grid container className={classes.cardAlign}>
    <Box border={6} borderColor={hover3 ? theme.palette.primary.dark : 'transparent'}>
         <Card
       className={classes.card}
       onClick={() =>setRound(1)}
      // style={{flex:1,     height : window.innerHeight/3,
      // }}

       border={6}
       borderRadius={26}

       onMouseEnter={() => is3hovered(true)}
       onMouseLeave={() => is3hovered(false)}

       >
         <Grid direction='row' item className={classes.triangle}>
         <Typography style={{alignSelf: 'center',color: 'white'}} variant='h6'>Audio</Typography>

         </Grid>

      </Card>
        </Box>

    </Grid>
 */}
   <Grid style={{marginTop: '25vh'}}/>

   {round !== 0 ?<Grid container className={classes.instructions} style={fadeProps}>
      <Instructions round={round}/></Grid> : null}
      </Grid>
    </ThemeProvider>
  );
};

export default Rounds;
