import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

export function ViewComment(props) {
  const { parentComment, callback } = props;
  const { database } = useDatabase();

  const [comments, setComments] = React.useState();

  useEffect(() => {
    const comments = { parentComment };
    const snapshotHelper = async dataPromise => {
      const snapshot = await dataPromise;
      return snapshot.val();
    };

    const loadComments = async currentComment => {
      return new Promise(async (resolve, reject) => {
        let replies = [];
        if (typeof currentComment.replyKeys === "object") {
          replies = Object.values(currentComment.replyKeys);
        }
        if (replies.length > 0) {
          const replyPromises = replies.map(async replyKey => {
            const reply = await snapshotHelper(
              database.ref("comments/" + replyKey).once("value")
            );
            return loadComments(reply);
          });
          const fulfilledReplies = await Promise.all(replyPromises);
          let newComment = { ...currentComment };
          newComment.replies = fulfilledReplies;
          resolve(newComment);
        } else {
          resolve(currentComment);
        }
      });
    };

    if (parentComment && database) {
      loadComments(parentComment).then(newComments => {
        setComments(newComments);
      });
    }
  }, [parentComment, database]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return <>{comments && <Typography>Comments Loaded</Typography>}</>;
}
