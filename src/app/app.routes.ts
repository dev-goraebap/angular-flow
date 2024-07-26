import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'oauth2-example',
        pathMatch: 'full'
    },
    {
        path: 'oauth2-example',
        loadComponent: () => import('../pages/oauth2-example').then(m => m.OAuth2ExamplePageUI)
    }
];
