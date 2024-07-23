import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { TokenResource } from "./token-storage/token-storage";

/**
 * Note: 사용자가 직접 정의해야하는 토큰 재발급 동작 인터페이스 입니다.
 * 
 * - `oauth2FlowInterceptor` 에서 엑세스토큰 인증 실패 시 해당 인터페이스를 구현하는 클래스가 동작합니다.
 * 
 * @publicApi
 */
export interface RefreshBehavior {
    refresh(): Observable<TokenResource>;
}

export const REFRESH_BEHAVIOR = new InjectionToken<RefreshBehavior>('RefreshBehavior');