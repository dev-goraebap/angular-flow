import { HttpInterceptorFn } from "@angular/common/http";
import { getProfileMockInterceptor } from "./get-profile-mock.interceptor";
import { loginMockInterceptor } from "./login-mock.interceptor";
import { refreshTokensMockInterceptor } from "./refresh-tokens-mock.interceptor";

export const authMockInterceptors: HttpInterceptorFn[] = [
    loginMockInterceptor,
    getProfileMockInterceptor,
    refreshTokensMockInterceptor
];