import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useQuery } from "utilities/routeHelpers";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { FullPage } from "components/shared/FullPage";
import { EmptyState } from "components/shared/EmptyState";

import NoCommentImage from "resources/images/conversation.svg";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5)
  },
  title: {
    marginLeft: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2)
  }
}));

export function KidsPage(props) {
  const classes = useStyles();

  const [kidDetails, setKidDetails] = React.useState();
  const [comments, setComments] = React.useState();

  const { database } = useDatabase();

  const queryParams = useQuery();
  let kidName = queryParams.get("kid");

  useEffect(() => {
    let ref;

    const snapshotFunction = async snapshot => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        setKidDetails(data);
      }
    };

    if (database) {
      ref = database.ref("kids/" + kidName);
      ref.on("value", snapshotFunction);
    }
    return () => {
      if (ref) {
        ref.off("value", snapshotFunction);
      }
    };
  }, [database, kidName]);

  useEffect(() => {
    if (kidDetails) {
      if (kidDetails.comments) {
      } else {
        setComments([]);
      }
    }
  }, [database, kidDetails]);

  return (
    <>
      {kidDetails && (
        <div className={classes.header}>
          <Typography
            variant="h4"
            component="h1"
            className={classes.title}
            gutterBottom
          >
            {kidDetails.name}
          </Typography>
          <Typography variant="h6" component="h2">
            {kidDetails.description}
          </Typography>
        </div>
      )}
      {Array.isArray(comments) && (
        <FullPage>
          {comments.length === 0 ? (
            <EmptyState
              title="No Comments Yet"
              image={NoCommentImage}
              actions={
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Add a Comment
                </Button>
              }
            />
          ) : (
            <Typography>Comments Exist</Typography>
          )}
        </FullPage>
      )}
    </>
  );
}
