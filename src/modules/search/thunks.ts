import { clearInput, search } from "./actions";
import { RootState } from "../index";
import { post } from "../../services/apiCall";
import * as t from "io-ts";
import { UnitArray } from '../../models';
import { Dispatch } from "redux";
import { SearchAction } from "./types";

export const doSearch = () => {
    return async (dispatch: Dispatch<SearchAction>, getState: () => RootState) => {
        const term = getState().search.inputValue;
        if (term.length < 1) {
            return;
        }
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
