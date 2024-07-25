import { CommonModule } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { TOKEN_STORAGE } from "projects/oauth2/src/public-api";

@Component({
    selector: 'expires-token-button-ui',
    standalone: true,
    imports: [CommonModule],
    template: `
    @if (token(); as token) {
    <button
        (click)="onExpiresToken()"
        class="ring w-full rounded-md p-1 text-white text-xs"
        [ngClass]="{
            'ring-sky-500 bg-sky-500': token === 'accessToken',
            'ring-green-500 bg-green-500': token === 'refreshToken'
        }"
    >
        {{ token === 'accessToken' ? '액세스토큰': '리프레시토큰'}}<br />만료
    </button>
    }
    `
})
export class ExpiresTokenButtonUI {

    readonly token = input.required<'accessToken' | 'refreshToken'>();

    readonly tokenStorage = inject(TOKEN_STORAGE);

    async onExpiresToken() {
        const { accessToken, refreshToken } = await this.tokenStorage.select();

        if (this.token() === 'accessToken') {
            await this.tokenStorage.set({
                accessToken: 'expires_access_token',
                refreshToken: refreshToken ?? '',
            });
        } else {
            await this.tokenStorage.set({
                accessToken: accessToken ?? '',
                refreshToken: 'expires_refresh_token',
            });
        }

        const event = new CustomEvent('UPDATE_TOKENS');
        document.dispatchEvent(event);
    }
}