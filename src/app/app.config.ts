import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideOAuth2WithHttpClient } from 'projects/oauth2/src/public-api';
import { authMockInterceptors, RefreshTokensUsecase } from '../features/auth';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideOAuth2WithHttpClient({
      refreshBehavior: RefreshTokensUsecase,
      interceptors: authMockInterceptors
    })
  ]
};
