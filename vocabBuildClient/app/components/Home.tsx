/* eslint-disable prettier/prettier */
import React,{ useState, useEffect} from 'react';
import {Grid,makeStyles, Typography} from '@material-ui/core'
import { useHistory,useLocation } from 'react-router-dom';
import TopBar from './AppBar';
import Levels from './Levels';
import Rounds from './Rounds';
import {myConsole} from '../constants/constants';
import Login from '../containers/Login';
import ChooseInstructor from './ChooseInstructor';

export default function Home() {
  const location = useLocation();

  const history = useHistory();

  const [instructorChosen,setInstructorChosen] = useState<string>('');
  const [currentLevel,setCurrentLevel] = useState<number>(0);
  const [currentSet,setCurrentSet] = useState<string>('');
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

  const setSet = (set : string) => {

    myConsole.log(`Seth ${set}`)
    setCurrentSet(set)
  }

  const setRound = (round : number) => {
    setCurrentRound(round);
  }
  if(instructorChosen)
  return (

    <Grid container>
      <TopBar name={name} levelNo={currentLevel} />


      <Grid container style={{marginTop:'10%'}}>
     <Typography onClick={() => {
        history.goBack()
      }}>back</Typography>
     </Grid>


   {currentSet === '' ? <Grid container style={{marginTop: '20vh'}}>
     <Levels instructorEmail={instructorChosen} setLevel={setLevel} setSet={setSet} />


    </Grid>:<Grid container style={{marginTop: '20vh',alignItems: 'center',justifyContent: 'center'}}>
    <Rounds levelNo={currentLevel} setNo={currentSet} setRound={setRound} setSet={setSet} />

    </Grid>
}

      </Grid>

  );
  return(<ChooseInstructor setInstructor={setInstructorChosen} />)
}


