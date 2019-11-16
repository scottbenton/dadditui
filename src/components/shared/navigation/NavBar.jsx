import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

import { useCurrentUser } from "api/firebase";

import { UserAvatar } from "components/shared/UserAvatar";

import { PAGES } from "constants/Pages";
import { IconButton } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  spaceEater: {
    flexGrow: 1
  },
  buttonHolder: {
    display: "flex"
  },
  title: {
    textDecoration: "none",
    fontFamily: "IBM Plex Sans"
  },
  iconHolder: {
    display: "flex",
    justifyContent: "center"
  }
}));

export function NavBar(props) {
  const { pathname } = useLocation();
  const { user } = useCurrentUser();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar variant="dense">
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={3} sm={2}>
              <Typography
                variant="h5"
                component={PAGES.LANDING.link}
                color="inherit"
                className={classes.title}
              >
                daddit
              </Typography>
            </Grid>

            <Grid item xs={6} sm={8} className={classes.iconHolder}>
              {Object.values(PAGES)
                .filter(page => page.navBar)
                .map(page => (
                  <Tooltip key={page.title} title={page.title}>
                    <IconButton
                      color={pathname === page.path ? "primary" : "inherit"}
                      component={page.link}
                    >
                      {page.icon}
                    </IconButton>
                  </Tooltip>
                ))}
            </Grid>

            <Grid item xs={3} sm={2} className={classes.buttonHolder}>
              <div className={classes.spaceEater} />
              {user ? (
                <UserAvatar user={user} />
              ) : (
                <Button color="inherit" component={PAGES.LOGIN.link}>
                  {PAGES.LOGIN.title}
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
