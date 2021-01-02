/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react';
import { Grid, makeStyles, Typography, ThemeProvider, TextField , Button,Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { myConsole } from '../constants/constants';
import { Theme } from '../constants/theme';

const theme = Theme;

const Transition = React.forwardRef(function Transition(
  // eslint-disable-next-line react/require-default-props
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});



const useStyles = makeStyles({

  container: {

    padding: '4%',
    backgroundColor: theme.palette.secondary.dark,
    overflow:'auto',    //  margin: '5%',
    borderRadius: 20,
    // paddingBottom: '6%',
    // alignSelf: 'center',
    flex: 1,
  },
  heading: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
  },
  body: {
    //  margin: '10%',
    borderRadius: 20,
    backgroundColor: 'green',
    overflow:'auto',
    height:'auto',
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
    margin: '1%',
    borderRadius: 10,
    padding: '1%',
  },
  definitions: {
    color : 'white',


    backgroundColor: theme.palette.primary.light,
    borderRadius:5,
    margin:'0.5%',
    padding: '0.5%',
    width: window.innerWidth/3

  }
});

interface Props {
  levelNo : number;
  setNo : number;
  setSetSel : (set : number) => void;

}

const AddWords : React.FC<Props> = ({levelNo,setNo,setSetSel}) => {
  const [newWord,showNewWord] = useState<boolean>(false);
  const [wordTitle,setWordTitle] = useState<string>('');
  const [wordCorrectDef,setWordCorrectDef] = useState<string>('');
  const [wordIncorrect1,setWordIncorrect1] = useState<string>('');
  const [wordIncorrect2,setWordIncorrect2] = useState<string>('');
  const [wordIncorrect3,setWordIncorrect3] = useState<string>('');
  const [words,setWords] = useState([]);
  const [randomData,setRandomData] = useState<number>(0);
  const [open,setOpen] = useState<boolean>(false);
  const [currentWord,setCurrentWord] = useState();
;

  const fetchWords = () => {
    Axios.get(`http://localhost:3000/api/getWordsBySetNo/${setNo}`)
    .then((response) => {
      const arr = response.data;
       let i;
      for(i in arr){
        arr[i]={
          ...arr[i],
          id : false
        }
      }


      setWords(arr);
      // myConsole.log("to "+JSON.stringify(levels[0].level_name))

      return myConsole.log(response.data);
    })
    .catch((e) => {
      myConsole.log(e);
    });
  };

  const addWord = () => {
    Axios.post('http://localhost:3000/api/addWord', {
      word_title : wordTitle,
      word_correct_def : wordCorrectDef,
      word_incorrect_1 : wordIncorrect1,
      word_incorrect_2 : wordIncorrect2,
      word_incorrect_3 : wordIncorrect3,
      set_id : setNo

    })
      .then((response) => {
        fetchWords();
        setRandomData(Math.random());

        setWordTitle('');
        setWordCorrectDef('');
        setWordIncorrect1('');
        setWordIncorrect2('');
        setWordIncorrect3('');


        return myConsole.log(`resp ${response.data}`);
      })
      .catch((error) => {
        myConsole.log(`Error ${error}`);
      });
  };

  const deleteWord = () => {
    myConsole.log('delete');
    Axios.delete(`http://localhost:3000/api/deleteWordByWordId/${currentWord.word_id}`)
    .then((response) => {
      fetchWords();
      return myConsole.log(response);

    }).catch((error) => {
      myConsole.log(`Error ${error}`);
    })
    myConsole.log('deleted');

  }

  const handleShowDialog = () => {

   // setCurrentWord(wor);
    setOpen(true);
  }

  const handleHideDialog = () => {
    setOpen(false);
  }



  useEffect(() => {
    fetchWords();

  },[setNo])




  const classes = useStyles();
  return(<ThemeProvider theme={theme}>
    <Grid container style={{padding: '10%',alignItems:'center',justifyContent:'center',overflow:'auto'}}>
    <Grid direction="column" container className={classes.container}>
    <Dialog
        open={open}
   //     TransitionComponent={Transition}
        keepMounted
        onClose={handleHideDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete this word?"}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button
          onClick={() => {
            handleHideDialog();

            }}
            color="primary">
            No
          </Button>
          <Button
          onClick={() => {
            handleHideDialog();
            deleteWord();
          }}
           color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    <Grid
              onClick={() => {
                setSetSel(0);
              }}
              item
              style={{ padding: '1%' }}
            >
              <ArrowBackIcon />
            </Grid>
      <Grid
        container
        direction="row"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Grid
          container
          spacing={4}
          direction="row"
          style={{ alignItems: 'center' }}
        >
          <Grid container direction='column' style={{ padding: '2%'  }}>

          <Typography style={{flex:1,fontSize:20}} className={classes.createLevel}>
              {`Number of words: ${words.length}`}
            </Typography>
            <Grid container style={{marginTop: '2%'}}>
            <AddCircleOutlineIcon
              onClick={() => {
                showNewWord(!newWord);
              }}
            />

             <Typography className={classes.createLevel}>
              Add Word{' '}
            </Typography>

            </Grid>




          </Grid>
          {newWord ? (
            <Grid container>

              <TextField
                value={wordTitle}
                size='small'
                variant="outlined"
                placeholder="Word Title"
                onChange={(event) => setWordTitle(event.target.value)}
              />
              <Grid container direction='row' spacing={1} style={{padding: '0.5%',width:'100%',marginTop:'2%'}}>
              <TextField
              size='small'
                style={{marginRight: 10,marginBottom:10}}
                value={wordCorrectDef}
                variant="outlined"
                placeholder="Correct Definition"
                onChange={(event) => setWordCorrectDef(event.target.value)}
              />
               <TextField
              size='small'
              style={{marginRight: 10}}

                value={wordIncorrect1}
                variant="outlined"
                placeholder="Incorrect Defintion 1"
                onChange={(event) => setWordIncorrect1(event.target.value)}
              />
               <TextField
              size='small'
              style={{marginRight: 10}}

                value={wordIncorrect2}
                variant="outlined"
                placeholder="Incorrect Defintion 2"
                onChange={(event) => setWordIncorrect2(event.target.value)}
              />
               <TextField
              size='small'
         //     style={{margin : '1%'}}

                value={wordIncorrect3}
                variant="outlined"
                placeholder="Incorrect Defintion 3"
                onChange={(event) => setWordIncorrect3(event.target.value)}
              />
                </Grid>

            </Grid>
          ) : null}

        </Grid>
        {newWord ? (
            <Grid container style={{marginTop: '4%'}}>
              <Button

                variant="contained"
                onClick={() => {
                  if (wordTitle !== '' && wordCorrectDef !== ''
                  && wordIncorrect1 !== '' && wordIncorrect2 !== '')
                  addWord();
                }}
                color="primary"
              >
                Add
              </Button>
            </Grid>
          ) : null}


      </Grid>
      <Grid style={{ flex: 1,marginBottom: 100,marginTop:20 }}>
          {words.map((wor, idx) => {
            return (
              <Grid
              style={{marginBottom:'5%'}}

                className={classes.level}
                style={{ backgroundColor: Theme.palette.primary.dark }}
                container
                key={idx.toString()}
              >



                <Grid


                 container direction='row' justify='space-between'>
                <Typography

style={{ color: 'white'}}>
 {wor.word_title}
</Typography>
                {!words.id ? <ExpandMoreIcon
                onClick={() => {
                  wor.id = !wor.id;
                  setRandomData(Math.random());
                //  fetchWords();
                }}
                 /> : <ExpandLessIcon
                 onClick={() => {
                  wor.id = !wor.id;
                  setRandomData(Math.random());
                //  fetchWords();
                }}
                  />}

                  </Grid>

                 {wor.id ? <Grid container direction='column'>
                  <Typography style={{backgroundColor: 'lightgreen'}} className={classes.definitions}>{wor.word_correct_def}</Typography>

                  <Typography className={classes.definitions}>{wor.word_incorrect_1}</Typography>
                  <Typography className={classes.definitions}>{wor.word_incorrect_2}</Typography>
                  <Typography className={classes.definitions}>{wor.word_incorrect_3}</Typography>
                  <Grid item style={{justifyContent:'flex-end',marginTop:20}}>
                    <Button
                    onClick={() => {
                      myConsole.log('ok')
                      setCurrentWord(wor)
                      handleShowDialog()
                    }}
                    style={{alignSelf: 'flex-end'}} color='primary' variant="contained">
                      Delete word
                    </Button>
                    </Grid>

                  </Grid> : null}
              </Grid>
            );
          })}
        </Grid>
    </Grid>
    </Grid>
  </ThemeProvider>)

};

export default AddWords;
