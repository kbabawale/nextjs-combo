import { Action, ActionType } from "../actions/modalAction";

const initialState = false;


const modalReducer = (state: boolean = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.OPEN:
            return action.payload;
        case ActionType.CLOSED:
            return action.payload;
        default:
            return state;
    }
}

export default modalReducer;