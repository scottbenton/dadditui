import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  page: {
    display: 'block',
    width: '100%',
  },
}));

export function NavPage(props) {
  const classes = useStyles();

  const { children } = props;

  return (
    <div className={classes.page}>
      {children}
    </div>
  )
}