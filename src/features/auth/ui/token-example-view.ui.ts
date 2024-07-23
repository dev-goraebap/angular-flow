import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { TOKEN_STORAGE } from "projects/oauth2/src/public-api";

@Component({
    selector: 'token-example-view-ui',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="w-full mt-4">
        <div class="font-bold">로컬스토리지 🛒</div>
        @if (tokenStorage.select(); as token) {
            <div>accessToken: {{token.accessToken}}</div>
            <div>refreshToken: {{token.refreshToken}}</div>
        }
    </div>
    `
})
export class TokenExampleViewUI {

    readonly tokenStorage = inject(TOKEN_STORAGE);

    constructor() { }
}