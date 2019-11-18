import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

import { useHistory } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { makeQueryParams } from "utilities/routeHelpers";
import { OpenButton } from "components/shared/OpenButton";
import { DialogWrapper } from "components/shared/DialogWrapper";
import { CreateKid } from "./CreateKid";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { useCurrentUser } from "api/firebase/FirebaseUser";
import { useDatabase } from "api/firebase/FirebaseDatabase";

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 1000,
    whiteSpace: "pre-wrap"
  },
  fab: {
    position: "fixed",
    right: theme.spacing(1),
    bottom: theme.spacing(1)
  }
}));

export function ListKids(props) {
  const { kids } = props;

  const classes = useStyles();

  let history = useHistory();
  const { user } = useCurrentUser();
  const { database } = useDatabase();

  let userSubscriptions = {};
  if (user && user.adoptions) {
    userSubscriptions = user.adoptions;
  }
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

  const handleSubscribe = (key, subscribed) => {
    if (subscribed >= 0) {
      const key = Object.keys(userSubscriptions)[subscribed];
      database.ref("users/" + user.uid + "/adoptions/" + key).remove();
    } else {
      database.ref("users/" + user.uid + "/adoptions").push(key);
    }
  };

  return (
    <>
      {kids && (
        <>
          {Object.keys(kids).map(kidKey => {
            const kid = kids[kidKey];
            const subscribed = Object.values(userSubscriptions).findIndex(
              sub => {
                return sub === kidKey;
              }
            );

            return (
              <Card key={kid.name} className={classes.card}>
                <CardActionArea onClick={() => handleKidOpen(kid.name)}>
                  <CardContent>
                    <Typography variant="h6">{kid.name}</Typography>
                    <Typography color="textSecondary">
                      {kid.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {user && (
                    <Button onClick={() => handleSubscribe(kidKey, subscribed)}>
                      {subscribed >= 0 ? "Unsubscribe" : "Subscribe"}
                    </Button>
                  )}
                </CardActions>
              </Card>
            );
          })}
        </>
      )}
      <OpenButton
        fab
        className={classes.fab}
        color="primary"
        buttonContent={<AddIcon />}
      >
        <DialogWrapper title="Create a Kid">
          <CreateKid />
        </DialogWrapper>
      </OpenButton>
    </>
  );
}
