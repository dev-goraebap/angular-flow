import { ActionModel } from "src/shared";

export const LOGOUT = 'LOGOUT';

export const logoutAction = (): ActionModel => {
    return {
        type: LOGOUT,
        payload: null
    }
}