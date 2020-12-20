/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React,{ useState } from 'react';
import {
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
  Button,
  InputBase,
  TextField
} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import { Theme } from '../constants/theme';
import { myConsole } from '../constants/constants';


const theme=Theme;
const useStyles = makeStyles({
  container: {
    width: '100%',
    height: window.innerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:1,
    backgroundColor: 'cyan'
  },
  card: {
    borderRadius: 25,
    elevation: 1,
    width: window.innerWidth * 0.85,
  //  height: 500,
    padding: '1%',
    alignSelf: 'center',
flexDirection: 'row',
backgroundColor: 'gray'
  },
  button: {
    width: window.innerWidth / 4.5,
    // alignSelf: 'center',
    marginTop: '5vh',
  },
  triangle: {
    width: 0,
  //  height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 200,
    borderBottomWidth: 90,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.palette.primary.dark,
    borderLeftColor: 'transparent',
  },
  questionNumber : {
    color :'white',
    backgroundColor: 'pink',

  },
  circle: {
    width: 60,
    height :60,
    borderRadius: 30,
    backgroundColor: theme.palette.primary.dark,
    alignItems:'center',
    justifyContent:'center'

  }
});

interface Props {
  // setRound = (round : number) => void
}

const words = ["Access","Repository","Enhance","Mystical"];



const AudioCard: React.FC<Props> = () => {
  const [spelling,setSpelling] = useState('')
  const [questionNumber,setQuestionNumber] = useState<number>(1);
  const { speak,voices,pitch,rate } = useSpeechSynthesis();
  const classes = useStyles();
  // myConsole.log(voices.length)
  return(<ThemeProvider theme={theme}>

 <Grid direction='row' container style={{ margin: '1%' }}>
   <Link to="/home" style={{textDecoration:"none"}}>
   <Typography onClick={() => setRound(0)} style={{ color: 'white' }}>
            Back
          </Typography>
   </Link>

        </Grid>


  <Grid container className={classes.container}>
    <Grid container direction='row' className={classes.card}>

      <Grid item className={classes.triangle} />

     <Grid container direction="column" style={{flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
       <Grid container direction='row' style={{alignItems: 'center',alignSelf: 'center',justifyContent: 'center',padding: '2%'}}>
       <Typography style={{color: theme.palette.primary.light}}>{`${questionNumber}.`}</Typography>

       <VolumeUpIcon onClick={() => {
         speak({ text:`Spell`,rate:0.5,voice: voices[1] })
         speak({ text: words[questionNumber-1],rate:1,voice: voices[1]})
         }} style={{color: theme.palette.primary.light}} fontSize="large"/>
       <Grid direction='column'>
       <Typography  style={{color: theme.palette.primary.light}}>Click to play sound</Typography>

       </Grid>


       </Grid>
       <TextField
       onChange={(value) => setSpelling(value.target.value)}

     style={{width: '50%'}}
     variant='outlined'

     />
     <Grid container direction="row" style={{backgroundColor: 'yellow',alignItems: 'center',justifyContent: 'center'}}>
     <Button
                          type="submit"
                        //  fullWidth
                          variant="contained"
                          color="primary"
                          style={{width:'50%',marginTop: 10}}
                     //     className={classes.submit}
                        >
                        Check
                        </Button>

     </Grid>



     </Grid>



     <Grid container style={{alignItems: 'center',justifyContent: 'space-between',backgroundColor: 'pink'}}>
       <Grid container className={classes.circle}>
       <ArrowForwardIcon onClick={() => setQuestionNumber(questionNumber+1)} style={{color: 'white',height: 20,width:20,alignSelf: 'center'}} />

       </Grid>
       <Grid style={{backgroundColor: 'green'}}>
         xwn
       </Grid>
<CheckCircleOutlineIcon style={{color: 'white',height: 20,width:20,alignSelf: 'center'}} />

     </Grid>

     </Grid>






  </Grid>
  </ThemeProvider>)

};

export default AudioCard;
