import { Dispatch } from "react"
import { Action, ActionType } from "../actions/modalAction"

//Action-Creators => functions that dispatch actions

export const toggleModal = (payload: boolean) => {
    return (dispatch: Dispatch<Action>) => {
        if (payload === true) {
            dispatch({
                type: ActionType.OPEN,
                payload
            })
        } else {
            dispatch({
                type: ActionType.CLOSED,
                payload
            })
        }

    }
}