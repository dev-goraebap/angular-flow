import { Routes } from '@angular/router';
import { AuthGuard } from './guards';

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
        canActivate: [AuthGuard],
        loadComponent: () => import('../pages').then(m => m.HomePage)
    }
];
