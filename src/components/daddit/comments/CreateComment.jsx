import React, { useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid } from "@material-ui/core";
import { updateStateObjectByKey } from "utilities/StateHelpers";
import { useDatabase } from "api/firebase/FirebaseDatabase";

import { LoadingButton } from "components/shared/LoadingButton";
import { useCurrentUser } from "api/firebase/FirebaseUser";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  buttonHolder: {
    display: "flex",
    justifyContent: "center"
  }
}));

export function CreateComment(props) {
  const { callback } = props;

  const { database } = useDatabase();
  const { user } = useCurrentUser();

  const classes = useStyles();
  const [commentData, setCommentData] = React.useState({});
  const updateCommentDataByKey = useCallback(
    (key, value) => updateStateObjectByKey(key, value, setCommentData),
    []
  );

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user) {
      updateCommentDataByKey("author", user.uid);
    }
  }, [updateCommentDataByKey, user]);

  const handleCreate = () => {
    setLoading(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Comment"
            variant="filled"
            value={commentData.text || ""}
            fullWidth
            multiline
            rows={4}
            rowsMax={10}
            onChange={evt => updateCommentDataByKey("text", evt.target.value)}
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonHolder}>
          <Button
            className={classes.button}
            color="primary"
            variant="outlined"
            onClick={callback}
          >
            Cancel
          </Button>
          <LoadingButton
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => handleCreate()}
            loading={loading}
          >
            Add Comment
          </LoadingButton>
        </Grid>
      </Grid>
    </div>
  );
}
