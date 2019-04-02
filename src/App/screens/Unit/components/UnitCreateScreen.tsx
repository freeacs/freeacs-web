import * as React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useReducer } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import {
  useSelectProfile,
  useSelectUnitType
} from '../../../shared/context/hooks';

type State = {
  unitId?: string;
};

type Action = { type: 'setUnitId'; unitId: string } | { type: 'reset' };

const initialState: State = {
  unitId: undefined
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setUnitId':
      return {
        ...state,
        unitId: action.unitId
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

export default function UnitCreateScreen() {
  const { selectedUnitType } = useSelectUnitType();
  const { selectedProfile } = useSelectProfile();
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
      if (!selectedUnitType || !selectedProfile) {
        return;
      }
      e.preventDefault();
      setFeedback(undefined);
      ApiCall('POST', '/rest/unit', {
        ...state,
        unitType: { id: selectedUnitType.id },
        profile: { id: selectedProfile.id }
      }).then(
        () => {
          setFeedback('Successfully created unit');
          setState({ type: 'reset' });
        },
        e => {
          setFeedback('Failed to created unit');
        }
      );
    },
    [state]
  );

  return (
    <div>
      <h2>Unit - Create</h2>
      {feedback && <p style={{ color: 'orange' }}>{feedback}</p>}
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder=""
            value={state.unitId || ''}
            onChange={e =>
              setState({ type: 'setUnitId', unitId: e.target.value })
            }
          />
        </FormGroup>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
