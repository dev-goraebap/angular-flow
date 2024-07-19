import { afterNextRender, Component, inject } from "@angular/core";
import { TOKEN_STORAGE } from "projects/oauth2/src/public-api";
import { CredentialStore } from "../stores/credential.store";
import { GetProfileUsecase } from "../usecases/get-profile.usecase";

@Component({
    selector: 'credential-example-view-ui',
    standalone: true,
    providers: [
        GetProfileUsecase
    ],
    template: `
    <div class="w-full mt-4">
        <div class="font-bold">인증된 사용자 정보 🐱</div>
        <div>id: {{profile()?.id}}</div>
        <div>nickname: {{profile()?.nickname}} </div>
    </div>
    `
})
export class CredentialExampleViewUI {

    readonly credentialStore = inject(CredentialStore);

    readonly tokenStorage = inject(TOKEN_STORAGE);

    readonly profile = this.credentialStore.select;

    private readonly getProfileUsecase = inject(GetProfileUsecase);

    constructor() {
        afterNextRender(async () => {
            console.log(this.tokenStorage.accessToken());
            console.log(this.tokenStorage.refreshToken());
            if (!this.tokenStorage.accessToken() && !this.tokenStorage.refreshToken()) {
                return;
            }
            await this.getProfileUsecase.execute();
        });
    }
}