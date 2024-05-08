import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('../pages').then(m => m.LoginPage)
    },
    {
        path: 'home',
        loadComponent: () => import('../pages').then(m => m.HomePage)
    }
];
