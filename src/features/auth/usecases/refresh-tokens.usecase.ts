import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { REFRESH_TOKEN_MOCK_URL, TokenRefreshBehavior, TokenResource } from "projects/oauth2/src/public-api";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class RefreshTokensUsecase extends TokenRefreshBehavior {

    private readonly httpClient = inject(HttpClient);

    override refresh(): Observable<TokenResource> {
        /**
         * 실제 라이브러리 사용시 다음 코드를 적용 해야합니다.
         */
        // return this.refreshHttpClient({
        //     method: 'post',
        //     url: 'http://localhost:3000/api/auth/refresh',
        // });

        /**
         * refreshHttpClient는 내부적으로 httpBackend를 통해 모든 인터셉터를 우회하기 때문에 
         * 인터셉터를 통한 테스트코드를 작성할 수 없습니다. 🥲
         * 대신 Observable<TokenResource> 반환 타입을 만족하는 테스트 코드로 대체합니다.
         */

        console.log(this.tokenStorage.refreshToken());

        const header = new HttpHeaders()
            .set('Authorization', `Bearer ${this.tokenStorage.refreshToken()}`)
        return this.httpClient.post<TokenResource>(REFRESH_TOKEN_MOCK_URL, {}, {
            headers: header
        }).pipe(
            catchError((res: HttpErrorResponse) => {
                window.alert(res.error.message);
                return throwError(() => res);
            })
        );
    }
}