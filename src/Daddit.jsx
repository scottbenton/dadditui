import React from 'react';
import { themes, constructMuiTheme } from 'themes/themeCreator';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter, Route } from 'react-router-dom';
import { Nav } from 'components/shared/navigation/Nav';

import AuthInstance, { AuthContext } from 'api/auth';

import { PAGES } from 'constants/Pages';
import * as ROUTES from 'constants/routes';


export function Daddit(props) {

  const DEFAULT_THEME = 'lightBlue';

  const myTheme = constructMuiTheme(themes[DEFAULT_THEME]);

  const pageProps = {
  };

  return (
    <ThemeProvider theme={myTheme}>
      <AuthContext.Provider value={new AuthInstance()}>
        <CssBaseline />
        <BrowserRouter>
          <Nav {...pageProps}>
            {Object.keys(PAGES).map(pageKey => (
              <Route key={PAGES[pageKey].title} exact path={ROUTES[pageKey]} component={() => PAGES[pageKey].component(pageProps)} />
            ))}
          </Nav>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}