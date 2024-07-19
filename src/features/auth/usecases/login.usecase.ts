import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TOKEN_STORAGE, TokenResource } from "projects/oauth2/src/public-api";
import { catchError, lastValueFrom, throwError } from "rxjs";
import { ReqLoginDTO } from "../dto/req-login.dto";
import { LOGIN_MOCK_URL } from "../interceptors/login-mock.interceptor";

@Injectable()
export class LoginUsecase {

    private readonly httpClient = inject(HttpClient);

    private readonly tokenStorage = inject(TOKEN_STORAGE);

    async execute(dto: ReqLoginDTO) {
        // http 요청
        const http$ = this.httpClient.post<TokenResource>(LOGIN_MOCK_URL, dto).pipe(
            catchError((res: HttpErrorResponse) => {
                window.alert(res.error.message);
                return throwError(() => res);
            })
        );
        const res = await lastValueFrom(http$);

        console.log(res);

        // 토큰스토리지에 응답값 반환         
        this.tokenStorage.set(res);
    }
}