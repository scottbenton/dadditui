import React from "react";
import { AuthPage } from "components/shared/AuthPage";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import * as ROUTES from "constants/routes";
import { updateStateObjectByKey } from "utilities/StateHelpers";
import { useAuth } from "api/firebase";

export function LoginPage(props) {
  const auth = useAuth();

  const [navigateHome, setNavigateHome] = React.useState(false);
  const [loginInfo, setLoginInfo] = React.useState({});
  const updateLoginInfoByKey = (key, value) =>
    updateStateObjectByKey(key, value, setLoginInfo);

  const handleSubmit = async () => {
    console.log(loginInfo);
    const { email, password } = loginInfo;
    if (email && password) {
      console.log("Validation Succeded");
      await auth.doSignInWithEmailAndPassword(email, password);
      console.log("Hello?");
      setNavigateHome(true);
    } else {
      console.log("Validation Failed");
    }
  };

  return (
    <AuthPage>
      {navigateHome && <Redirect to={ROUTES.LANDING} />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="email"
            label="Email"
            value={loginInfo.email || ""}
            onChange={evt => updateLoginInfoByKey("email", evt.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="Password"
            label="Password"
            type="password"
            value={loginInfo.password || ""}
            onChange={evt => updateLoginInfoByKey("password", evt.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Grid>
      </Grid>
    </AuthPage>
  );
}
