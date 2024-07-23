import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, finalize, merge, switchMap } from "rxjs";
import { REFRESH_BEHAVIOR } from "./refresh-behavior";
import { TOKEN_STORAGE } from "./token-storage/token-storage";

export type PendingRequest = {
    req: HttpRequest<any>,
    next: HttpHandlerFn
}

@Injectable()
export class OAuth2FlowService {

    private readonly refreshBehavior = inject(REFRESH_BEHAVIOR);
    private readonly tokenStorage = inject(TOKEN_STORAGE);

    // 토큰 재발급 진행중 상태
    // OAuth2 인터셉터에서 사용할 수 있도록 개방
    public isRefreshing = false;

    // 실패 요청 대기열
    private pendingRequests: PendingRequest[] = [];

    addPendingRequest(request: PendingRequest) {
        this.pendingRequests.push(request);
    }

    refresh(): Observable<HttpEvent<unknown>> {
        console.debug('토큰 재발급 진행중으로 상태 변경 ✅');
        this.isRefreshing = true;

        console.debug('토큰 재발급 요청 시작 🚀');
        return this.refreshBehavior.refresh().pipe(
            // 요청이 성공일 경우
            switchMap(tokenResource => {
                console.debug('토큰 재발급 성공 ✅ -> 새로 발급받은 리소스로 최신화👌');
                this.tokenStorage.set(tokenResource);

                console.debug('실패했던 모든 요청들 재요청 준비.. 🚗');
                return this.startPendingRequests(tokenResource.accessToken)
            }),
            // 요청 성공, 실패 상관없이 최종적으로 상태를 초기화 시키는 작업
            finalize(() => {
                console.debug('요청 대기열 비우기... 🫧');
                this.pendingRequests = [];
                console.debug('토큰 재발급 대기중으로 상태 변경 ✅');
                this.isRefreshing = false;
                console.debug('토큰 재발급 플로우 종료 🐱');
            })
        );
    }

    private startPendingRequests(accessToken: string): Observable<HttpEvent<unknown>> {
        const requests = this.pendingRequests.map(item => {
            const newReq = item.req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return item.next(newReq);
        });

        console.debug('실패했던 모든 요청들 재요청 시작.. 🚀');
        return merge(...requests);
    }
}