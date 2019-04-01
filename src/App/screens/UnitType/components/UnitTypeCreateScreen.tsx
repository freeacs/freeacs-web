import * as React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useCallback, useReducer } from 'react';
import ApiCall from '../../../shared/http/ApiCall';
import { useLoadUnitTypes } from '../../../shared/context/hooks';
import { useFeedback } from '../../../shared/feedback/hooks';

type State = {
  protocol: 'TR069';
  name: string;
  vendor: string;
  description: string;
};

type Action =
  | { type: 'setName'; name: string }
  | { type: 'setVendor'; vendor: string }
  | { type: 'setDescription'; description: string }
  | { type: 'reset' };

const initialState: State = {
  protocol: 'TR069',
  name: '',
  vendor: '',
  description: ''
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setName':
      return {
        ...state,
        name: action.name
      };
    case 'setVendor':
      return {
        ...state,
        vendor: action.vendor
      };
    case 'setDescription':
      return {
        ...state,
        description: action.description
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

export default function UnitTypeCreateScreen() {
  const [state, setState] = useReducer(reducer, initialState);
  const loadUnitTypes = useLoadUnitTypes();
  const { feedback, setFeedback } = useFeedback();

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setFeedback(undefined);
      ApiCall('POST', '/rest/unittype', state).then(
        () => {
          setFeedback('Successfully created unittype');
          setState({ type: 'reset' });
          loadUnitTypes();
        },
        () => {
          setFeedback('Failed to created unittype');
        }
      );
    },
    [state]
  );

  return (
    <div>
      <h2>UnitType - Create</h2>
      {feedback && <p style={{ color: 'orange' }}>{feedback}</p>}
      <Form>
        <FormGroup>
          <Label for="protocol">Protocol</Label>
          <Input
            type="select"
            name="protocol"
            id="protocol"
            defaultValue="TR069"
          >
            <option>TR069</option>
          </Input>
        </FormGroup>
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
        <FormGroup>
          <Label for="vendor">Vendor</Label>
          <Input
            type="text"
            name="vendor"
            id="vendor"
            placeholder=""
            value={state.vendor}
            onChange={e =>
              setState({ type: 'setVendor', vendor: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder=""
            value={state.description}
            onChange={e =>
              setState({ type: 'setDescription', description: e.target.value })
            }
          />
        </FormGroup>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
