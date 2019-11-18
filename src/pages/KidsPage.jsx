import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useQuery } from "utilities/routeHelpers";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { FullPage } from "components/shared/FullPage";
import { EmptyState } from "components/shared/EmptyState";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import NoCommentImage from "resources/images/conversation.svg";
import { OpenButton } from "components/shared/OpenButton";
import { DialogWrapper } from "components/shared/DialogWrapper";
import { CreateComment } from "components/daddit/comments/CreateComment";
import AddIcon from "@material-ui/icons/Add";
import { getUserNameFromID } from "utilities/databaseHelper";
import { ViewComments } from "components/daddit/comments/ViewComments";

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  title: {
    marginLeft: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(2)
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 1000,
    whiteSpace: "pre-wrap"
  }
}));

export function KidsPage(props) {
  const classes = useStyles();

  const [kidDetails, setKidDetails] = React.useState();
  const [comments, setComments] = React.useState();

  const [openComment, setOpenComment] = React.useState();

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
    const snapshotFunction = async commentPromises => {
      const commentSnapshots = await Promise.all(commentPromises);
      const commentData = commentSnapshots.map(commentSnapshot =>
        commentSnapshot.val()
      );
      const commentAuthorPromises = commentData.map(comment => {
        return getUserNameFromID(comment.author, database);
      });
      const commentAuthors = await Promise.all(commentAuthorPromises);
      const commentDataWithAuthors = commentData.map(
        (comment, commentIndex) => {
          return {
            ...comment,
            authorDisplayName: commentAuthors[commentIndex]
          };
        }
      );
      setComments(commentDataWithAuthors);
    };
    if (kidDetails) {
      if (kidDetails.comments) {
        let commentArray = Object.values(kidDetails.comments);
        let commentPromises = commentArray.map(({ key }) => {
          return database.ref("comments/" + key).once("value", data => data);
        });
        snapshotFunction(commentPromises);
      } else {
        setComments([]);
      }
    }
  }, [database, kidDetails]);

  const addCommentToKid = async commentID =>
    database
      .ref("kids/" + kidDetails.name + "/comments")
      .push()
      .set({ key: commentID });

  const handleCommentOpen = comment => {
    setOpenComment(comment);
  }; //TODO: FILL IN

  return (
    <>
      <DialogWrapper
        title="Comment"
        open={Boolean(openComment)}
        setOpen={setOpenComment}
      >
        <ViewComments parentComment={openComment} />
      </DialogWrapper>
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
        <>
          {comments.length === 0 ? (
            <FullPage>
              <EmptyState
                title="No Discussions Yet"
                image={NoCommentImage}
                actions={
                  <OpenButton
                    buttonContent="Start a Discussion"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    <DialogWrapper title="New Discussion">
                      <CreateComment addCommentToParent={addCommentToKid} />
                    </DialogWrapper>
                  </OpenButton>
                }
              />
            </FullPage>
          ) : (
            <>
              {comments.map((comment, commentIndex) => (
                <Card key={commentIndex} className={classes.card}>
                  <CardActionArea onClick={() => handleCommentOpen(comment)}>
                    <CardContent>
                      <Typography variant="h6">{comment.text}</Typography>
                      <Typography color="textSecondary">
                        {comment.authorDisplayName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
              <OpenButton
                buttonContent={<AddIcon />}
                fab
                color="primary"
                className={classes.fab}
              >
                <DialogWrapper title="New Discussion">
                  <CreateComment addCommentToParent={addCommentToKid} />
                </DialogWrapper>
              </OpenButton>
            </>
          )}
        </>
      )}
    </>
  );
}
