import { Routes } from '@angular/router';
import { AuthGuard, PublicGuard } from 'src/features';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        canActivate: [PublicGuard],
        loadComponent: () => import('../pages').then(m => m.LoginPage)
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('../pages').then(m => m.DashboardPage)
    },
];
