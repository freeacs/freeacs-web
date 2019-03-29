import * as React from 'react';
import SearchScreen from './components/SearchScreen';
import { Route, Switch } from 'react-router';

export default function SearchRoute() {
  return (
    <Switch>
      <Route path="/search" component={SearchScreen} />
    </Switch>
  );
}
