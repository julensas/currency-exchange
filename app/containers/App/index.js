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

import ExchangePage from 'containers/ExchangePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import global styles
import 'styles/default.scss';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ExchangePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
