/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
  Button,
} from '@material-ui/core';

import { Theme } from '../constants/theme';
import AudioCard from '../components/AudioCard';

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

const AudioRound = () => {
  return(<AudioCard />)

};

export default AudioRound;
