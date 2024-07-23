import { computed, signal } from "@angular/core";
import { Preferences } from "@capacitor/preferences";
import { TokenResource, TokenStorage } from "projects/oauth2/src/public-api";
import { from, map } from "rxjs";

/**
 * Note: capacitor preference API 를 사용하는 기본제공 토큰스토리지
 * 
 * @publicApi
 */
export class CapacitorTokenStorage implements TokenStorage {

    private readonly state = signal<TokenResource>({
        accessToken: '',
        refreshToken: ''
    });

    private readonly ACT = 'angularFlowAccessToken';
    private readonly RFT = 'angularFlowRefreshToken';

    readonly select = computed(() => this.state());

    constructor() {
        // 스토리지에서 데이터 조회
        const act = Preferences.get({
            key: this.ACT
        });
        const rft = Preferences.get({
            key: this.RFT
        });
        // promise 를 observable 형태로 변환해서 구독
        const promise = Promise.all([act, rft]);
        from(promise).pipe(
            map(([actResult, rftResult]) => {
                // 상태 업데이트
                this.state.set({
                    accessToken: actResult.value ?? '',
                    refreshToken: rftResult.value ?? ''
                });
            })
        ).subscribe();
    }

    set(resource: TokenResource): void {
        // 상태 업데이트
        this.state.set({
            accessToken: resource.accessToken,
            refreshToken: resource.refreshToken
        });
        // 스토리지에 데이터 저장
        const promise1 = Preferences.set({
            key: this.ACT,
            value: resource.accessToken
        });
        const promise2 = Preferences.set({
            key: this.RFT,
            value: resource.refreshToken
        });
        from(Promise.all([promise1, promise2])).pipe(
            map(() => void 0)
        ).subscribe();
    }

    removes(): void {
        // 상태 업데이트
        this.state.set({
            accessToken: '',
            refreshToken: ''
        });
        // 스토리지 비우기
        const promise1 = Preferences.remove({
            key: this.ACT
        });
        const promise2 = Preferences.remove({
            key: this.RFT
        });
        from(Promise.all([promise1, promise2])).pipe(
            map(() => void 0)
        ).subscribe();
    }
}