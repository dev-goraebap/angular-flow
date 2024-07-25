import { InjectionToken } from "@angular/core";

/** @publicApi */
export type TokenResource = {
    accessToken: string;
    refreshToken: string;
}

/** @publicApi */
export type TokenType = 'accessToken' | 'refreshToken';

/**
 * Note: OAuth2 인증, 인가, 토큰 재발급 플로우에 사용되는 
 * 토큰 스토리지 인터페이스입니다.
 * 
 * @publicApi
 */
export interface TokenStorage {
    /**
     * Note: 시그널 형태의 토큰 리소스를 반환합니다.
     */
    select(): Promise<TokenResource>;

    /**
     * Note: `TokenResource` 타입 유형의 객체를 받아
     * 저장합니다.
     */
    set(resource: TokenResource): Promise<void>;

    /**
     * Note: 토큰 리소스를 일괄 삭제합니다.
     */
    removes(): Promise<void>;
}

export const TOKEN_STORAGE = new InjectionToken<TokenStorage>('TokenStorage');