import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
export class AppComponent { }
