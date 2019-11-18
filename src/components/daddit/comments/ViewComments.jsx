import React, { useEffect } from "react";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { getUserNameFromID } from "utilities/databaseHelper";
import { CommentSection } from "./CommentSection";
import { updateStateObjectByKey } from "utilities/StateHelpers";

export function ViewComments(props) {
  const { parentComment } = props;
  const { database } = useDatabase();

  const { id } = parentComment;

  const [comments, setComments] = React.useState();
  const updateCommentByID = (id, comment) =>
    updateStateObjectByKey(id, comment, setComments);

  useEffect(() => {
    const snapshotFunction = async snapshot => {
      const commentID = snapshot.ref.key;

      const commentNoAuthor = snapshot.val();
      const replyPromises =
        commentNoAuthor.replyKeys &&
        Object.values(commentNoAuthor.replyKeys).map(key => loadComments(key));

      const authorPromise = getUserNameFromID(commentNoAuthor.author, database);

      let comment = { ...commentNoAuthor };
      comment.authorDisplayName = await authorPromise;
      replyPromises && (await Promise.all(replyPromises));
      updateCommentByID(commentID, comment);
    };

    const loadComments = commentID =>
      database.ref("comments/" + commentID).on("value", snapshotFunction);

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

  return (
    <>
      {typeof comments === "object" && (
        <CommentSection comments={comments} commentID={id} commentDepth={0} />
      )}
    </>
  );
}
