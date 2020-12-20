import { Typography, Button,FormControlLabel,Checkbox,TextField,makeStyles,ThemeProvider,createMuiTheme } from '@material-ui/core';
import { orange, purple } from '@material-ui/core/colors';
import React from 'react';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background : 'linear-gradient(45deg,#FE6B8B,#FF8E53)',
    border : 0.5,
    borderRadius : 10,
    borderColor : 'black',
    padding : '10px 30px',
    fontSize : 10,
    color : 'white',



  }

});

const theme = createMuiTheme({
  palette : {
    primary : {
      main : orange[800]

    },
    secondary : {
      main : purple[800]
    }
  }
})

const OrangeButton = ({name}) => {
  const classes = useStyles()
return(<Button className={classes.root}>{name}</Button>)
}
export default function Login() {

  return(<div>
     <OrangeButton name='Button' />
    {/* <Link to='/'>
   Go Home

    </Link> */}
    <Link style={{textDecoration: 'none'}} to='/some'>
<Button style={{backgroundColor: 'teal',fontFamily:'serif',color:'white'}} variant='contained'>Something</Button>

    </Link>
<ThemeProvider theme={theme}>
<TextField
     variant='outlined'
   type='password'
   color='secondary'
   label='Type stuff'
     />
</ThemeProvider>
    <FormControlLabel
    style={{margin: '3%'}}
    control={<Checkbox
      inputProps={{
        'aria-label' : 'checkbox'
      }} />
    }
    label="Label"
     />


  </div>)
}
