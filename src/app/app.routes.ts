import { Routes } from '@angular/router';
import { HomeContainerComponent } from './features/home-container/home-container.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeContainerComponent
    },
    {
        path: 'login',
        loadComponent: () =>import("./features/login-container/login-container.component").then((m) => m.LoginContainerComponent),
    },
    { path: '**', redirectTo: '' },

];
