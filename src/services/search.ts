import {UnitArray} from "../models";
import {post} from "./apiCall";

export const doSearch = async (term: string,
                        onSuccess: (r: UnitArray) => void,
                        onError: (f: string) => void) => {
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
