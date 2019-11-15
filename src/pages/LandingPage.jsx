import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

import { FullPage } from "components/shared/FullPage";
import { PAGES } from "constants/Pages";
import { useCurrentUser } from "api/firebase/FirebaseUser";
import { useAuth } from "api/firebase/FirebaseContext";
import { OpenButton } from "components/shared/OpenButton";
import { DialogWrapper } from "components/shared/DialogWrapper";
import { CreateKid } from "components/daddit/kids/CreateKid";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export function LandingPage(props) {
  const auth = useAuth();
  const { user } = useCurrentUser();
  const classes = useStyles();

  const handleLogout = () => {
    auth.doSignOut();
  };

  return (
    <FullPage>
      <Typography variant="h4">Welcome to daddit</Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        It's reddit, but for dads.
      </Typography>
      {user ? (
        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            className={classes.button}
          >
            Logout
          </Button>
          <OpenButton
            buttonContent="Create a new Kid"
            variant="outlined"
            className={classes.button}
          >
            <DialogWrapper title="Create new Kid">
              <CreateKid />
            </DialogWrapper>
          </OpenButton>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            color="primary"
            component={PAGES.SIGN_UP.link}
            className={classes.button}
          >
            {PAGES.SIGN_UP.title}
          </Button>

          <Button
            variant="contained"
            color="primary"
            component={PAGES.LOGIN.link}
            className={classes.button}
          >
            {PAGES.LOGIN.title}
          </Button>
        </>
      )}
    </FullPage>
  );
}
