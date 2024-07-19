import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID, computed, inject, signal } from "@angular/core";
import { TokenStorage } from "./token.storage";
import { TokenResource } from "./token.storage.options";

export class BaseTokenStorage implements TokenStorage<TokenResource> {

    private readonly platformId = inject(PLATFORM_ID);

    private readonly state = signal<TokenResource>({
        accessToken: '',
        refreshToken: ''
    });

    readonly accessToken = computed(() => {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }
        const { accessToken } = this.state();
        return accessToken !== '' ? accessToken : localStorage.getItem('NEST_FLOW_ACCESS_TOKEN');
    });

    readonly refreshToken = computed(() => {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }
        const { refreshToken } = this.state();
        return refreshToken !== '' ? refreshToken : localStorage.getItem('NEST_FLOW_REFRESH_TOKEN');
    });

    set(resource: TokenResource) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.validate(resource);
        localStorage.setItem('NEST_FLOW_ACCESS_TOKEN', resource.accessToken);
        localStorage.setItem('NEST_FLOW_REFRESH_TOKEN', resource.refreshToken);
        this.state.set(resource);
    }

    clear() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        localStorage.removeItem('NEST_FLOW_ACCESS_TOKEN');
        localStorage.removeItem('NEST_FLOW_REFRESH_TOKEN');
        this.state.set({
            accessToken: '',
            refreshToken: ''
        });
    }

    private validate(resource: TokenResource) {
        if (!resource?.accessToken || !resource?.refreshToken) {
            throw new Error('Invalid bearer token resource');
        }
    }
}