import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

import { EMPTY, catchError, tap } from "rxjs";

import { removeAccessToken, setAccessToken } from "src/shared";

import { AUTH_API } from "./apis";
import { CredentialModel } from "./models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly router = inject(Router);
    
    private readonly authApi = inject(AUTH_API);
    
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