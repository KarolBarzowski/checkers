import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Game from 'views/Game';
import Servers from 'views/Servers';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Warcaby</title>
        <meta name="title" content="Warcaby" data-react-helmet="true" />
        <meta name="description" content="Warcaby w 3d" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Servers} />
          <Route path="/:key" component={Game} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Root;
