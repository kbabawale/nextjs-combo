export enum ActionType {
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}

interface OpenAction {
    type: ActionType.OPEN;
    payload: boolean;
}
interface ClosedAction {
    type: ActionType.CLOSED;
    payload: boolean;
}


export type Action = OpenAction | ClosedAction;
