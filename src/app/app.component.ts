import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService, GET_USER, LOGIN, LOGOUT, UserService } from 'src/entities';
import { EventBus } from 'src/shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  private readonly eventBus = inject(EventBus);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  constructor() {
    /** 이벤트 등록 */
    this.eventBus.set(LOGIN, (payload) => this.authService.login(payload));
    this.eventBus.set(LOGOUT, () => this.authService.logout());
    this.eventBus.set(GET_USER, () => this.userService.getUserProfile());
    /** 이벤트 구독 */
    this.eventBus.subscribe();
  }
}
