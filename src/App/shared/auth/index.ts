import { useCallback, useEffect } from 'react';
import { dispatch, useGlobalState } from '../../state';
import { AuthActions } from './state';
import * as jwtDecode from 'jwt-decode';

type Token = {
  exp: number;
};

export function useAuth() {
  const [{ loggedIn }] = useGlobalState('auth');

  const setLoggedIn = useCallback((loggedIn: boolean) => {
    dispatch(AuthActions.setLoggedIn(loggedIn));
  }, []);

  useEffect(() => {
    const tokenStr = localStorage.getItem('jwtToken');
    if (tokenStr) {
      // @ts-ignore
      const token: Token = jwtDecode<Token>(tokenStr);
      const date = Date.now() / 1000;
      const validToken = token ? date < token.exp : false;
      if (!loggedIn && validToken) {
        setLoggedIn(validToken);
      }
      if (!validToken) {
        localStorage.removeItem('jwtToken');
      }
    } else {
      if (loggedIn || typeof loggedIn === 'undefined') {
        setLoggedIn(false);
      }
      localStorage.removeItem('jwtToken');
    }
  }, [loggedIn]);

  return { loggedIn, setLoggedIn };
}
