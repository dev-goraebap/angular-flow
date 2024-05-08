import { InjectionToken, ProviderToken } from "@angular/core";
import { Observable } from "rxjs";
import { CredentialModel, JwtResourceModel } from "../models";
import { AuthMockApi } from "./auth-mock.api";

export interface AuthApi {
    login(credential: CredentialModel): Observable<JwtResourceModel>;
}

export const AUTH_API: ProviderToken<AuthApi> = new InjectionToken('AUTH_API');

export const provideAuthApi = () => {
    return {
        provide: AUTH_API,
        useClass: AuthMockApi
    }
}