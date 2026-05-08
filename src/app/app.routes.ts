import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing-page.component').then((m) => m.LandingPageComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
