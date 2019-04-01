import * as React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useCallback, useEffect, useReducer, useState } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { useGlobalState, dispatch } from '../../../state';
import { loadProfiles } from '../../../shared/context/thunks';

type State = {
  name: string;
};

type Action = { type: 'setName'; name: string } | { type: 'reset' };

const initialState: State = {
  name: ''
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setName':
      return {
        ...state,
        name: action.name
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

export default function ProfileCreateScreen() {
  const [{ selectedUnitType }] = useGlobalState('context');

  const [state, setState] = useReducer(reducer, initialState);

  const [feedback, setFeedback] = useState<string>();

  useEffect(() => {
    if (!feedback) {
      return;
    }
    const timer = setTimeout(() => setFeedback(undefined), 5000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!selectedUnitType) {
        return;
      }
      e.preventDefault();
      setFeedback(undefined);
      ApiCall('POST', '/rest/profile', {
        ...state,
        unitType: { id: selectedUnitType.id }
      }).then(
        () => {
          setFeedback('Successfully created profile');
          setState({ type: 'reset' });
          loadProfiles(selectedUnitType.id, dispatch);
        },
        e => {
          setFeedback('Failed to created profile');
        }
      );
    },
    [state]
  );

  return (
    <div>
      <h2>Profile - Create</h2>
      {feedback && <p style={{ color: 'orange' }}>{feedback}</p>}
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder=""
            value={state.name}
            onChange={e => setState({ type: 'setName', name: e.target.value })}
          />
        </FormGroup>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
