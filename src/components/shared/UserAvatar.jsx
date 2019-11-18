import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { stringToHSLColor } from "utilities/colorHelpers";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: props => props.color,
    color: "#ffffff"
  }
}));

export function UserAvatar(props) {
  const { user = {} } = props;
  let color;
  if (user) {
    color = stringToHSLColor(user.uid);
  }

  const classes = useStyles({ color: color });

  const avatarText = user.username ? user.username.slice(0, 1) : "";

  return (
    <>{user && <Avatar className={classes.avatar}>{avatarText}</Avatar>}</>
  );
}
