import * as React from 'react';
import LoginScreen from './components/LoginScreen';
import { Route, Switch } from 'react-router';

export default function LoginRoute() {
  return (
    <Switch>
      <Route path="/" component={LoginScreen} />
    </Switch>
  );
}
