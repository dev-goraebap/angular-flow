import { computed, signal } from "@angular/core";
import { TokenResource, TokenStorage } from "./token-storage";

/**
 * Note: window.localStorage API 를 사용하는 기본제공 토큰스토리지
 * 
 * @publicApi
 */
export class BaseTokenStorage implements TokenStorage {

    private readonly state = signal<TokenResource>({
        accessToken: '',
        refreshToken: ''
    });

    private readonly ACT = 'angularFlowAccessToken';
    private readonly RFT = 'angularFlowRefreshToken';

    readonly select = computed(() => this.state());

    constructor() {
        const act = window.localStorage.getItem(this.ACT);
        const rft = window.localStorage.getItem(this.RFT);

        this.state.set({
            accessToken: act ?? '',
            refreshToken: rft ?? ''
        });
    }

    set(resource: TokenResource): void {
        window.localStorage.setItem(this.ACT, resource.accessToken);
        window.localStorage.setItem(this.RFT, resource.refreshToken);
        this.state.set(resource);
    }

    removes(): void {
        window.localStorage.removeItem(this.ACT);
        window.localStorage.removeItem(this.RFT);
        this.state.set({
            accessToken: '',
            refreshToken: ''
        });
    }
}