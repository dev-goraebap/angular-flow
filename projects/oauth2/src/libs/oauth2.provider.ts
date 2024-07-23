import { HttpInterceptorFn, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { EnvironmentProviders, Provider, Type } from "@angular/core";
import { oauth2FlowInterceptor } from "./oauth2-flow.interceptor";
import { OAuth2FlowService } from "./oauth2-flow.service";
import { REFRESH_BEHAVIOR, RefreshBehavior } from "./refresh-behavior";
import { BaseTokenStorage } from "./token-storage/base-token-storage";
import { TOKEN_STORAGE, TokenStorage } from "./token-storage/token-storage";

/** @publicApi */
export type ProvideOAuth2Props = {
    refreshBehavior: Type<RefreshBehavior>;
    tokenStorage?: Type<TokenStorage>;
}

/** @publicApi */
export type ProvideOAuth2WithHttpClientProps = {
    refreshBehavior: Type<RefreshBehavior>;
    tokenStorage?: Type<TokenStorage>;
    interceptors?: HttpInterceptorFn[];
}

/** 
 * Note: 기본유형의 OAuth2 프로바이더 입니다.
 * 
 * - 필수적으로 `RefreshBehavior` 인터페이스를 구현하는 클래스를 등록해야합니다.
 * - 선택적으로 `TokenStorage` 인터페이스를 구현하는 클래스를 등록할 수 있습니다.
 * 등록하지 않으면 기본적으로 제공하는 `BaseTokenStorage` 를 사용합니다.
 * 
 * @publicApi 
 */
export const provideOAuth2 = (
    props: ProvideOAuth2Props
): Provider[] => {
    return [
        {
            provide: REFRESH_BEHAVIOR,
            useClass: props.refreshBehavior
        },
        {
            provide: TOKEN_STORAGE,
            useClass: props?.tokenStorage ?? BaseTokenStorage
        },
        OAuth2FlowService,
    ]
}

/**
 * Note: `httpClient` 가 내부적으로 구성된 OAuth2 프로바이더 입니다.
 * 
 * - 필수적으로 `RefreshBehavior` 인터페이스를 구현하는 클래스를 등록해야합니다.
 * - 선택적으로 `TokenStorage` 인터페이스를 구현하는 클래스를 등록할 수 있습니다.
 * 등록하지 않으면 기본적으로 제공하는 `BaseTokenStorage` 를 사용합니다.
 * 
 * @publicApi
 */
export const provideOAuth2WithHttpClient = (
    props: ProvideOAuth2WithHttpClientProps
): (EnvironmentProviders | Provider)[] => {
    // oauth2FlowInterceptor 추가
    let interceptors: HttpInterceptorFn[] = [oauth2FlowInterceptor];
    // 선택적으로 등록된 인터셉터가 있다면 추가
    if (props?.interceptors?.length) {
        interceptors = [oauth2FlowInterceptor, ...props.interceptors];
    }

    return [
        // OAuth2 프로바이더 추가
        provideOAuth2({
            refreshBehavior: props.refreshBehavior,
            tokenStorage: props?.tokenStorage
        }),
        // 앵귤러 httpClient provider 추가
        provideHttpClient(
            withFetch(),
            withInterceptors(interceptors)
        )
    ];
}