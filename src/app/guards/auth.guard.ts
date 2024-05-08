import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { getUserAction } from "src/entities";
import { EventBus, getAccessToken } from "src/shared";

export const AuthGuard: CanActivateFn = () => {
    const router = inject(Router);

    const eventBus = inject(EventBus);

    if (!getAccessToken()) {
        window.alert('먼저 로그인 해주세요.');
        router.navigateByUrl('/login');
        return false;
    }

    eventBus.publish(getUserAction());

    return true;
};