import * as React from 'react';
import { ComponentType, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import Spinner from '../../shared/spinner';
import * as jwtDecode from 'jwt-decode';
import { dispatch } from '../../state';
import { LoginActions } from '../../screens/Login/state';

type Token = {
  exp: number;
};

export default function SecuredRoute({
  path,
  component
}: {
  path: string;
  component: ComponentType<{}>;
}) {
  const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const tokenStr = localStorage.getItem('jwtToken');
    // @ts-ignore
    const token: Token | null = tokenStr ? jwtDecode<Token>(tokenStr) : null;
    const date = new Date().getTime();
    const validToken = token ? date < token.exp : false;
    if (!validToken) {
      localStorage.removeItem('jwtToken');
    }
    dispatch(LoginActions.setLoggedIn(validToken));
    setAuthorized(validToken);
  }, []);

  if (authorized === true) {
    return <Route path={path} component={component} />;
  }

  if (authorized === false) {
    return <Redirect to="/login" />;
  }

  return <Spinner />;
}
