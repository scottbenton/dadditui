import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { Typography } from "@material-ui/core";
import  { getUserNameFromID } from "utilities/databaseHelper";
import { CommentSection } from "./CommentSection";

const useStyles = makeStyles(theme => ({}));

export function ViewComments(props) {
  const { parentComment, callback } = props;
  const { database } = useDatabase();

  const [comments, setComments] = React.useState();

  useEffect(() => {
    const snapshotHelper = async dataPromise => {
      const snapshot = await dataPromise;
      return snapshot.val();
    };

    const loadComments = async currentComment => {
      return new Promise(async (resolve, reject) => {
        let newComment = { ...currentComment };
        const authorPromise = getUserNameFromID(newComment.author, database);
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
          newComment.replies = fulfilledReplies.map((reply, replyIndex) => {
            return {...reply, id:replies[replyIndex]}
          });
          newComment.authorDisplayName = await authorPromise;
          resolve(newComment);
        } else {
          newComment.authorDisplayName = await authorPromise;
          resolve(newComment);
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

  return <>{comments && <CommentSection comment={comments} commentDepth={0}/>}</>;
}
