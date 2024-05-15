import { Component, inject } from "@angular/core";
import { ProfileState } from "./profile.state";

@Component({
    selector: 'profile-card',
    standalone: true,
    template: `
    @if (profile(); as profile) {
        <div class="alert">
            <div>
                <div class="avatar">
                    <div class="w-16 mask mask-squircle">
                        <img [src]="
                        profile.photoURL 
                        ? profile.photoURL 
                        : 'https://gravatar.com/userimage/250028658/5cacb838815a2487f4f19b205fe072fb.jpeg?size=256'" />
                    </div>
                </div>
            </div>
            <div class="relative bottom-1">
                <h3 class="font-bold">{{profile.nickname}}</h3>
                <div class="text-xs">{{profile.email}}</div>
            </div>
            <ng-content content="[slot='buttons']"></ng-content>
        </div>
    }
    `
})
export class ProfileCardComponent {

    private readonly profileState = inject(ProfileState);

    readonly profile = this.profileState.profile;
}