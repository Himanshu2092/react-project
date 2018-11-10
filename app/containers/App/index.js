/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Create from 'containers/Create/Loadable';
import Poll from 'containers/Poll/Loadable';
import Stats from 'containers/Stats/Loadable';
import GlobalStyle from '../../global-styles';
import { Routes } from '../../constants';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path={Routes.create} component={Create} />
        <Route exact path={Routes.poll} component={Poll} />
        <Route exact path={Routes.stats} component={Stats} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
