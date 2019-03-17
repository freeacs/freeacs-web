import { CreateReduxLikeStore, createStore } from 'react-hooks-global-state';
import reducer, { RootActions, RootState } from '../../redux/reducer';
import { reduxDevToolsExt } from 'react-hooks-global-state/dist/devtools';

export const {
  GlobalStateProvider,
  dispatch,
  useGlobalState
} = (createStore as CreateReduxLikeStore)<RootState, RootActions>(
  reducer,
  undefined,
  reduxDevToolsExt()
);
