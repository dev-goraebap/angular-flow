import { DestroyRef, Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";

import { EMPTY, catchError, tap } from "rxjs";

import { EventBus, removeAccessToken, setAccessToken } from "src/shared";

import { LOGIN, LOGOUT } from "./action";
import { AUTH_API } from "./apis";
import { CredentialModel } from "./models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly eventBus = inject(EventBus);

    private readonly router = inject(Router);

    private readonly destroyRef = inject(DestroyRef);
    
    private readonly authApi = inject(AUTH_API);

    constructor() {
        this.eventBus.events$.pipe(
            tap(event => {
                if (event.type === LOGIN) {
                    this.login(event.payload as CredentialModel);
                } else if (event.type === LOGOUT) {
                    this.logout();
                }
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }

    login(credential: CredentialModel): void {
        console.log('start login flow ✨');
        this.authApi.login(credential).pipe(
            tap(response => {
                setAccessToken(response.accessToken);
                this.router.navigateByUrl('/home');
            }),
            catchError((err) => {
                window.alert(err);
                return EMPTY;
            })
        ).subscribe();
    }

    logout(): void {
        console.log('start logout flow ✨');
        removeAccessToken();
        this.router.navigateByUrl('/login');
    }
}