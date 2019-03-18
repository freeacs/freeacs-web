import * as React from 'react';
import { useGlobalState, dispatch } from '../../../state';
import { useCallback } from 'react';
import { AboutActions } from '../state';

function AboutScreen() {
  const [{ name }] = useGlobalState('about');
  const onClick = useCallback(() => {
    dispatch(AboutActions.setName('Random'));
  }, []);
  return (
    <div>
      <h1>About Page</h1>
      <p>{name} is a TR-069 provisioning stack.</p>
      <p>
        <button onClick={onClick}>Change name</button>
      </p>
    </div>
  );
}

export default AboutScreen;
