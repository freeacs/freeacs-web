import * as React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useCallback, useReducer } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { useGlobalState } from '../../../state';
import { useLoadProfiles } from '../../../shared/context/hooks';
import { useFeedback } from '../../../shared/feedback/hooks';

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
  const { loadProfiles } = useLoadProfiles();
  const [state, setState] = useReducer(reducer, initialState);
  const { feedback, setFeedback } = useFeedback();

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
          loadProfiles(selectedUnitType.id);
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
