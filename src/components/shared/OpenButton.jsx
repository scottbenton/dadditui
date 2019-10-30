import React from 'react';
import { Button, Fab } from '@material-ui/core';

export function OpenButton(props) {
  const { fab, buttonContent, children, ...other } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {
        fab ? <Fab onClick={() => setOpen(true)} {...other}>
          {buttonContent}
        </Fab> :
          <Button onClick={() => setOpen(true)} {...other}>
            {buttonContent}
          </Button>
      }
      {React.cloneElement(children, { open: open, setOpen: setOpen })}
    </>
  )
}