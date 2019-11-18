import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import Typography from "@material-ui/core/Typography";
import  { getUserNameFromID } from "utilities/databaseHelper";
import { OpenButton } from "components/shared/OpenButton";
import { DialogWrapper } from "components/shared/DialogWrapper"
import { CreateComment } from "components/daddit/comments/CreateComment"

const useStyles = makeStyles(theme => ({
    comment: props => ({
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        marginLeft: theme.spacing(props.commentDepth),
        marginRight: 0,
        backgroundColor: props.commentDepth % 2 === 1 ? "#e6e6e6" : theme.palette.background.paper
    })
}));

export function CommentSection(props) {
    const { comment, commentDepth } = props;
    const classes = useStyles({commentDepth});
    const { database } = useDatabase();
    const addReply = async (newCommentID) =>
    database
      .ref("comments/" + comment.id + "/replyKeys")
      .update({ key:newCommentID });
    return(<div className={classes.comment}>
        <Typography>
            {comment.text}
        </Typography>
        <Typography>
            {"-" + comment.authorDisplayName}
        </Typography>
        <div className="ActionsHolder">
            <OpenButton buttonContent="reply">
                <DialogWrapper title="replying">
                    <CreateComment addCommentToParent={addReply}/>
                </DialogWrapper>
            </OpenButton>
        </div>
        {Array.isArray(comment.replies) && comment.replies.map( (reply, commentIndex) =>
            <CommentSection key={commentIndex} comment={reply} commentDepth={commentDepth+1}/>
        )}
    </div>);
}