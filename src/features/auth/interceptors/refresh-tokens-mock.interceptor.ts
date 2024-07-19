import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { mockTokens } from "../mock";

export const REFRESH_TOKENS_MOCK_URL = 'REFRESH_TOKENS_MOCK_URL';

export const refreshTokensMockInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {
    if (!req.url.includes(REFRESH_TOKENS_MOCK_URL)) {
        return next(req);
    }

    console.log('[테스트] 리프레시 토큰 만료 처리');

    const headers = req.headers;
    const bearerToken = headers.get('Authorization') ?? 'Bearer ';

    console.log(bearerToken);

    const refreshToken = bearerToken?.split('Bearer ')[1];
    if (refreshToken !== mockTokens.refreshToken) {
        console.log('리프레시토큰 정보 불일치');
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