import { createAsyncAction } from "typesafe-actions";
import { Unit } from '../../models';

export const search = createAsyncAction(
    '@app/search/SEARCH_REQUEST',
    '@app/search/SEARCH_SUCCESS',
    '@app/search/SEARCH_FAILURE'
)<void, Unit[], Error>();
