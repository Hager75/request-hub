import { Routes } from '@angular/router';

import { HomeContainerComponent } from './features/home-container/home-container.component';
import { ErrorComponent } from './layout/error/error.component';
import { authGuard } from './core/guards/auth-guard';
import { errorResolver } from './core/resolvers/error.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login-container/login-container.component').then(
        (m) => m.LoginContainerComponent
      ),
  },
  {
    path: 'requests',
    canMatch: [authGuard],
    loadChildren: () => import('./features/requests/requests.routes').then((mod) => mod.routes),
  },
  {
    path: 'error',
    component: ErrorComponent,
    resolve: { error: errorResolver },
  },

  { path: '**', redirectTo: '' },
];
