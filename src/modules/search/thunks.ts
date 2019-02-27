import { ThunkAction } from "redux-thunk";
import { search, clearInput } from "./actions";
import { SearchAction } from "./types";
import { RootState } from "../index";
import { post } from "../../services/apiCall";
import * as t from "io-ts";
import { UnitArray } from '../../models';

export const doSearch = (term: string): ThunkAction<Promise<void>, RootState, void, SearchAction> => {
    return async (dispatch) => {
        dispatch(clearInput());
        dispatch(search.request());
        try {
            const text = await post('/search', { term });
            UnitArray.decode(JSON.parse(text))
                .bimap(
                    (e: t.Errors) => dispatch(search.failure(new Error("Could not validate response: " + JSON.stringify(e)))),
                    (r: UnitArray) => dispatch(search.success(r))
                );
        } catch (err) {
            dispatch(search.failure(err as Error));
        }
    };
};