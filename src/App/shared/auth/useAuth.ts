import { useEffect } from 'react';
import { dispatch } from '../../state';
import { LoginActions } from '../../screens/Login/state';
import * as jwtDecode from 'jwt-decode';

type Token = {
  exp: number;
};

type Props = {
  onValid?: (t?: Token) => any;
  onInValid?: (t?: Token) => any;
};

export function useAuth(props: Props) {
  useEffect(() => {
    const tokenStr = localStorage.getItem('jwtToken');
    const token: Token = jwtDecode<Token>(tokenStr);
    const date = new Date().getTime();
    const validToken = token ? date < token.exp : false;
    dispatch(LoginActions.setLoggedIn(validToken));
    if (validToken === true) {
      props && props.onValid && props.onValid(token);
      return;
    } else {
      localStorage.removeItem('jwtToken');
      props && props.onInValid && props.onInValid(token);
    }
  }, []);
}
