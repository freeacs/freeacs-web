import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { Unit } from '../../models';

export const clearInput = createStandardAction('@app/search/CLEAR_INPUT')<void>();

export const inputChanged = createStandardAction('@app/search/INPUT_CHANGED')<string>();

export const search = createAsyncAction(
    '@app/search/SEARCH_REQUEST',
    '@app/search/SEARCH_SUCCESS',
    '@app/search/SEARCH_FAILURE'
)<void, Unit[], Error>();
