import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import { useCurrentUser } from "api/firebase/FirebaseUser";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  buttonHolder: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  }
}));

const UpvoteIcon = props => (
  <SvgIcon {...props}>
    <path d="M17 5.92L9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73c0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z" />
  </SvgIcon>
);

const DownvoteIcon = props => (
  <SvgIcon {...props}>
    <path d="M13 15.28V5.5a1 1 0 0 0-2 0v9.78A2 2 0 0 0 10 17a2 2 0 0 0 4 0a2 2 0 0 0-1-1.72zM16.5 13V5.5a4.5 4.5 0 0 0-9 0V13a6 6 0 0 0 3.21 9.83A7 7 0 0 0 12 23a6 6 0 0 0 4.5-10zm-2 7.07a4 4 0 0 1-6.42-2.2a4 4 0 0 1 1.1-3.76a1 1 0 0 0 .3-.71V5.5a2.5 2.5 0 0 1 5 0v7.94a1 1 0 0 0 .3.71a4 4 0 0 1-.28 6z" />
  </SvgIcon>
);

export function UpvoteDownvote(props) {
  const { commentID, comment } = props;
  const { database } = useDatabase();
  const { user } = useCurrentUser();
  const { uid } = user;

  const classes = useStyles();

  let currentVote = (comment.votes && comment.votes[uid]) || 0;

  const [loading, setLoading] = React.useState(false);

  const onVote = value => {
    setLoading(true);
    database
      .ref("comments/" + commentID + "/votes")
      .update({ [uid]: value })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.buttonHolder}>
      <IconButton
        color={currentVote === 1 ? "primary" : "default"}
        onClick={() => onVote(currentVote === 1 ? 0 : 1)}
        disabled={loading}
      >
        <UpvoteIcon />
      </IconButton>
      <Typography>{comment.score || 0}</Typography>
      <IconButton
        onClick={() => onVote(currentVote === -1 ? 0 : -1)}
        disabled={loading}
      >
        <DownvoteIcon color={currentVote === -1 ? "error" : "inherit"} />
      </IconButton>
    </div>
  );
}
