import { TokenResource, TokenStorage } from "./token-storage";

/**
 * Note: window.localStorage API 를 사용하는 기본제공 토큰스토리지
 * 
 * @publicApi
 */
export class BaseTokenStorage implements TokenStorage {

    private readonly ACT = 'angularFlowAccessToken';
    private readonly RFT = 'angularFlowRefreshToken';

    async select() {
        const accessToken = window.localStorage.getItem(this.ACT);
        const refreshToken = window.localStorage.getItem(this.RFT);
        return {
            accessToken: accessToken ?? '',
            refreshToken: refreshToken ?? ''
        };
    }

    async set(resource: TokenResource) {
        window.localStorage.setItem(this.ACT, resource.accessToken);
        window.localStorage.setItem(this.RFT, resource.refreshToken);
    }

    async removes() {
        window.localStorage.removeItem(this.ACT);
        window.localStorage.removeItem(this.RFT);
    }
}