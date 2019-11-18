import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
    maxWidth: 1000,
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

export function FullPage(props) {
  const { children } = props;
  const classes = useStyles();

  return <Paper className={classes.paper}>{children}</Paper>;
}
