import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';

import { LandingPage } from 'pages/LandingPage';
import { LoginPage } from 'pages/LoginPage';
import { SignUpPage } from 'pages/SignUpPage';

export const PAGES = {
  LOGIN: {
    title: "Login",
    link: React.forwardRef((props, ref) => <Link to={ROUTES.LOGIN} innerRef={ref} {...props} />),
    component: (props) => <LoginPage {...props} />,
  },
  LANDING: {
    title: "Landing",
    link: React.forwardRef((props, ref) => <Link to={ROUTES.LANDING} innerRef={ref} {...props} />),
    component: (props) => <LandingPage {...props} />,
  },
  SIGN_UP: {
    title: "Sign Up",
    link: React.forwardRef((props, ref) => <Link to={ROUTES.SIGN_UP} innerRef={ref} {...props} />),
    component: (props) => <SignUpPage {...props} />,
  }
}