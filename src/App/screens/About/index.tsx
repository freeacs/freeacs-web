import * as React from 'react';
import AboutScreen from './components/AboutScreen';
import { Route, Switch } from 'react-router';

export default function AboutRoute() {
  return (
    <Switch>
      <Route path="/" component={AboutScreen} />
    </Switch>
  );
}
