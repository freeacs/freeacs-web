import * as React from 'react';
import { ComponentType } from 'react';
import { Redirect, Route } from 'react-router';
import Spinner from '../../shared/spinner';
import { useAuth } from '../../shared/auth';

export default function SecuredRoute({
  path,
  component
}: {
  path: string;
  component: ComponentType<{}>;
}) {
  const { loggedIn } = useAuth();

  if (loggedIn === true) {
    return <Route path={path} component={component} />;
  }

  if (loggedIn === false) {
    return <Redirect to="/login" />;
  }

  return <Spinner />;
}
