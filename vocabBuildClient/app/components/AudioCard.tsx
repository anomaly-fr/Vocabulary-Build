/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React,{ useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { useSpeechSynthesis } from 'react-speech-kit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
import { Theme } from '../constants/theme';
import {myConsole} from '../constants/constants';


const theme=Theme;
const useStyles = makeStyles({
  container: {
  //  width: '100%',
    height: window.innerHeight,
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0vh',
    elevation:1,
  },
  card: {
    borderRadius: 25,
    elevation: 1,
    width: window.innerWidth * 0.85,
    marginTop: '10vh',
  //  height: 500,
    padding: '1%',
    alignSelf: 'flex-start',
flexDirection: 'row',
backgroundColor: 'white'
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
   setCurrentRound : (r : number) => void;
   setId : number;
}

// const words = ["Access","Repository","Enhance","Mystical"];



const AudioCard: React.FC<Props> = ({setCurrentRound,setId}) => {
  const [words,setWords] = useState([]);

  const [spelling,setSpelling] = useState('')
  const [questionNumber,setQuestionNumber] = useState<number>(0);
  const [show,setShow] = useState(true)
  const { speak,voices } = useSpeechSynthesis();
  const classes = useStyles();
  const [open,setOpen] = useState<boolean>(false);
  const [score,setScore] = useState<number>(0);
  const [bestScore,setBestScore] = useState<number>(0);
  const [text,setText] = useState<string>('');
  const [answered,setAnswered] = useState<boolean>(false);

  // myConsole.log(voices.length)

const validate = () => {
  if(spelling.toLowerCase() === words[questionNumber].word_title.toLowerCase()){
    setScore(score+1);
    setSpelling('')
    setText('Correct')
    setAnswered(true);
  return 'Correct';

  }

  setText(`Incorrect. The correct spelling is ${words[questionNumber].word_title}.`)
  return 'Incorrect'

}
const handleShowDialog = () => {

  setOpen(true);
}

const handleHideDialog = () => {
  setCurrentRound(0)
  setOpen(false);
}


const fetchWords = () => {
  Axios.get(`http://localhost:3000/api/getWordsBySetId/${setId}`)
    .then((response) => {
      let temp = response.data;
      setWords(temp);
   //   setQuizLoaded(true);
      return myConsole.log(response.data);
    })
    .catch((e) => {
      myConsole.log(e);
    });
};

useEffect(() => {
  fetchWords();

},[]);
const updateScore = () => {
  myConsole.log(`Mail ${window.localStorage.getItem('email')}`)
  Axios.post(`http://localhost:3000/api/updateBestScore/audio`,{


    email: 'a',       //window.localStorage.getItem('email'),
    set_id : setId,
    best_score_audio : score


  })
  .then((response) => {
    handleShowDialog();

    myConsole.log("result "+JSON.stringify(response.data));
    setBestScore(response.data[0].best_score_audio);

    return myConsole.log(JSON.stringify(response.data));
  })
  .catch((e) => {
    myConsole.log(e);
  });

}



  return(<ThemeProvider theme={theme}>
<Dialog
        open={open}
   //     TransitionComponent={Transition}
        keepMounted
        onClose={handleHideDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Audio Round Completed!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
  {`You scored ${score}/${words.length}! Your best score for this set is ${bestScore}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          onClick={() => {
            setCurrentRound(0);
            handleHideDialog();

            }}
            color="primary">
            Okay
          </Button>
          {/* <Button
          onClick={() => {
            handleHideDialog();
            deleteWord();
          }}
           color="primary">
            Yes
          </Button> */}
        </DialogActions>
      </Dialog>
 <Grid container style={{ margin: '1%',alignItems: 'center' }}>

          <ArrowBackIcon
          onClick={() => {
            setCurrentRound(0);
          }}
           />

        </Grid>


  <Grid container className={classes.container}>
    <Grid container direction='column' className={classes.card}>

      <Grid item className={classes.triangle} />

     <Grid container direction="column" style={{flex:4,flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
       <Grid container direction='row' style={{alignItems: 'center',alignSelf: 'center',justifyContent: 'center',padding: '2%'}}>
       <Typography style={{color: theme.palette.primary.light}}>{`${questionNumber+1}.`}</Typography>

       <VolumeUpIcon onClick={() => {
         speak({ text:`Spell`,rate:0.5,voice: voices[0] })
         speak({ text: words[questionNumber].word_title,rate:1,voice: voices[0]})
         }} style={{color: theme.palette.primary.light}} fontSize="large"/>
       <Grid direction='column'>
       <Typography  style={{color: theme.palette.primary.light}}>Click to play sound</Typography>

       </Grid>


       </Grid>
       <TextField
       value={spelling}
       onChange={(value) => {setSpelling(value.target.value)
      }}

     style={{width: '50%'}}
     variant='outlined'

     />
     <Grid container direction="row" style={{alignItems: 'center',justifyContent: 'center'}}>
     <Button
                         // type="submit"
                        //  fullWidth
                          variant="contained"
                          color="primary"
                          style={{width:'50%',marginTop: 10}}
                          onClick={() => {
                            validate()
                            setShow(1)
                          }}
                     //     className={classes.submit}
                        >
                        Check
                        </Button>

     </Grid>
     <Grid item style={{marginTop: '2%',color: theme.palette.primary.dark}}>
     <Typography style={{backgroundColor: theme.palette.primary.dark,padding:'2%',color: 'white',borderRadius:5}}>{text}</Typography>

     </Grid>



     </Grid>


     <Grid item style={{alignItems: 'center',justifyContent: 'space-between'}}>
       <Grid
       onClick={() => {
          if(questionNumber + 1 !== words.length){
            setQuestionNumber(questionNumber+1)
            setSpelling('')
            setText('')
            setAnswered(false);

           }else{
             updateScore();
           }



        }}
        container className={classes.circle}>
       <ArrowForwardIcon style={{color: 'white',height: 20,width:20,alignSelf: 'center'}} />

       </Grid>


     </Grid>


     </Grid>






  </Grid>
  </ThemeProvider>)

};

export default AudioCard;
