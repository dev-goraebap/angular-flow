import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { oauth2Interceptor, provideOauth2 } from 'oauth2';
import { authMockInterceptors, RefreshTokensUsecase } from '../features/auth';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        oauth2Interceptor,
        ...authMockInterceptors
      ])
    ),
    provideOauth2({
      tokenRefreshBehavior: RefreshTokensUsecase
    })
  ]
};
