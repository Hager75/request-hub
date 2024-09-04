import { Routes } from '@angular/router';

import { RequestListContainerComponent } from './request-list-container/request-list-container.component';
import { ViewEditRequestContainerComponent } from './view-edit-request-container/view-edit-request-container.component';

export const routes: Routes = [
    {
        path: '',
        component: RequestListContainerComponent
    },
    {
        path: ':id',
        component: ViewEditRequestContainerComponent
    },

];
