import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { RootActions } from '../../../state';
import { Profile } from '../../../shared/models';

type ProfileState = {
  selectedProfile?: Profile;
};

const initialState: ProfileState = {
  selectedProfile: undefined
};

export function profileReducer(
  state: ProfileState = initialState,
  action: RootActions
) {
  switch (action.type) {
    case getType(ProfileActions.setSelectedProfile):
      return {
        ...state,
        selectedProfile: action.payload
      };
    default:
      return state;
  }
}

export const ProfileActions = {
  setSelectedProfile: createStandardAction('SET_SELECTED_PROFILE_ID')<Profile>()
};

export type ProfileAction = ActionType<typeof ProfileActions>;
