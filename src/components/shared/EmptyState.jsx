import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  image: {
    maxWidth: 400,
    margin: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    width: "98%"
  }
}));

export function EmptyState(props) {
  const { title, description, image, actions } = props;

  const classes = useStyles();

  return (
    <>
      {image && <img src={image} alt="" className={classes.image} />}
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="h5" color="textSecondary">
          {description}
        </Typography>
      )}
      {actions}
    </>
  );
}
