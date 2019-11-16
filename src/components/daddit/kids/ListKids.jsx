import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.background.paper.contrastText
  }
}));

export function ListKids(props) {
  const { kids } = props;

  const classes = useStyles();

  return (
    <>
      {Array.isArray(kids) && (
        <Paper className={classes.root}>
          <List>
            {kids.map(kid => (
              <ListItem button key={kid.name}>
                <ListItemText primary={kid.name} secondary={kid.description} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}
