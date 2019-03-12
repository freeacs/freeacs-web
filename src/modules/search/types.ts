import { ActionType } from "typesafe-actions";
import * as actions from './actions';

export type SearchAction = ActionType<typeof actions>;
