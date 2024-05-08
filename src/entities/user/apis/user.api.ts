import { InjectionToken, ProviderToken } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../user.model";
import { UserMockApi } from "./user-mock.api";

export interface UserApi {
    getUserProfile(): Observable<UserModel>;
}

export const USER_API: ProviderToken<UserApi> = new InjectionToken('USER_API');

export const provideUserApi = () => {
    return {
        provide: USER_API,
        useClass: UserMockApi
    }
}