/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
  Button,
} from '@material-ui/core';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { Link } from 'react-router-dom';
import { Theme } from '../constants/theme';

interface Props {
  round: number;
}

const useStyles = makeStyles({
  container: {
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 1,
    width: window.innerWidth * 0.85,
    padding: '3%',
  },
  button: {
    width: window.innerWidth / 4.5,
    // alignSelf: 'center',
    marginTop: '5vh',
  },
});

const theme = Theme;

const Instructions: React.FC<Props> = ({ round }) => {
  //  myConsole.log(JSON.stringify(round))
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" className={classes.container}>
        {round === 1 ? (
          <Typography component="p">
            Good spellings facilitate communication and avoid confusion. The
            following is an audio round. Spell the words you can hear correctly.
          </Typography>
        ) : round === 2 ? (
          <Typography component="p">
            The following is a multiple choice based round. Select the correct
            meanings of the words.
          </Typography>
        ) : null}
        <Link style={{ textDecoration: 'none' }} to="/audio">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={
              round === 1 ? (
                <GraphicEqIcon style={{ color: 'white' }} />
              ) : (
                <ContactSupportIcon style={{ color: 'white' }} />
              )
            }
          >
            {round === 1 ? 'Begin Audio Round' : 'Begin Quiz Round'}
          </Button>
        </Link>
      </Grid>
    </ThemeProvider>
  );
};

export default Instructions;
