import { ActionModel } from "src/shared";
import { CredentialModel } from "../models";

export const LOGIN = 'LOGIN';

export const loginAction = (payload: CredentialModel): ActionModel => {
    return {
        type: LOGIN,
        payload
    };
}