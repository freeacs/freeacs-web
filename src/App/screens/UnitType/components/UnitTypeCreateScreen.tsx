import * as React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useReducer } from 'react';

type State = {
  protocol: 'TR069';
  name: string;
  vendor: string;
  description: string;
};

type Action =
  | { type: 'setName'; name: string }
  | { type: 'setVendor'; vendor: string }
  | { type: 'setDescription'; description: string };

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
    default:
      return state;
  }
};

export default function UnitTypeCreateScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h2>UnitType - Create</h2>
      <Form>
        <FormGroup>
          <Label for="protocol">Protocol</Label>
          <Input type="select" name="protocol" id="protocol">
            <option selected={state.protocol === 'TR069'}>TR069</option>
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
            onChange={e => dispatch({ type: 'setName', name: e.target.value })}
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
              dispatch({ type: 'setVendor', vendor: e.target.value })
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
              dispatch({ type: 'setDescription', description: e.target.value })
            }
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}
