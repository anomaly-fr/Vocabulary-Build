/* eslint-disable prettier/prettier */
import React,{ useState, useEffect} from 'react';
import {Grid,makeStyles, Typography} from '@material-ui/core'
import { useHistory,useLocation } from 'react-router-dom';
import TopBar from './AppBar';
import Levels from './Levels';
import Rounds from './Rounds';
import {myConsole} from '../constants/constants';
import Login from '../containers/Login';

export default function Home() {
  const location = useLocation();

  const history = useHistory();

  const [currentLevel,setCurrentLevel] = useState<number>(0);
  const [currentSet,setCurrentSet] = useState<number>(0);
  const [currentRound,setCurrentRound] = useState<number>(0);
  const [loggedIn,setIsLoggedIn] = useState<number>(0);  // 0 not logged, 1 logged

  const [name,setName] = useState<string>('Loading');


  useEffect(() => {
    myConsole.log(`Welcome ${location.state.name}`);
    setName(location.state.name);
 }, [location]);

  const setLogged = (log : number) => {
   setIsLoggedIn(log)
  }
  const setLevel = (level : number) => {
    myConsole.log(`Home level${  level}`)
    setCurrentLevel(level)
  }

  const setSet = (set : number) => {

    myConsole.log(`Seth ${set}`)
    setCurrentSet(set)
  }

  const setRound = (round : number) => {
    setCurrentRound(round);
  }
  return (

    <Grid container>
      <TopBar name={name} levelNo={currentLevel} />


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
  // return(<Login setLogged={setLogged} />)
}


