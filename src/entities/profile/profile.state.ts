import { Injectable, computed, signal } from "@angular/core";
import { User } from "firebase/auth";
import { ProfileModel } from "./profile.model";

@Injectable({
    providedIn: 'root'
})
export class ProfileState {

    private readonly _profile = signal<ProfileModel|null>(null);

    readonly profile = computed(() => this._profile());

    getUserId() {
        const userId = this.profile()?.id;
        if (!userId) {
            throw new Error('User ID is not found');
        }

        return userId;
    }

    initByFirebaseUser(user: User) {
        this._profile.set({
            id: user.uid,
            email: user.email ?? '',
            nickname: user.displayName ?? '',
            photoURL: user.photoURL ?? ''
        });
    }
}