import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { GetProfileUsecase } from "../usecases/get-profile.usecase";

@Component({
    selector: 'fetch-profile-button-ui',
    standalone: true,
    imports: [CommonModule],
    providers: [GetProfileUsecase],
    template: `
    <button
        (click)="onFetchProfile()"
        class="ring ring-yellow-500 bg-yellow-500 w-full rounded-md p-1 text-white text-xs"
    >
        사용자 프로필 <br/> 요청
    </button>
    `
})
export class FetchProfileButtonUI {

    private readonly getProfileUsecase = inject(GetProfileUsecase);

    async onFetchProfile() {
        console.log('사용자 프로필 조회 요청');
        await this.getProfileUsecase.execute();
    }
}