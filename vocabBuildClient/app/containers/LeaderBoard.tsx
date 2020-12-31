/* eslint-disable prettier/prettier */
import React,{ useEffect,useState } from 'react';
import {
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
  Button,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';
import { Theme } from '../constants/theme';
import { myConsole } from '../constants/constants';

const theme = Theme;
const useStyles = makeStyles({

});





const LeaderBoard : React.FC = ({leaderBoard}) => {
  const history = useHistory();
  const [board,setBoard] = useState([]);
  const getLeaderBoard = () => {
    Axios.get(`http://localhost:3000/api/getLeaderBoard`)
      .then((response) => {

        setBoard(response.data);
        return myConsole.log(`Lb ${JSON.stringify(response.data)}`);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  myConsole.log('Historyy')
  useEffect(() => {
    getLeaderBoard();

    },[])
  return(<Grid container style={{margin: '10%',padding:'5%'}}>
    <Grid container direction='row'  style={{backgroundColor: 'white',borderRadius:10,flex:1,justifyContent:'center',alignItems:'center'}}>
      <Grid container style={{margin:'1%'}}>
      <ArrowBackIcon onClick={() => {
        history.push('/home');

      }}/>

      </Grid>
      <Typography style={{margin:'2%',fontWeight:'bold'}}>Leaderboard</Typography>
      <Grid container direction='column'>
        {board.map((person,inx) => {
          return(<Grid container direction='row' justify='space-between' key={inx.toString()} style={{backgroundColor: theme.palette.primary.dark,margin:'1%',padding:'1%',borderRadius:10,alignSelf:'center',width: 1100}}>
              <Typography style={{color:'white'}}>{(inx+1).toString()}</Typography>

                <Typography style={{color:'white'}}>{person.name}</Typography>


                <Typography style={{color:'white'}}>{person.grand_total}</Typography>

            </Grid>)

        })}

      </Grid>

    </Grid>


  </Grid>)
};

export default LeaderBoard;
