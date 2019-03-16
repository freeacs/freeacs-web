import { configure } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});
