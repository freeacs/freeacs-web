import { getType } from "typesafe-actions";
import { inputChanged, clearInput, search } from "./actions";
import { Unit } from "../../models";
import { SearchAction } from "./types";

export type SearchState = {
    readonly error?: string
    readonly hits: ReadonlyArray<Unit>;
    readonly inputValue: string
};

export const initialState: SearchState = {
    hits: [],
    inputValue: ''
};

const reducer = (state: SearchState = initialState, action: SearchAction) => {
    switch(action.type) {
        case getType(clearInput):
            return { ...state, inputValue: ''};
        case getType(inputChanged):
            return { ...state, inputValue: action.payload };
        case getType(search.request):
            return { ...state, hits: [], error: undefined };
        case getType(search.success):
            return { ...state, hits: action.payload };
        case getType(search.failure):
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
};

export default reducer;
