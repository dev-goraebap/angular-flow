import { DestroyRef, Injectable, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { EMPTY, catchError, tap } from "rxjs";

import { EventBus } from "src/shared";

import { logoutAction } from "../auth";

import { GET_USER } from "./actions";
import { USER_API } from "./apis";
import { UserModel } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly eventBus = inject(EventBus);

    private readonly destroyRef = inject(DestroyRef);

    private readonly userApi = inject(USER_API);

    private readonly _state = signal<UserModel|null>(null);

    readonly state = computed(() => this._state());

    constructor() { 
        this.eventBus.events$.pipe(
            tap(event => {
                if (event.type === GET_USER) {
                    this.getUserProfile();
                }
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }

    getUserProfile(): void {
        console.log('start get user profile flow ✨');
        this.userApi.getUserProfile().pipe(
            tap(user => {
                console.log('user profile: ', user);
                this._state.set(user);
            }),
            catchError((err) => {
                window.alert(err);
                this.eventBus.publish(logoutAction());
                return EMPTY;
            })  
        ).subscribe();
    }
}