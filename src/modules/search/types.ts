import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { Unit } from "../../models";

export type SearchState = {
    readonly error?: string
    readonly hits: ReadonlyArray<Unit>;
    readonly inputValue: string
};

export type SearchAction = ActionType<typeof actions>;
