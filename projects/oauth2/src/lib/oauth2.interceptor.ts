import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { EMPTY, catchError, throwError } from "rxjs";
import { OAuth2Service } from "./oauth2.service";
import { REFRESH_TOKEN_MOCK_URL } from "./token-refresh.behavior";
import { TOKEN_STORAGE } from "./token-storage/token.storage";

/**
 ## `oauth2Interceptor 🎁`
 다음과 같이 app.config의 provider에 등록할 수 있습니다.
 ```ts
 provideHttpClient(
    withFetch(),
      withInterceptors([
        oauth2Interceptor
    ])
 ), 
 // 정상적인 작동을 위해 provideOAuth2 함수를 등록해야합니다.
 provideOauth2({
    tokenRefreshBehavior: ...
 })
 ```
 - 인증토큰의 유무에 따라 요청 헤더 `Authorization` 에 `bearer` 토큰을 등록합니다.
 - `401` 에러를 감지하고 토큰 재발급 플로우를 실행합니다.
 - TokenRefreshBehavior를 상속하는 클래스에서 요청에 대한 기본적인 정의가 사전에 이뤄져야 합니다.
 - 인증 실패시 TokenRefreshBehavior를 상속하는 클래스에서 부가적인 마무리작업을 수행할 수 있습니다.  
 */
export const oauth2Interceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

    if (req.url.includes(REFRESH_TOKEN_MOCK_URL)) {
        return next(req);
    }

    const oauth2Service = inject(OAuth2Service);
    const { accessToken } = inject(TOKEN_STORAGE);

    // 엑세스토큰을 조회하고 있다면 요청 헤더에 추가
    if (accessToken()) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken()}`
            }
        });
    }

    // 요청 진행 
    return next(req).pipe(
        catchError((res: HttpErrorResponse) => {
            // 401 Unauthorized 에러가 아니면 예외를 그대로 방출
            if (res.status !== 401) {
                return throwError(() => res);
            }

            console.log('실패한 요청 대기열 큐에 저장중.. 🛒');
            oauth2Service.addPendingRequest({ req, next });

            if (oauth2Service.isRefreshing) {
                console.log('기존의 토큰 재발급 플로우 진행중... 새로운 토큰 재발급 요청 캔슬 ❌');
                return EMPTY;
            }

            // 리프레시 토큰 플로우 시작
            console.log('토큰 재발급 플로우 시작 👻');
            return oauth2Service.refresh();
        })
    );
}