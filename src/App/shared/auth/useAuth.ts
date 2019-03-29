import { useEffect } from 'react';
import * as jwtDecode from '../../screens/Login/components/LoginScreen';
import { dispatch } from '../../state';
import { LoginActions } from '../../screens/Login/state';

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
    // @ts-ignore
    const token: Token | undefined = tokenStr
      ? jwtDecode<Token>(tokenStr)
      : undefined;
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
