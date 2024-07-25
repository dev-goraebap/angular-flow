import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Subject, take } from 'rxjs';
import { CredentialExampleViewUI, ExpiresTokenButtonUI, FetchProfileButtonUI, LoginFormUI, TokenExampleViewUI } from '../features/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginFormUI,
    TokenExampleViewUI,
    CredentialExampleViewUI,
    ExpiresTokenButtonUI,
    FetchProfileButtonUI
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  subject = new Subject();
  constructor() {
    Preferences.get({ key: 'test' }).then(res => this.subject.next(res.value));

    this.subject.pipe(
      take(1)
    ).subscribe((res) => console.log(res));
    

    // const promise = Preferences.set({ key: 'test', value: 'test' });
    // from(promise).subscribe(() => console.log('완료'));
  }
}
