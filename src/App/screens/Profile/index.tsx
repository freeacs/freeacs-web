import * as React from 'react';
import ProfileOverviewScreen from './components/ProfileOverviewScreen';
import { Route, Switch } from 'react-router';
import ProfileCreateScreen from './components/ProfileCreateScreen';

export default function ProfileRoute() {
  return (
    <Switch>
      <Route exact path="/profile" component={ProfileOverviewScreen} />
      <Route path="/profile/create" component={ProfileCreateScreen} />
    </Switch>
  );
}
