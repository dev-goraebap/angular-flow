import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { skipOAuth2Flow } from "projects/oauth2/src/libs/oauth2-flow.interceptor";
import { RefreshBehavior, TokenResource } from "projects/oauth2/src/public-api";
import { catchError, Observable, throwError } from "rxjs";
import { REFRESH_TOKEN_MOCK_URL } from "../interceptors/refresh-tokens-mock.interceptor";

@Injectable()
export class RefreshTokensUsecase implements RefreshBehavior {

    private readonly httpClient = inject(HttpClient);

    refresh(refreshToken: string): Observable<TokenResource> {
        // 백엔드와 약속된 방식으로 http 호출
        const header = new HttpHeaders()
            .set('Authorization', `Bearer ${refreshToken}`);
        return this.httpClient.post<TokenResource>(REFRESH_TOKEN_MOCK_URL, {}, {
            headers: header,
            // ✅ context에 skipOAuth2Flow 컨텍스트를 사용해야합니다.
            // oauth2Flow 인터셉터를 무시하고 진행하도록 설정합니다.
            context: skipOAuth2Flow
        }).pipe(
            // 요청 실패 시 후처리
            catchError((res: HttpErrorResponse) => {
                window.alert(res.error.message);
                return throwError(() => res);
            })
        );
    }
}