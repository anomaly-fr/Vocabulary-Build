/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography, ThemeProvider } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import GroupIcon from '@material-ui/icons/Group';
import TopBar from './AppBar';
import Levels from './Levels';
import { myConsole } from '../constants/constants';
import MyLevels from './MyLevels';
import { Theme } from '../constants/theme';
import Axios from 'axios';
import LeaderBoard from '../containers/LeaderBoard';

interface Props{
  setInstructor : (instructor : string) => void;
}

const ChooseInstructor : React.FC<Props> = ({setInstructor}) => {
  const theme = Theme;
  const location = useLocation();

  const history = useHistory();

  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [currentMenuItem, setCurrentMenuItem] = useState<number>(0);
  const [tutors,setTutors] = useState([]);

  const [name, setName] = useState<string>('Loading');
  let numbers = [];

  const useStyles = makeStyles({
    heading: {
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
      color: 'white',
      marginBottom: '1%',
    },
    subheading: {
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
      color: 'white',
      marginBottom: '3%',
    },
    item: {
      backgroundColor: theme.palette.primary.dark,
      borderRadius: 10,
      padding: '2%',
      margin: '1%',
      width: window.innerWidth / 2,
      justifyContent: 'space-between',
    },
    menuItemNames: {
      color: 'white',
    },
    square: {
      height: 150,
      width:150,
      borderRadius:20,
   //   padding:'2%',
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
      justifyContent: 'center',
      margin: '2%',
      alignItems: 'space-between'
    }
  });
  const classes = useStyles();

  useEffect(() => {
    myConsole.log(`Welcome Sir ${location.state.name}`);
    setName(location.state.name);

    Axios.get('http://localhost:3000/api/getAllTutors')
    .then((response) => {
      setTutors(response.data);
      return myConsole.log("N "+numbers)

    }).catch((error) => {
      myConsole.log(error)
    })

  }, [location]);



  return (
    <ThemeProvider theme={theme}>


    <Grid container>
      <TopBar name={name} levelNo={currentLevel} logout={() => {
        history.goBack();
        myConsole.log('Logout choose inst')
      }} />

      <Grid container style={{ marginTop: '10%' }}>
        {/* <Typography
          onClick={() => {
            history.goBack();
          }}
        >
          Logout
        </Typography> */}
      </Grid>

      {tutors.map((tut,inx) => {
        myConsole.log(tut)
        return(<Grid
        onClick={() => {
          setInstructor(tut.tutor_email)
        }}
         key={inx.toString()} className={classes.square} container>
          <Typography>{tut.name}</Typography>
          <Typography style={{fontSize:16}}>{tut.number_of_words}</Typography>
          <Grid style={{alignSelf: 'flex-end',backgroundColor: theme.palette.primary.light,borderBottomRightRadius:20,borderBottomLeftRadius:20,padding:'2%',justifyContent:'center'}} container>
          <Typography style={{fontSize:14}} >{`Levels: ${tut.number_of_levels}`}</Typography>

            </Grid>
          </Grid>)
      })}

      {/* <Grid container style={{padding:'5%'}}>
      <LeaderBoard />

      </Grid> */}





    </Grid>
    </ThemeProvider>
  );
}
export default ChooseInstructor;
