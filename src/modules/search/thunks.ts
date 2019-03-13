import { search } from "./actions";
import { post } from "../../services/apiCall";
import * as t from "io-ts";
import { UnitArray } from '../../models';
import { Dispatch } from "redux";
import { SearchAction } from "./types";

export const doSearch = (term: string) => {
    return async (dispatch: Dispatch<SearchAction>) => {
        if (term.length > 0) {
            return;
        }
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
