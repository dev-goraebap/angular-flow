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
    <div class="fixed inset-0 bg-white flex justify-center items-center">
      <span class="loading loading-ring loading-lg"></span>
    </div>
  } @else {
    <div>
      <router-outlet></router-outlet>
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
    ).subscribe(console.log);
  }
}
