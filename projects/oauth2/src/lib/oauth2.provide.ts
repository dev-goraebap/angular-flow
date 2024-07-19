import { Provider, Type } from "@angular/core";
import { TOKEN_REFRESH_BEHAVIOR, TokenRefreshBehavior } from "./token-refresh.behavior";
import { BaseTokenStorage } from "./token-storage/base-token.storage";
import { TOKEN_STORAGE, TokenStorage } from "./token-storage/token.storage";

export type provideOAuth2Options = {
    /**
     * 토큰 재발급 요청 기능을 수행할 클래스를 필수로 등록합니다.
     * - `TokenRefreshBehavior` 추상클래스를 상속하고 `refresh` 메서드의 형식을 만족해야합니다.
     */
    readonly tokenRefreshBehavior: Type<TokenRefreshBehavior>;

    /**
     * 토큰을 저장하는 스토리지를 선택적으로 등록합니다.
     * - `TokenStorage` 인터페이스를 만족해야합니다.
     * - 등록하지 않으면 기본으로 제공되는 `BaseTokenStorage`를 사용하게 됩니다.
     */
    readonly customTokenStorage?: Type<TokenStorage>;
}

export const provideOauth2 = (config: provideOAuth2Options): Provider[] => {
    return [
        {
            provide: TOKEN_REFRESH_BEHAVIOR,
            useClass: config.tokenRefreshBehavior
        },
        {
            provide: TOKEN_STORAGE,
            useClass: config?.customTokenStorage ?? BaseTokenStorage
        }
    ];
}