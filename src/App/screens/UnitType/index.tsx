import * as React from 'react';
import UnitTypeOverviewScreen from './components/UnitTypeOverviewScreen';
import UnitTypeCreateScreen from './components/UnitTypeCreateScreen';
import { Route, Switch } from 'react-router';

export default function UnitTypeRoute() {
  return (
    <Switch>
      <Route exact path="/unittype" component={UnitTypeOverviewScreen} />
      <Route path="/unittype/create" component={UnitTypeCreateScreen} />
    </Switch>
  );
}
