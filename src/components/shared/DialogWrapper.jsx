import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

export function DialogWrapper(props) {
  const { children, title, open, setOpen } = props;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      {React.cloneElement(children, { handleCancel: () => setOpen(false) })}
    </Dialog>
  );
}
