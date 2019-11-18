import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    margin: theme.spacing(2),
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    '-webkit-transform': 'translate(-50%, -50%)',
    transform: 'translate(-50%, 50%)'
  },
}))

export function AuthPage(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      {props.children}
    </Paper>
  )
}