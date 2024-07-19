import { computed, Injectable, signal } from "@angular/core";

/**
 * 인증된 사용자 정보
 */
export type CredentialState = {
    readonly id: string;
    readonly nickname: string;
}

@Injectable({
    providedIn: 'root'
})
export class CredentialStore {

    private readonly state = signal<CredentialState | null>(null);

    readonly select = computed(() => this.state());

    init(credential: CredentialState) {
        this.state.set(credential);
    }
}