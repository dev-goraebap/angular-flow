import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { InjectionToken, inject } from "@angular/core";
import { Observable, catchError, from, switchMap, throwError } from "rxjs";
import { promiseSafe } from "./oauth2.utils";
import { TOKEN_STORAGE } from "./token-storage/token.storage";
import { TokenResource } from "./token-storage/token.storage.options";

/**
 * 토큰재발급 요청을 모킹할 때 사용할 수 있는 값입니다.
 * - httpClient를 통해 토큰 재발급 요청을 수행합니다.
 * - URL 값으로 `REFRESH_TOKEN_MOCK_URL` 을 사용합니다.
 * - oauth2 인터셉터는 해당 요청일 경우 작동하지 않습니다.
 */
export const REFRESH_TOKEN_MOCK_URL = 'REFRESH_TOKEN_MOCK_URL';

export type RefreshHttpClientOptions = {
    /** 토큰 재발급 요청 메서드 */
    readonly method: 'get' | 'post';
    /** 토큰 재발급 요청 URL */
    readonly url: string;
    /** 
     * 요청 메서드가 `post`일 경우 body를 통해 refresh 토큰을 전달할지 선택
     * - 기본값은 `false`
     * - `true`로 선택시 { refreshToken: <VALUE> } 형태로 전달
     */
    readonly ifPostOnBody?: boolean;
}

/**
 * ## `TokenRefreshBehavior 🛡️`
 * 
 * 이 추상 클래스는 토큰 갱신 전략을 구현하기 위한 기초를 제공합니다.
 * 개발자는 이 클래스를 확장하여 내장된 HTTP 클라이언트와 토큰 저장
 * 메커니즘을 활용해 맞춤형 인증 갱신 전략을 생성할 수 있습니다.
 * 
 * @template Resource - refresh 메서드가 반환하는 리소스의 타입.
 */
export abstract class TokenRefreshBehavior<Resource = TokenResource> {

    protected readonly httpBackend = inject(HttpBackend);

    protected readonly tokenStorage = inject(TOKEN_STORAGE);

    /**
     * 인증 토큰을 갱신하는 추상 메서드.
     * 하위 클래스에서 사용자 정의 갱신 로직을 정의하기 위해 구현해야 합니다.
     *
     * - 내장된 `refreshHttpClient`를 사용하여 요청을 진행하는 것을 권장합니다.
     * 
     * - 직접 요청을 진행하려면 내장된 `httpBackend`, `tokenStorage`를 활용하여
     * 요청을 진행할 수 있습니다.
     * 
     * @returns {Observable<Resource>} - 갱신된 리소스를 방출하는 Observable.
     */
    abstract refresh(): Observable<Resource>;

    /**
     * `refresh` 메서드에서 사용하는 전용 httpClient를 제공합니다.
     * - 글로벌 인터셉터를 무시합니다.
     * - `token storage`의 리프레시 토큰을 추출하여 옵션값에 따라 값을 바인딩합니다.
     */
    protected refreshHttpClient(options: RefreshHttpClientOptions): Observable<Resource> {
        const { refreshToken } = this.tokenStorage;
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${refreshToken()}`);

        const httpClient = new HttpClient(this.httpBackend);
        if (options.method === 'get') {
            return httpClient.get<Resource>(options.url, { headers });
        }

        if (options.ifPostOnBody) {
            return httpClient.post<Resource>(options.url, { refreshToken: refreshToken() });
        }

        return httpClient.post<Resource>(options.url, null, { headers }).pipe(
            catchError(res => {
                const promise = promiseSafe(this.tokenStorage.clear());
                return from(promise).pipe(
                    switchMap(() => {
                        console.log('인증 실패 -> 토큰 스토리지 비우기 🫧');
                        return throwError(() => res);
                    })
                );
            })
        );
    }
}

export const TOKEN_REFRESH_BEHAVIOR = new InjectionToken<TokenRefreshBehavior>('TOKEN_REFRESH_BEHAVIOR');
