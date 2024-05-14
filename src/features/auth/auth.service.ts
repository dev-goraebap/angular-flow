import { Injectable, inject } from "@angular/core";
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Observable, from, switchMap } from "rxjs";
import { ProfileState } from "src/entities";
import { firebaseAuth } from "src/shared";
import { CredentialModel, RegisterModel } from "./auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly profileState = inject(ProfileState);

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

    register({ email, username, password }: RegisterModel) {
        const promise = createUserWithEmailAndPassword(firebaseAuth, email, password);
        from(promise).pipe(
            switchMap(result => {
                const user = result.user;
                return from(updateProfile(user, { displayName: username }));
            })
        ).subscribe();
    }

    login({ email, password }: CredentialModel) {
        const promise = signInWithEmailAndPassword(firebaseAuth, email, password);
        from(promise).subscribe();
    }

    logout() {
        const promise = signOut(firebaseAuth);
        return from(promise).subscribe();
    }
}