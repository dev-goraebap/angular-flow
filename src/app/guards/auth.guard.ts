import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const AuthGuard: CanActivateFn = () => {
    const router = inject(Router);

    router.navigateByUrl('/login');
    return false;
};