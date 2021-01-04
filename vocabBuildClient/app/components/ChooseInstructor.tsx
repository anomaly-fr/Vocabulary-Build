/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography, ThemeProvider,Button,Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,Box } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import GroupIcon from '@material-ui/icons/Group';
import Axios from 'axios';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import TopBar from './AppBar';
import Levels from './Levels';
import { myConsole } from '../constants/constants';
import MyLevels from './MyLevels';
import { Theme } from '../constants/theme';
import LeaderBoard from '../containers/LeaderBoard';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const numbers = [];

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
  const [open,setOpen] = useState<boolean>(false);
  const [studyWords,setStudyWords] = useState([]);

  useEffect(() => {
    myConsole.log(`Welcome Sir ${location.state.name}`);
    setName(location.state.name);

    Axios.get('http://localhost:3000/api/getAllTutors')
    .then((response) => {
      setTutors(response.data);
      return myConsole.log(numbers)

    }).catch((error) => {
      myConsole.log(error)
    })

  }, [location]);
  const handleShowDialog = () => {

    // setCurrentWord(wor);
     setOpen(true);
   }

   const handleHideDialog = () => {
     setOpen(false);
   }



  return (
    <ThemeProvider theme={theme}>
       <Dialog
       style={{backgroundColor:theme.palette.primary.dark}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleHideDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">All added words</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" />
          <Grid container direction='column' style={{padding:'3%',backgroundColor:'white',width:500}}>
            {studyWords.map((word,inx) => {
              return(<Grid key={inx.toString()} container>
                <Box style={{padding:'1%',flex:1}} alignItems='center' justifyContent='center' border={3} borderColor={theme.palette.primary.dark}>

                <Typography style={{textAlign:'center',color:theme.palette.primary.main}} >{word.word_title}</Typography>
                </Box>
                <Box style={{padding:'1%',flex:1}} alignItems='center'justifyContent='center' border={3} borderColor={theme.palette.primary.dark}>

                <Typography style={{textAlign:'center',color:theme.palette.primary.main}} >{word.word_correct_def}</Typography>
</Box>
                </Grid>)

            })}

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
          onClick={() => {
            handleHideDialog();

            }}
            color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    <Grid container>
      <TopBar name={name} levelNo={currentLevel} logout={() => {
        history.goBack();
        myConsole.log('Logout choose inst')
      }} />

      <Grid container style={{ marginTop: '5%' }}>
        <Grid container style={{padding:'2%'}}>
        <Button
        onClick={() => {
          Axios.get("http://localhost:3000/api/getAllWords")
          .then((response) => {
            setStudyWords(response.data);
            handleShowDialog()
           return myConsole.log(response);

          }).catch((e) => {

          });


          handleShowDialog();
        }}
         fullWidth style={{backgroundColor:theme.palette.primary.dark,color:'white'}} variant="contained">Study</Button>

        </Grid>
      <Grid container>
     <Typography style={{fontSize:24,color:'white',margin:'2%',fontWeight:'bold'}}>
       Choose an instructor
     </Typography>
     </Grid>
      </Grid>

      {tutors.map((tut,inx) => {
        myConsole.log(tut)
        return(<Grid
        style={{cursor:'pointer'}}
        onMouseEnter={() => {

        }}
        onClick={() => {
          setInstructor(tut.tutor_email)
        }}
         key={inx.toString()} className={classes.square} container>
          <Typography style={{alignSelf:'center'}}>{tut.name}</Typography>
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
