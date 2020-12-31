/* eslint-disable prettier/prettier */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
  Button,
  TextField,
  Box,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Theme } from '../constants/theme';

import { myConsole } from '../constants/constants';
import TopBar from './AppBar';

const theme = Theme;
const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 10,
    padding: '3%',
  },
  question: {
    backgroundColor: theme.palette.primary.dark,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    color: 'white',
    textAlign: 'center',
    padding: '3%',
  },
  option: {
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    alignItems: 'center',
    borderRadius: 10,
    margin: '1%',
    padding: '1%',
    width: window.innerWidth / 2,
    textAlign: 'center',
    justifyContent: 'center',
  },
  box: {
    borderRadius: 20,
    //  backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.innerWidth / 1.9,
  },
});

interface Props {
  setId: number;
  setCurrentRound : (round : number) => void;
  userEmail : string;
}

const Quiz: React.FC<Props> = ({ setId,setCurrentRound,userEmail }) => {
  myConsole.log(`Email is ${userEmail}`)
  const [quiz, setQuiz] = useState([]);
  const [oneEnter, setOneEnter] = useState<boolean>(false);
  const [quizLoaded, setQuizLoaded] = useState<boolean>(false);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [open,setOpen] = useState<boolean>(false);
  const [bestScore,setBestScore] = useState<number>(0);


  const [colours, setColours] = useState([
    'transparent',
    'transparent',
    'transparent',
    'transparent',
  ]);




  const [score,setScore] = useState<number>(0);
  const shuffleOptions = (array) => {
    let i = array.length - 1;
    for (; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const fetchWords = () => {
    Axios.get(`http://localhost:3000/api/getWordsBySetId/${setId}`)
      .then((response) => {
        let temp = response.data;
        for (let i in temp) {
          let options = [];
          options.push(temp[i].word_correct_def);
          options.push(temp[i].word_incorrect_1);
          options.push(temp[i].word_incorrect_2);
          options.push(temp[i].word_incorrect_3);

          options = shuffleOptions(options);
          myConsole.log(`Shuffled ${options}`);
          temp[i] = {
            ...temp[i],
            options,
          };
        }
        setQuiz(temp);
        setQuizLoaded(true);
        return myConsole.log(response.data);
      })
      .catch((e) => {
        myConsole.log(e);
      });
  };

  useEffect(() => {
    fetchWords();
  }, [setId]);
  const handleShowDialog = () => {

    setOpen(true);
  }

  const handleHideDialog = () => {
    setCurrentRound(0)
    setOpen(false);
  }

  const updateScore = () => {
    Axios.post(`http://localhost:3000/api/updateBestScore/quiz`,{


      email: window.localStorage.getItem('email'),
      set_id : setId,
      best_score_quiz : score


    })
    .then((response) => {
      myConsole.log("result "+JSON.stringify(response.data));
      setBestScore(response.data[0].best_score_quiz);
      handleShowDialog();

      return myConsole.log(JSON.stringify(response.data));
    })
    .catch((e) => {
      myConsole.log(e);
    });

  }

  const nextQuestion = () => {
    setAnswered(false);
    if (questionNumber + 1 !== quiz.length) {
      setColours(['transparent', 'transparent', 'transparent', 'transparent']);
      setQuestionNumber(questionNumber + 1);
    } else {
       updateScore();
    }
  };
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid onClick={() => {
          setCurrentRound(0);

        }}
        item style={{marginLeft: '5%',flex:1}}>
        <ArrowBackIcon />

        </Grid>
      <Dialog
        open={open}
   //     TransitionComponent={Transition}
        keepMounted
        onClose={handleHideDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Quiz Completed!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
  {`You scored ${score}/${quiz.length}! Your best score for this set is ${bestScore}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          onClick={() => {
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
        {quizLoaded ? (
          <Grid container className={classes.container}>
            {/* Question */}
            <Grid container className={classes.question}>
              <Typography>{`${questionNumber+1}. The meaning of ${
                quiz[questionNumber].word_title
              } is`}</Typography>
            </Grid>
            <Grid
              container
              justify="center"
              style={{
                backgroundColor: 'white',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                padding: '2%',
              }}
            >
              <Box className={classes.box} border={3} borderColor={colours[0]}>
                <Typography
                  style={{ cursor: oneEnter ? 'pointer' : 'default' }}
                  onMouseEnter={() => {
                    setOneEnter(true);
                  }}
                  onClick={() => {
                    if (!answered) {
                      if (
                        quiz[questionNumber].options[0] ===
                        quiz[questionNumber].word_correct_def
                      ) {
                        myConsole.log('Correct');
                        setScore(score+1);
                        setColours([
                          'green',
                          'transparent',
                          'transparent',
                          'transparent',
                        ]);
                      } else {
                        myConsole.log("quiz[questionNumber].options[0] " + quiz[questionNumber].options[0]);
                        myConsole.log("quiz[questionNumber].word_correct_def" +  quiz[questionNumber].word_correct_def);
                        let ans: number;
                        let i: number;
                        for (i in quiz[questionNumber].options) {
                          if (
                            quiz[questionNumber].options[i] ===
                            quiz[questionNumber].word_correct_def
                          ) {
                            ans = i;
                            myConsole.log('Ans found '+ans);
                            break;
                          }
                        }
                        if (ans == 1)
                          setColours([
                            'red',
                            'green',
                            'transparent',
                            'transparent',
                          ]);
                        else if (ans == 2)
                          setColours([
                            'red',
                            'transparent',
                            'green',
                            'transparent',
                          ]);
                        else
                          setColours([
                            'red',
                            'transparent',
                            'transparent',
                            'green',
                          ]);
                      }
                      setAnswered(true);
                    }
                  }}
                  className={classes.option}
                >
                  {quiz[questionNumber].options[0]}
                </Typography>
              </Box>

              <Box className={classes.box} border={3} borderColor={colours[1]}>
                <Typography
                  onClick={() => {
                    if (!answered) {
                      if (
                        quiz[questionNumber].options[1] ===
                        quiz[questionNumber].word_correct_def
                      ) {
                        myConsole.log('C');
                        setScore(score+1);

                        setColours([
                          'transparent',
                          'green',
                          'transparent',
                          'transparent',
                        ]);
                      } else {
                        myConsole.log("quiz[questionNumber].options[1] " + quiz[questionNumber].options[1]);
                        myConsole.log("quiz[questionNumber].word_correct_def" +  quiz[questionNumber].word_correct_def);
                        let ans: number;
                        myConsole.log('i');
                        let i: number;
                        for (i in quiz[questionNumber].options) {
                          if (
                            quiz[questionNumber].options[i] ===
                            quiz[questionNumber].word_correct_def
                          ) {
                            ans = i;
                            myConsole.log('Ans found '+ans);

                            break;
                          }
                        }
                        if (ans == 0)
                          setColours([
                            'green',
                            'red',
                            'transparent',
                            'transparent',
                          ]);
                        else if (ans == 2)
                          setColours([
                            'transparent',
                            'red',
                            'green',
                            'transparent',
                          ]);
                        else
                          setColours([
                            'transparent',
                            'red',
                            'transparent',
                            'green',
                          ]);
                      }
                      setAnswered(true);
                    }
                  }}
                  style={{ cursor: oneEnter ? 'pointer' : 'default' }}
                  onMouseEnter={() => {
                    setOneEnter(true);
                  }}
                  className={classes.option}
                >
                  {quiz[questionNumber].options[1]}
                </Typography>
              </Box>
              <Box className={classes.box} border={3} borderColor={colours[2]}>
                <Typography
                  onClick={() => {
                    if (!answered) {
                      if (
                        quiz[questionNumber].options[2] ===
                        quiz[questionNumber].word_correct_def
                      ) {
                        myConsole.log('c');
                        setScore(score+1);

                        setColours([
                          'transparent',
                          'transparent',
                          'green',
                          'transparent',
                        ]);
                      } else {
                        myConsole.log("quiz[questionNumber].options[2] " + quiz[questionNumber].options[2]);
                        myConsole.log("quiz[questionNumber].word_correct_def" +  quiz[questionNumber].word_correct_def);
                        myConsole.log('i');
                        let ans: number;
                        let i: number;
                        for (i in quiz[questionNumber].options) {
                          if (
                            quiz[questionNumber].options[i] ===
                            quiz[questionNumber].word_correct_def
                          ) {
                            ans = i;
                            myConsole.log('Ans found '+ans);

                            break;
                          }
                        }
                        if (ans == 0)
                          setColours([
                            'green',
                            'transparent',
                            'red',
                            'transparent',
                          ]);
                        else if (ans == 1)
                          setColours([
                            'transparent',
                            'green',
                            'red',
                            'transparent',
                          ]);
                        else
                          setColours([
                            'transparent',
                            'transparent',
                            'red',
                            'green',
                          ]);
                      }
                      setAnswered(true);
                    }
                  }}
                  style={{ cursor: oneEnter ? 'pointer' : 'default' }}
                  onMouseEnter={() => {
                    setOneEnter(true);
                  }}
                  className={classes.option}
                >
                  {quiz[questionNumber].options[2]}
                </Typography>
              </Box>

              <Box className={classes.box} border={3} borderColor={colours[3]}>
                <Typography
                  onClick={() => {
                    if (!answered) {
                      if (
                        quiz[questionNumber].options[3] ===
                        quiz[questionNumber].word_correct_def
                      ) {
                        myConsole.log('c');
                        setScore(score+1);

                        setColours([
                          'transparent',
                          'transparent',
                          'transparent',
                          'green',
                        ]);
                      } else {
                        myConsole.log("quiz[questionNumber].options[3] " + quiz[questionNumber].options[3]);
                        myConsole.log("quiz[questionNumber].word_correct_def" +  quiz[questionNumber].word_correct_def);
                        myConsole.log('i');
                        let ans: number;

                        let i: number;
                        for (i in quiz[questionNumber].options) {
                          if (
                            quiz[questionNumber].options[i] ===
                            quiz[questionNumber].word_correct_def
                          ) {
                            ans = i;
                            myConsole.log('Ans found '+ans);

                            break;
                          }
                        }
                        if (ans == 0)
                          setColours([
                            'green',
                            'transparent',
                            'transparent',
                            'red',
                          ]);
                        else if (ans == 1)
                          setColours([
                            'transparent',
                            'green',
                            'transparent',
                            'red',
                          ]);
                        else
                          setColours([
                            'transparent',
                            'transparent',
                            'green',
                            'red',
                          ]);
                      }
                      setAnswered(true);
                    }
                  }}
                  style={{ cursor: oneEnter ? 'pointer' : 'default' }}
                  onMouseEnter={() => {
                    setOneEnter(true);
                  }}
                  className={classes.option}
                >
                  {quiz[questionNumber].options[3]}
                </Typography>
              </Box>
              <Grid container justify="center">
                <Button
                  variant={answered ? 'contained' : 'disabled'}
                  color="primary"
                  style={{ width: 200, margin: '2%' }}
                  onClick={() => {
                    nextQuestion();
                  }}
                >
                  Next Question
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </ThemeProvider>
  );
};

export default Quiz;
