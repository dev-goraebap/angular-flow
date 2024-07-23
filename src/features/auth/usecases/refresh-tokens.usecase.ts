import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { skipOAuth2Flow } from "projects/oauth2/src/libs/oauth2-flow.interceptor";
import { RefreshBehavior, TOKEN_STORAGE, TokenResource } from "projects/oauth2/src/public-api";
import { catchError, Observable, throwError } from "rxjs";
import { REFRESH_TOKEN_MOCK_URL } from "../interceptors/refresh-tokens-mock.interceptor";

@Injectable()
export class RefreshTokensUsecase implements RefreshBehavior {

    private readonly httpClient = inject(HttpClient);

    private readonly tokenStorage = inject(TOKEN_STORAGE);

    refresh(): Observable<TokenResource> {
        const { refreshToken } = this.tokenStorage.select();
        const header = new HttpHeaders()
            .set('Authorization', `Bearer ${refreshToken}`)
        return this.httpClient.post<TokenResource>(REFRESH_TOKEN_MOCK_URL, {}, {
            headers: header,
            context: skipOAuth2Flow
        }).pipe(
            catchError((res: HttpErrorResponse) => {
                window.alert(res.error.message);
                return throwError(() => res);
            })
        );
    }
}