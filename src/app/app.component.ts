import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService, UserService } from 'src/entities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent { 
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService 
  ) {}
}
