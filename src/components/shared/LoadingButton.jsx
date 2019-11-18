import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  buttonHolder: {
    position: "relative"
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export function LoadingButton(props) {
  const { loading, children, disabled, ...otherProps } = props;
  const classes = useStyles();

  return (
    <div className={classes.buttonHolder}>
      <Button disabled={disabled || loading} {...otherProps}>
        {children}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}
