import { TokenResource, TokenType } from "./types/token-storage.type";

/**
 * Note: OAuth2 인증, 인가, 토큰 재발급 플로우에 사용되는 
 * 토큰 스토리지 인터페이스입니다.
 * 
 * @publicApi
 */
export interface TokenStorage {
    /**
     * Note: 타입과 일치하는 토큰을 가져옵니다.
     */
    get(type: TokenType): Promise<string | null>;
    get(type: TokenType): string | null;

    /**
     * Note: `TokenResource` 타입 유형의 객체를 받아
     * 저장합니다.
     */
    set(resource: TokenResource): Promise<void>;
    set(resource: TokenResource): void;

    /**
     * Note: 토큰 리소스를 일괄 삭제합니다.
     */
    removes(): Promise<void>;
    removes(): void;
}

/**
 * Note: window.localStorage API 를 사용하는 기본제공 토큰스토리지
 * 
 * @publicApi
 */
export class BaseTokenStorage implements TokenStorage {

    private readonly ACT = 'angularFlowAccessToken';
    private readonly RFT = 'angularFlowRefreshToken';

    get(type: TokenType): Promise<string | null>;
    get(type: TokenType): string | null;
    get(type: TokenType): (string | null) | Promise<string | null> {
        if (type === 'accessToken') {
            return window.localStorage.getItem(this.ACT);
        } else {
            return window.localStorage.getItem(this.RFT);
        }
    }

    set(resource: TokenResource): Promise<void>;
    set(resource: TokenResource): void;
    set(resource: TokenResource): void | Promise<void> {
        window.localStorage.setItem(this.ACT, resource.accessToken);
        window.localStorage.setItem(this.RFT, resource.refreshToken);
    }

    removes(): Promise<void>;
    removes(): void;
    removes(): void | Promise<void> {
        window.localStorage.removeItem(this.ACT);
        window.localStorage.removeItem(this.RFT);
    }
}