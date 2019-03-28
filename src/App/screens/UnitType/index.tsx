import * as React from 'react';
import UnitTypeOverviewScreen from './components/UnitTypeOverviewScreen';
import { Route, Switch } from 'react-router';

export default function UnitTypeRoute() {
  return (
    <Switch>
      <Route path="/" component={UnitTypeOverviewScreen} />
    </Switch>
  );
}
