import { Preferences } from "@capacitor/preferences";
import { TokenResource, TokenStorage } from "projects/oauth2/src/public-api";

/**
 * Note: capacitor preference API 를 사용하는 기본제공 토큰스토리지
 * 
 * @publicApi
 */
export class CapacitorTokenStorage implements TokenStorage {

    private readonly ACT = 'angularFlowAccessToken';
    private readonly RFT = 'angularFlowRefreshToken';

    async select() {
        const accessToken = await Preferences.get({ key: this.ACT });
        const refreshToken = await Preferences.get({ key: this.RFT });
        return {
            accessToken: accessToken.value ?? '',
            refreshToken: refreshToken.value ?? ''
        };
    }

    async set(resource: TokenResource) {
        await Preferences.set({ key: this.ACT, value: resource.accessToken });
        await Preferences.set({ key: this.RFT, value: resource.refreshToken });
    }

    async removes() {
        await Preferences.remove({ key: this.ACT });
        await Preferences.remove({ key: this.RFT });
    }
}