import { CommonModule } from "@angular/common";
import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { TOKEN_STORAGE, TokenResource } from "projects/oauth2/src/public-api";

@Component({
    selector: 'token-example-view-ui',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="w-full mt-4">
        <div class="font-bold">로컬스토리지 🛒</div>
        @if (tokens(); as tokens) {
            <div>accessToken: {{tokens.accessToken}}</div>
            <div>refreshToken: {{tokens.refreshToken}}</div>
        }
    </div>
    `
})
export class TokenExampleViewUI {

    readonly tokens = signal<TokenResource>({
        accessToken: '',
        refreshToken: ''
    });

    private readonly tokenStorage = inject(TOKEN_STORAGE);

    constructor() {
        afterNextRender(async () => {
            const { accessToken, refreshToken } = await this.tokenStorage.select();
            this.tokens.set({ accessToken, refreshToken });
        });

        document.addEventListener('UPDATE_TOKENS', async () => {
            const { accessToken, refreshToken } = await this.tokenStorage.select();
            this.tokens.set({ accessToken, refreshToken });
        });
    }
}