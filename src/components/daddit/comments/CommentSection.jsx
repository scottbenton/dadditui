import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import Typography from "@material-ui/core/Typography";
import { getUserNameFromID } from "utilities/databaseHelper";
import { OpenButton } from "components/shared/OpenButton";
import { DialogWrapper } from "components/shared/DialogWrapper";
import { CreateComment } from "components/daddit/comments/CreateComment";

const useStyles = makeStyles(theme => ({
  comment: props => ({
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginLeft: theme.spacing(props.commentDepth),
    marginRight: 0,
    backgroundColor:
      props.commentDepth % 2 === 1 ? "#e6e6e6" : theme.palette.background.paper
  })
}));

export function CommentSection(props) {
  const { comments, commentID, commentDepth } = props;

  console.log(comments);
  const currentComment = comments[commentID];

  const classes = useStyles({ commentDepth });
  const { database } = useDatabase();

  const addReply = async newCommentID => {
    const ref = await database.ref("comments/" + commentID + "/replyKeys");
    const newKey = ref.push().getKey();
    console.log(newKey, newCommentID);
    ref.update({ ["/" + newKey]: newCommentID });
  };
  return (
    <>
      {currentComment && (
        <div className={classes.comment}>
          <Typography>{currentComment.text}</Typography>
          <Typography>{"-" + currentComment.authorDisplayName}</Typography>
          <div className="ActionsHolder">
            <OpenButton buttonContent="reply">
              <DialogWrapper title="replying">
                <CreateComment addCommentToParent={addReply} />
              </DialogWrapper>
            </OpenButton>
          </div>
          {currentComment.replyKeys &&
            Object.values(
              currentComment.replyKeys
            ).map((replyKey, commentIndex) => (
              <CommentSection
                key={commentIndex}
                comments={comments}
                commentID={replyKey}
                commentDepth={commentDepth + 1}
              />
            ))}
        </div>
      )}
    </>
  );
}
