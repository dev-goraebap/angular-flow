import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { ReqLoginDTO } from "../dto/req-login.dto";
import { mockTokens, mockUser } from "../mock";

export const LOGIN_MOCK_URL = 'LOGIN_MOCK_URL';

export const loginMockInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {
    if (!req.url.includes(LOGIN_MOCK_URL)) {
        return next(req);
    }

    const { username, password } = req.body as ReqLoginDTO;
    if (username !== mockUser.username || password !== mockUser.password) {

        const res = new HttpErrorResponse({
            status: 400,
            error: {
                message: '아이디 또는 비밀번호가 일치하지 않습니다.'
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