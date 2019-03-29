import * as React from 'react';
import ProfileOverviewScreen from './components/ProfileOverviewScreen';
import { Route, Switch } from 'react-router';

export default function ProfileRoute() {
  return (
    <Switch>
      <Route path="/" component={ProfileOverviewScreen} />
    </Switch>
  );
}