import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { dispatch } from '../../../state';
import { LoginActions } from '../state';

function LoginScreen(props: RouteComponentProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  useEffect(() => {
    const loggedIn = !!localStorage.getItem('jwtToken');
    dispatch(LoginActions.setLoggedIn(loggedIn));
    if (loggedIn === true) {
      props.history.push('/');
      return;
    }
  });

  const doLogin = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setError(undefined);
      ApiCall('POST', '/rest/user/signin', { username, password }).then(
        result => {
          localStorage.setItem('jwtToken', result.token);
          dispatch(LoginActions.setLoggedIn(true));
          props.history.push('/');
        },
        () => setError('Failed to login')
      );
    },
    [username, password]
  );

  return (
    <form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        <input
          type="text"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </p>
      <p>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </p>
      <p>
        <button onClick={doLogin}>Submit</button>
      </p>
    </form>
  );
}

export default withRouter(LoginScreen);
