import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { mockTokens } from "../mock";

export const REFRESH_TOKEN_MOCK_URL = 'REFRESH_TOKEN_MOCK_URL';

export const refreshTokensMockInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {
    if (!req.url.includes(REFRESH_TOKEN_MOCK_URL)) {
        return next(req);
    }

    const headers = req.headers;
    const bearerToken = headers.get('Authorization') ?? 'Bearer ';

    const refreshToken = bearerToken?.split('Bearer ')[1];
    if (refreshToken !== mockTokens.refreshToken) {
        const res = new HttpErrorResponse({
            status: 401,
            error: {
                message: '인증 정보가 만료되었습니다.'
            }
        });
        return throwError(() => res);
    }

    const res = new HttpResponse({
        status: 200,
        body: mockTokens
    });

    return of(res);
}