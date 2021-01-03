/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  ThemeProvider,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';
import { Equalizer } from '@material-ui/icons';
import { Theme } from '../constants/theme';
import { myConsole } from '../constants/constants';

import AddWords from './AddWords';

const theme = Theme;

const useStyles = makeStyles({
  container: {
   // alignItems: 'center',
    justifyContent: 'center',
    //  width: window.innerWidth,
    //  height: window.innerHeight,
    //  flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: '5%',
    padding:'2%',
    alignSelf:'center'
  },
  heading: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
  },
  body: {
    //  margin: '10%',
    borderRadius: 20,
    backgroundColor: 'white',
    height: 300,
    flex: 1,
    width: window.innerWidth,
  },
  createLevel: {
    fontWeight: 'bold',
    // margin: '3%',
    justifyContent: 'center',
    fontSize: 20,
    marginStart: '1%',
  },
  level: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: '0.5%',
    borderRadius: 10,
    padding: '1%',
  },
});

interface Props {

  tutorEmail: string;
  setCurrentMenuItem : (item : number) => void;
}

const InstructorStats: React.FC<Props> = ({ tutorEmail,setCurrentMenuItem }) => {
  myConsole.log('My Levels');

  const history = useHistory();
  const classes = useStyles();
  const [levels, setLevels] = useState([]);
  const [stats, setStats] = useState([]);
  const [setStat,setSetStat] = useState([]);
  const [open,setOpen] = useState<boolean>(false);

  const [currentSet,setCurrentSet] = useState<number>(0);



  const handleShowDialog = () => {

    setOpen(true);
  }

  const handleHideDialog = () => {
    setOpen(false);
  }

  const fetchSetStats = (setId) => {
    Axios.get(`http://localhost:3000/api/getTutorSetWiseStats/${setId}`)
      .then((response) => {
         Axios.get(`http://localhost:3000/api/getNumberOfWordsBySetId/${setId}`)
     .then((resp) => {
      myConsole.log('nummm '+ JSON.stringify(resp.data));

      let setFinalStat = {
        ...response.data,
        total: resp.data
      }
      setSetStat(setFinalStat);

       return myConsole.log(JSON.stringify(setFinalStat));
     })
     .catch((e) => {
       myConsole.log(e);
     });
        handleShowDialog();
        return myConsole.log("SET STATS "+JSON.stringify(response.data));
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };


  const fetchStats = () => {
    myConsole.log('Tut email '+ tutorEmail)
    Axios.get(`http://localhost:3000/api/getTutorStats/${tutorEmail}`)
      .then((response) => {

       setStats(response.data)
        return myConsole.log("stats "+response.data);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  useEffect(() => {
    fetchStats();
    myConsole.log('Effected')
  }, [tutorEmail]);


  const renderGraph = () => {


    // Get the number of words in this set


    const content=[];
    for(let i in setStat){
       const obj={
         name: setStat[i].name,
         mark: setStat[i].best_score_audio + setStat[i].best_score_quiz,
         total: setStat[i].total
       }
       myConsole.log("item "+JSON.stringify(obj))
       content.push(obj);

    }
    const genRanHex = (size:number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    return(content.map((bar,inx) => {
      if(bar.name !== null && bar.name !== undefined && bar.mark !== null && bar.mark !== undefined)
      return(<Grid direction='row' style={{width:500,height:100,padding:0,paddingTop:'5%',paddingBottom:'5%',margin:'1%',backgroundColor:'white'}} key={inx.toString()} container>
        <Grid container
        style={{width:(bar.mark/5)*100,height:40,backgroundColor:`#${genRanHex(6)}`}}
          />
         <Grid style={{height:40,alignItems:'center',justifyContent:'center',margin:'1%'}}>
         <Typography style={{fontSize:12,color:'black'}}>{`${bar.name}`}</Typography>
         <Typography style={{fontSize:12,color:'black'}}>{`(set total: ${bar.mark})`}</Typography>

         </Grid>
      </Grid>)
      return null;
    }));

  }


    return (<ThemeProvider theme={theme}>
       <Dialog
        open={open}
   //     TransitionComponent={Transition}
        keepMounted
        onClose={handleHideDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">This set</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Box border={4}>
            <Grid>
            {renderGraph()}

            </Grid>

          </Box>

          </DialogContentText>
        </DialogContent>

      </Dialog>
      <Grid container style={{alignItems:'center',marginTop:'10vh',justifyContent:'center',padding:'3%'}}>
        <Grid direction="column" container className={classes.container}>
        <Grid item
                onClick={() => {
                  setCurrentMenuItem(0);
                }}
                >
                  <ArrowBackIcon />
                </Grid>
          {stats.map((stat,inx) => {
            return(<Grid direction='column' container key={inx.toString()} style={{backgroundColor: theme.palette.primary.light,borderRadius:10,alignItems:'center',margin:10,alignSelf:'center'}}>
            <Grid container justify='space-between' style={{backgroundColor:theme.palette.primary.dark,borderRadius:10,margin:'1.5%',padding:'2%',alignSelf:'center',width:'90%'}}>
            <Typography style={{color:'white',fontWeight:'bold'}}>Set:</Typography>
             <Typography style={{color:'white',fontWeight:'bold'}}>Level</Typography>
             <Grid container justify='space-between'>
             <Typography style={{color:'white'}}>{stat.set_name}</Typography>
             <Typography style={{color:'white'}}>{stat.level_name}</Typography>
             </Grid>

              </Grid>
              <Grid container justify='space-between' style={{backgroundColor:theme.palette.primary.dark,borderRadius:10,margin:'1.5%',padding:'2%',alignSelf:'center',width:'90%'}}>
                  <Grid container justify='space-between'>
                    <Typography style={{color:'white',fontWeight:'bold'}} >Highest Audio Score</Typography>
                    <Typography style={{color:'white'}}>{stat.highest_audio_score}</Typography>
                    </Grid>
                    <Grid container justify='space-between' style={{backgroundColor:theme.palette.primary.dark}}>
                    <Typography style={{color:'white',fontWeight:'bold'}} >Highest quiz Score</Typography>
                    <Typography style={{color:'white'}}>{stat.highest_quiz_score}</Typography>
                    </Grid>
                    <Grid container justify='space-between' style={{backgroundColor:theme.palette.primary.dark}}>
                    <Typography style={{color:'white',fontWeight:'bold'}} >Average Audio Score</Typography>
                    <Typography style={{color:'white'}}>{stat.average_audio_score}</Typography>
                    </Grid>
                    <Grid container justify='space-between' style={{backgroundColor:theme.palette.primary.dark}}>
                    <Typography style={{color:'white',fontWeight:'bold'}} >Average Audio Score</Typography>
                    <Typography style={{color:'white'}}>{stat.average_audio_score}</Typography>
                    </Grid>
                    <Grid container justify='space-between' style={{backgroundColor:theme.palette.primary.dark}}>
                    <Typography style={{color:'white',fontWeight:'bold'}} >Best Total</Typography>
                    <Typography style={{color:'white'}}>{stat.best_total}</Typography>
                    </Grid>
                    <Grid container justify='space-between' style={{backgroundColor:theme.palette.primary.dark}}>
                    <Typography style={{color:'white',fontWeight:'bold'}} >Average Total</Typography>
                    <Typography style={{color:'white'}}>{stat.average_total}</Typography>
                  </Grid>
                  <Grid container style={{justifyContent:'flex-end'}}>
                  <Grid item style={{ justifyContent:'flex-end', padding:5,backgroundColor:theme.palette.primary.light,borderRadius:5}}>
                <Equalizer onClick={() => {
                  // setCurrentSet(stat.set_id);
                  fetchSetStats(stat.set_id);
                }} style={{color:'white'}} />

                  </Grid>
                    </Grid>


                </Grid>
              </Grid>)
          })}


          </Grid>

          </Grid>
          </ThemeProvider>);

              }
 export default InstructorStats;

