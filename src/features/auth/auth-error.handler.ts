import { Injectable, inject } from "@angular/core";

import { EMPTY } from "rxjs";

import { ToastController } from "src/shared";

@Injectable({
    providedIn: 'root'
})
export class AuthErrorHandler {

    private readonly toastController = inject(ToastController);

    handle(errCode: string) {
        switch (errCode) {
            case 'auth/invalid-credential':
                this.toastController.show('이메일 혹은 비밀번호가 잘못되었습니다.', 'warning');
                break;
            case 'auth/invalid-email':
                this.toastController.show('올바르지 않은 이메일입니다.', 'warning');
                break;
            case 'auth/weak-password':
                this.toastController.show('비밀번호는 6글자 이상입니다.', 'warning');
                break;
            case 'auth/email-already-in-use':
                this.toastController.show('이미 존재하는 이메일입니다.', 'warning');
                break;
            default:
                this.toastController.show(`회원가입 할 수 없습니다 (${errCode})`, 'warning');
        }
        return EMPTY;
    }
}