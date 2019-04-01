import * as React from 'react';
import { useCallback, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../../../shared/auth/hooks';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const { loggedIn, setLoggedIn } = useAuth();

  const doLogin = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setError(undefined);
      ApiCall('POST', '/rest/user/signin', { username, password }).then(
        result => {
          localStorage.setItem('jwtToken', result.token);
          setLoggedIn(true);
        },
        () => setError('Failed to login')
      );
    },
    [username, password]
  );

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h2>Login</h2>
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
    </div>
  );
}

export default withRouter(LoginScreen);
