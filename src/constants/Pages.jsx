import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "constants/routes";

import { LandingPage } from "pages/LandingPage";
import LandingIcon from "@material-ui/icons/Home";

import { LoginPage } from "pages/LoginPage";
import LoginIcon from "@material-ui/icons/VpnKey";

import { SignUpPage } from "pages/SignUpPage";
import SignUpIcon from "@material-ui/icons/PersonAdd";

import { BrowsePage } from "pages/BrowsePage";
import BrowseIcon from "@material-ui/icons/Pageview";

export const PAGES = {
  LOGIN: {
    title: "Login",
    icon: <LoginIcon />,
    navBar: false,
    link: React.forwardRef((props, ref) => (
      <Link to={ROUTES.LOGIN} innerRef={ref} {...props} />
    )),
    component: props => <LoginPage {...props} />,
    path: ROUTES.LOGIN
  },
  LANDING: {
    title: "Landing",
    icon: <LandingIcon />,
    navBar: false,
    link: React.forwardRef((props, ref) => (
      <Link to={ROUTES.LANDING} innerRef={ref} {...props} />
    )),
    component: props => <LandingPage {...props} />,
    path: ROUTES.LANDING
  },
  SIGN_UP: {
    title: "Sign Up",
    icon: <SignUpIcon />,
    navBar: false,
    link: React.forwardRef((props, ref) => (
      <Link to={ROUTES.SIGN_UP} innerRef={ref} {...props} />
    )),
    component: props => <SignUpPage {...props} />,
    path: ROUTES.SIGN_UP
  },
  BROWSE: {
    title: "Browse Kids",
    icon: <BrowseIcon />,
    navBar: true,
    link: React.forwardRef((props, ref) => (
      <Link to={ROUTES.BROWSE} innerRef={ref} {...props} />
    )),
    component: props => <BrowsePage {...props} />,
    path: ROUTES.BROWSE
  }
};
