import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { Typography } from "@material-ui/core";
import { getUserNameFromID } from "utilities/databaseHelper";
import { CommentSection } from "./CommentSection";
import { updateStateObjectByKey } from "utilities/StateHelpers";

const useStyles = makeStyles(theme => ({}));

export function ViewComments(props) {
  const { parentComment, callback } = props;
  const { database } = useDatabase();

  const { id } = parentComment;

  const [loading, setLoading] = React.useState(false);
  const [comments, setComments] = React.useState();
  const updateCommentByID = (id, comment) =>
    updateStateObjectByKey(id, comment, setComments);

  useEffect(() => {
    const snapshotFunction = async snapshot => {
      console.log(snapshot);
      const commentID = snapshot.ref.key;

      const commentNoAuthor = snapshot.val();
      console.log(commentNoAuthor);
      const replyPromises =
        commentNoAuthor.replyKeys &&
        Object.values(commentNoAuthor.replyKeys).map(key => loadComments(key));

      const authorPromise = getUserNameFromID(commentNoAuthor.author, database);

      let comment = { ...commentNoAuthor };
      comment.authorDisplayName = await authorPromise;

      replyPromises && (await Promise.all(replyPromises));
      updateCommentByID(commentID, comment);
    };
    //   const snapshotHelper = async dataPromise => {
    //     const snapshot = await dataPromise;
    //     return snapshot.val();
    //   };

    const loadComments = commentID =>
      database.ref("comments/" + commentID).on("value", snapshotFunction);
    //   const loadComments = async currentComment => {
    //     return new Promise(async (resolve, reject) => {
    //       let newComment = { ...currentComment };
    //       const authorPromise = getUserNameFromID(newComment.author, database);
    //       let replies = [];
    //       if (typeof currentComment.replyKeys === "object") {
    //         replies = Object.values(currentComment.replyKeys);
    //       }
    //       if (replies.length > 0) {
    //         const replyPromises = replies.map(async replyKey => {
    //           const reply = await snapshotHelper(
    //             database.ref("comments/" + replyKey).once("value")
    //           );
    //           return loadComments(reply);
    //         });
    //         const fulfilledReplies = await Promise.all(replyPromises);
    //         newComment.replies = fulfilledReplies.map((reply, replyIndex) => {
    //           return { ...reply, id: replies[replyIndex] };
    //         });
    //         newComment.authorDisplayName = await authorPromise;
    //         resolve(newComment);
    //       } else {
    //         newComment.authorDisplayName = await authorPromise;
    //         resolve(newComment);
    //       }
    //     });
    //   };

    if (id && database && typeof comments !== "object") {
      setComments({});
      loadComments(id);
    }

    return () => {
      typeof comments === "object" &&
        Object.keys(comments).forEach(commentID => {
          database.ref("comments/" + commentID).off("value", snapshotFunction);
        });
    };
  }, [id, database, comments]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <>
      {typeof comments === "object" && (
        <CommentSection comments={comments} commentID={id} commentDepth={0} />
      )}
    </>
  );
}
