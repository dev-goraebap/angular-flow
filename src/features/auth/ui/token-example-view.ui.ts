import { Component, inject } from "@angular/core";
import { TOKEN_STORAGE } from "projects/oauth2/src/public-api";

@Component({
    selector: 'token-example-view-ui',
    standalone: true,
    template: `
    <div class="w-full mt-4">
        <div class="font-bold">로컬스토리지 🛒</div>
        <div>accessToken: {{accessToken()}}</div>
        <div>refreshToken: {{refreshToken()}}</div>
    </div>
    `
})
export class TokenExampleViewUI {

    readonly tokenStorage = inject(TOKEN_STORAGE);

    readonly accessToken = this.tokenStorage.accessToken;
    readonly refreshToken = this.tokenStorage.refreshToken;

    constructor() {
        window.addEventListener('storage', (event) => {
            console.log(event);
        });
    }
}