import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";
import { ToastController } from "src/shared";
import { AuthService } from "../auth.service";

export const AuthGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const toastController = inject(ToastController);

    return authService.loggedInEvent().pipe(
        map(loggedIn => {
            if (!loggedIn) {
                toastController.show('로그인이 필요합니다.', 'warning');
                router.navigateByUrl('/login');
                return false;
            } 
            return true;
        })
    );
}