/* eslint-disable prettier/prettier */
import React,{ useState} from 'react';
import {Grid,makeStyles, Typography} from '@material-ui/core'
import TopBar from './AppBar';
import Levels from './Levels';
import Rounds from './Rounds';
import {myConsole} from '../constants/constants';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
    // eslint-disable-next-line global-require
  const nodeConsole = require('console');
  const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
  const [currentLevel,setCurrentLevel] = useState<number>(0);
  const [currentSet,setCurrentSet] = useState<number>(0);
  const [currentRound,setCurrentRound] = useState<number>(0);
  const setLevel = (level : number) => {
    myConsole.log(`Home level${  level}`)
    setCurrentLevel(level)
  }

  const setSet = (set : number) => {

    myConsole.log("Seth "+set)
    setCurrentSet(set)
  }

  const setRound = (round : number) => {
    setCurrentRound(round);
  }
  return (
    <Grid container>
      <TopBar levelNo={currentLevel} />


      <Grid container style={{marginTop:'10%'}}>
     <Typography onClick={() => {
        history.goBack()
      }}>back</Typography>
     </Grid>


   {currentSet === 0 ? <Grid container style={{marginTop: '20vh'}}>
     <Levels setLevel={setLevel} setSet={setSet} />


    </Grid>:<Grid container style={{marginTop: '20vh',alignItems: 'center',justifyContent: 'center'}}>
    <Rounds setRound={setRound} setSet={setSet} />

    </Grid>
}

      </Grid>

  );
}


