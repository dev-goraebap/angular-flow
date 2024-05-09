import { DestroyRef, Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Subject, tap } from "rxjs";
import { ActionModel } from "./action.model";

@Injectable({
    providedIn: 'root'
})
export class EventBus {

    private readonly destroyRef = inject(DestroyRef);

    private readonly store = new Map<string, (payload?: any) => void>();

    private readonly event$ = new Subject<ActionModel>();

    /**
     * ### publish ✨
     * - `ActionModel` 타입을 인자로 받아 이벤트를 발행합니다.
     * - 이벤트가 발행이되면 `subscribe` 함수에 알람이 울립니다. 
     * 이 때 저장해 두었던 이벤트 중에 타입에 해당하는 콜백 함수가 실행됩니다.
     * - actionModel 객체를 그대로 주입해도 되지만 다음과 같이 액션 함수를 만들어
     * 사용할 목적으로 설계하였습니다.
     * ```
     * // example
     * const getUserAction = (userId: string): ActionModel => {
     *      return {
     *          type: 'GET_USER',
     *          payload: userId
     *      }
     * }
     * // usecase
     * this.eventBus.publish(getUserAction(user.id));
     * ```
     */
    publish(action: ActionModel) {
        this.event$.next(action);
    }

    /**
     * ### set 🛒
     * - 이벤트 타입과 콜백 함수를 인자 값으로 받아서 이벤트 스토어에 저장합니다.
     * - 이미 등록된 이벤트 타입이 있다면 에러를 발생시킵니다.
     * - 다음과 같이 사용될 수 있습니다.
     * ```
     * // example
     * private readonly eventBus = inject(EventBus);
     * private readonly authService = inject(AuthService);
     * private readonly userService = inject(UserService);
     * 
     * constructor() {
     *  this.eventBus.set('LOGIN', (payload) => this.authService.login(payload));
     *  this.eventBus.set('LOGOUT', () => this.authService.logout());
     *  this.eventBus.set('GET_USER', (payload) => this.userService.getUserProfile(payload));
     * }
     * 
     * ```
     */
    set(type: string, callback: (payload?: any) => void): void {
        if (this.store.has(type)) {
            throw new Error(`Event type '${type}' is already registered`);
        }
        this.store.set(type, callback);
        console.log(this.store);
    }

    /**
     * ### subscribe 🔔
     * - `publish` 함수 호출을 감지하는 옵저버를 설치해둡니다.
     * - 알람이 울리면 발행한 액션이 전달됩니다. 이 때 이벤트 스토어에 저장된
     * 콜백 함수를 조회하고 찾으면 콜백 함수를 실행합니다.
     */
    subscribe(): void {
        this.event$.pipe(
            tap(action => {
                const callback = this.store.get(action.type);
                if (!callback) {
                    return;
                }
                callback(action?.payload);
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }
}
