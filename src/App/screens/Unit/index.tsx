import * as React from 'react';
import UnitCreateScreen from './components/UnitCreateScreen';
import { Route, Switch } from 'react-router';

export default function SearchRoute() {
  return (
    <Switch>
      <Route path="/unit/create" component={UnitCreateScreen} />
    </Switch>
  );
}
