import { Component, inject } from "@angular/core";
import { TOKEN_STORAGE } from "oauth2";

@Component({
    selector: 'token-example-view-ui',
    standalone: true,
    template: `
    <div class="w-full mt-4">
        <div class="font-bold">로컬스토리지 🛒</div>
        <div>accessToken: {{tokenStorage.getAccessToken()}}</div>
        <div>refreshToken: {{tokenStorage.getRefreshToken()}}</div>
    </div>
    `
})
export class TokenExampleViewUI {

    readonly tokenStorage = inject(TOKEN_STORAGE);

}