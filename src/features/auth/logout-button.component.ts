import { Component, inject } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector: 'logout-button',
    standalone: true,
    template: `
    <button class="btn btn-sm bg-white" (click)="onLogout()">로그아웃 🫥</button>
    `
})
export class LogoutButtonComponent {

    private readonly authService = inject(AuthService);

    onLogout() {
        const result = window.confirm('로그아웃 하시겠습니까?');
        if (!result) {
            return;
        }
        this.authService.logout();
    }
}