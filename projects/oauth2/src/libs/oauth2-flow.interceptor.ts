import { HttpContext, HttpContextToken, HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { EMPTY, catchError, throwError } from "rxjs";
import { OAuth2FlowService } from "./oauth2-flow.service";
import { TOKEN_STORAGE } from "./token-storage/token-storage";

/**
 * @publicApi
 */
const skipOAuth2FlowToken = new HttpContextToken(() => false);
export const skipOAuth2Flow = new HttpContext().set(skipOAuth2FlowToken, true);

/**
 * @publicApi
 */
export const oauth2FlowInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>, next: HttpHandlerFn
) => {
    if (req.context.get(skipOAuth2FlowToken)) {
        return next(req);
    }

    const oauth2FlowService = inject(OAuth2FlowService);
    const tokenStorage = inject(TOKEN_STORAGE);
    const { accessToken } = tokenStorage.select();

    console.debug(accessToken);
    // 엑세스토큰을 조회하고 있다면 요청 헤더에 추가
    if (accessToken) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
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

            console.debug('실패한 요청 대기열 큐에 저장중.. 🛒');
            oauth2FlowService.addPendingRequest({ req, next });

            if (oauth2FlowService.isRefreshing) {
                console.debug('기존의 토큰 재발급 플로우 진행중... 새로운 토큰 재발급 요청 캔슬 ❌');
                return EMPTY;
            }

            // 리프레시 토큰 플로우 시작
            console.debug('토큰 재발급 플로우 시작 👻');
            return oauth2FlowService.refresh();
        })
    );
}