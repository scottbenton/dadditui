import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "./NavBar";
import { NavPage } from "./NavPage";
import { useCurrentUser } from "api/firebase";
import { CircularProgress } from "@material-ui/core";
import { useAuth } from "api/firebase/FirebaseContext";

const useStyles = makeStyles(theme => ({
  progress: {
    position: "absolute",
    top: "50%",
    right: "50%"
  }
}));

export function Nav(props) {
  const classes = useStyles();
  const { children, ...otherProps } = props;

  const { user, setUser } = useCurrentUser();
  console.log(user, typeof user);
  return (
    <>
      {typeof user !== "undefined" ? (
        <>
          <NavBar {...otherProps} />
          <NavPage>{children}</NavPage>
        </>
      ) : (
        <CircularProgress className={classes.progress} />
      )}
    </>
  );
}
