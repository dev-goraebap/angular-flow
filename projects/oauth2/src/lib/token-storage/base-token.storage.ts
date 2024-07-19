import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID, inject } from "@angular/core";
import { TokenStorage } from "./token.storage";
import { TokenResource } from "./token.storage.options";

export class BaseTokenStorage implements TokenStorage<TokenResource> {

    private readonly platformId = inject(PLATFORM_ID);

    getAccessToken(): string | null {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }

        const accessToken = localStorage.getItem('NEST_FLOW_ACCESS_TOKEN');

        if (!accessToken) {
            console.log('No access token found');
            return null;
        }

        return accessToken;
    }

    getRefreshToken(): string | null {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }

        return localStorage.getItem('NEST_FLOW_REFRESH_TOKEN');
    }

    set(resource: TokenResource) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.validate(resource);
        localStorage.setItem('NEST_FLOW_ACCESS_TOKEN', resource.accessToken);
        localStorage.setItem('NEST_FLOW_REFRESH_TOKEN', resource.refreshToken);
    }

    clear() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        localStorage.removeItem('NEST_FLOW_ACCESS_TOKEN');
        localStorage.removeItem('NEST_FLOW_REFRESH_TOKEN');
    }

    private validate(resource: TokenResource) {
        if (!resource?.accessToken || !resource?.refreshToken) {
            throw new Error('Invalid bearer token resource');
        }
    }
}