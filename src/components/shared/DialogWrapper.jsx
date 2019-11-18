import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    width: "100%"
  },
  title: {
    float: "left",
    flexGrow: 1
  },
  closeButton: {
    float: "right"
  }
}));

export function DialogWrapper(props) {
  const { children, title, open, setOpen } = props;

  const classes = useStyles();
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
      <div className={classes.header}>
        <DialogTitle className={classes.title}>{title}</DialogTitle>
        <IconButton
          className={classes.closeButton}
          color="inherit"
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {React.cloneElement(children, { callback: () => setOpen(false) })}
    </Dialog>
  );
}
