import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { mockCredential, mockTokens } from "../mock";

export const GET_PROFILE_MOCK_URL = 'GET_PROFILE_MOCK_URL';

export const getProfileMockInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {
    if (!req.url.includes(GET_PROFILE_MOCK_URL)) {
        return next(req);
    }

    const headers = req.headers;
    const bearerToken = headers.get('Authorization') ?? 'Bearer ';

    const accessToken = bearerToken?.split('Bearer ')[1];
    if (accessToken !== mockTokens.accessToken) {
        const res = new HttpErrorResponse({
            status: 401,
            error: {
                message: '인증 토큰이 유효하지 않습니다.'
            }
        });
        return throwError(() => res);
    }

    const res = new HttpResponse({
        status: 200,
        body: mockCredential
    });

    return of(res);
}