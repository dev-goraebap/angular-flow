import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { delay, tap } from 'rxjs';
import { AuthService } from 'src/features';
import { ToastComponent, initFirebase } from 'src/shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent
  ],
  template: `
  @if (!checkCredentials) {
    <div class="fixed inset-0 bg-amber-200 flex justify-center items-center">
      <span class="loading loading-ring loading-lg"></span>
    </div>
  } @else {
    <div class="h-screen flex justify-center bg-gray-100">
      <div class="w-full h-full max-w-2xl border-0 sm:border-x bg-white">
        <router-outlet></router-outlet>
      </div>
    </div>
  }
  <toast-component />
  `,
})
export class AppComponent {

  private readonly authService = inject(AuthService);

  /** 파이어베이스 인증 상태 채크 여부 */
  checkCredentials = false;

  constructor() {
    initFirebase();

    this.authService.loggedInEvent().pipe(
      delay(1000),
      tap(() => this.checkCredentials = true)
    ).subscribe();
  }
}
