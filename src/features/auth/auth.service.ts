import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Observable, catchError, from, switchMap, tap } from "rxjs";
import { ProfileState } from "src/entities";
import { ToastController, firebaseAuth } from "src/shared";
import { AuthErrorHandler } from "./auth-error.handler";
import { CredentialModel, RegisterModel } from "./auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly router = inject(Router);

    private readonly toastController = inject(ToastController);

    private readonly profileState = inject(ProfileState);

    private readonly authErrorHandler = inject(AuthErrorHandler);

    loggedInEvent() {
        return new Observable<boolean>(observer => {
            onAuthStateChanged(firebaseAuth, (user: User|null) => {
                if (!user) {
                    observer.next(false);
                } else {
                    this.profileState.initByFirebaseUser(user);
                    observer.next(true);
                }
                observer.complete();
            });
        });
    }

    register({ email, nickname, password }: RegisterModel) {
        const promise = createUserWithEmailAndPassword(firebaseAuth, email, password);
        from(promise).pipe(
            switchMap(result => {
                const user = result.user;
                return from(updateProfile(user, { displayName: nickname }));
            }),
            tap(() => {
                this.toastController.show('회원가입이 완료되었습니다.','success');
                this.router.navigateByUrl('/dashboard');
            }),
            catchError(err => this.authErrorHandler.handle(err.code))
        ).subscribe();
    }

    login({ email, password }: CredentialModel) {
        const promise = signInWithEmailAndPassword(firebaseAuth, email, password);
        from(promise).pipe(
            tap(() => {
                this.toastController.show('로그인에 성공하였습니다.','success');
                this.router.navigateByUrl('/dashboard');
            }),
            catchError(err => this.authErrorHandler.handle(err.code))
        ).subscribe();
    }

    logout() {
        const promise = signOut(firebaseAuth);
        return from(promise).pipe(
            tap(() => this.router.navigateByUrl('/login'))
        ).subscribe();
    }
}