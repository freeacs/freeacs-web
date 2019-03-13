import {UnitArray} from "../models";
import {post} from "./apiCall";

export type DoSearchType = (term: string,
                            onSuccess: (arr: UnitArray) => void,
                            onError: (err: string) => void) => Promise<void>;

export const doSearch: DoSearchType = async (term, onSuccess, onError) => {
    try {
        const text = await post('/search', {term});
        UnitArray.decode(JSON.parse(text))
            .bimap(
                () => onError("Bad data received from server"),
                onSuccess
            );
    } catch (err) {
        onError("Error occurred while searching");
    }
};
