import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Grid, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { AuthPage } from "components/shared/AuthPage";

import { updateStateObjectByKey } from "utilities/StateHelpers";
import { validateEmail } from "utilities/stringHelpers";
import { useAuth } from "api/firebase";
import { useCurrentUser } from "api/firebase/FirebaseUser";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center"
  }
}));

export function SignUpPage(props) {
  const auth = useAuth();
  const { updateUser } = useCurrentUser();
  const classes = useStyles();

  const [signUpInfo, setSignUpInfo] = React.useState({});
  const [signedIn, setSignedIn] = React.useState(false);
  const updateSignUpInfo = (key, value) =>
    updateStateObjectByKey(key, value, setSignUpInfo);
  const [showError, setShowError] = React.useState(false);

  const handleSubmit = async () => {
    const { email, password, reenterPassword, ...otherInfo } = signUpInfo;
    const { displayName } = signUpInfo;
    setShowError(true);
    console.log(signUpInfo);
    if (
      validateEmail(email) &&
      password &&
      password === reenterPassword &&
      displayName
    ) {
      await auth.doCreateUserWithEmailAndPassword(email, password);
      await auth.doUpdateProfile(otherInfo);
      updateUser();
      setSignedIn(true);
    } else {
      console.log("Validation did not pass");
    }
  };

  return (
    <AuthPage>
      {signedIn && <Redirect to={ROUTES.LANDING} />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.title}>
            Sign-Up
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="Full Name"
            label="Full Name"
            value={signUpInfo.displayName || ""}
            onChange={evt => updateSignUpInfo("displayName", evt.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="Email Address"
            label="Email Address"
            value={signUpInfo.email || ""}
            onChange={evt => updateSignUpInfo("email", evt.target.value)}
            variant="outlined"
            fullWidth
            error={showError && !validateEmail(signUpInfo.email)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="Password"
            label="Password"
            type="password"
            value={signUpInfo.password || ""}
            onChange={evt => updateSignUpInfo("password", evt.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="Reenter-Password"
            label="Retype Password"
            type="password"
            value={signUpInfo.reenterPassword || ""}
            onChange={evt =>
              updateSignUpInfo("reenterPassword", evt.target.value)
            }
            variant="outlined"
            fullWidth
            error={signUpInfo.password !== signUpInfo.reenterPassword}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Account
          </Button>
        </Grid>
      </Grid>
    </AuthPage>
  );
}
