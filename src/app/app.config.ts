import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAuthApi, provideUserApi } from 'src/entities';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuthApi(),
    provideUserApi()
  ]
};
