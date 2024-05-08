import { CredentialModel } from "../models";

export const LOGIN = 'LOGIN';

export const loginAction = (payload: CredentialModel) => {
    return {
        type: LOGIN,
        payload
    };
}