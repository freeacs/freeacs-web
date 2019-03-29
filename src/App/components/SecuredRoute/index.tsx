import * as React from 'react';
import { ComponentType, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import Spinner from '../../shared/spinner';
import { useAuth } from '../../shared/auth/useAuth';

export default function SecuredRoute({
  path,
  component
}: {
  path: string;
  component: ComponentType<{}>;
}) {
  const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);

  useAuth({
    onValid: () => setAuthorized(true),
    onInValid: () => setAuthorized(false)
  });

  if (authorized === true) {
    return <Route path={path} component={component} />;
  }

  if (authorized === false) {
    return <Redirect to="/login" />;
  }

  return <Spinner />;
}
