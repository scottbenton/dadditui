import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { Typography } from "@material-ui/core";
import  { getUserNameFromID } from "utilities/databaseHelper";

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
    return(<div className={classes.comment}>
        <Typography>
            {comment.text}
        </Typography>
        <Typography>
            {"-" + comment.authorDisplayName}
        </Typography>
        {Array.isArray(comment.replies) && comment.replies.map( (reply, commentIndex) =>
            <CommentSection key={commentIndex} comment={reply} commentDepth={commentDepth+1}/>
        )}
    </div>);
}