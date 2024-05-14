import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFirebase } from 'src/shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor() {
    initFirebase();
  }
}
