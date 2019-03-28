import * as React from 'react';
import { ComponentType, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import ApiCall from '../../shared/http/ApiCall';
import Spinner from '../../shared/spinner';

export default function SecuredRoute({
  path,
  component
}: {
  path: string;
  component: ComponentType<{}>;
}) {
  const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setAuthorized(false);
    } else {
      ApiCall('GET', '/rest/user/me').then(
        () => {
          setAuthorized(true);
        },
        () => {
          localStorage.removeItem('jwtToken');
          setAuthorized(false);
        }
      );
    }
  }, []);

  if (authorized === true) {
    return <Route path={path} component={component} />;
  }

  if (authorized === false) {
    return <Redirect to="/login" />;
  }

  return <Spinner />;
}
