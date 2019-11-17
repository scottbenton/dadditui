import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";



import { useHistory } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { makeQueryParams } from "utilities/routeHelpers";

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 1000,
    whiteSpace: "pre-wrap"
  }
}));

export function ListKids(props) {
  const { kids } = props;

  const classes = useStyles();

  let history = useHistory();

  const handleKidOpen = name => {
    history.push(
      ROUTES.KIDS +
        makeQueryParams([
          {
            key: "kid",
            value: name
          }
        ])
    );
  };

  return (
    <>
      {Array.isArray(kids) && (
          <>
            {kids.map(kid => (
              <Card key={kid.name} className={classes.card}>
                <CardActionArea onClick={() => handleKidOpen(kid.name)}>
                  <CardContent>
                    <Typography variant="h6">
                      {kid.name}
                    </Typography>
                    <Typography textColor="textSecondary">
                      {kid.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </>
      )}
    </>
  );
}
