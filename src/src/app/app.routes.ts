import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LotteryListComponent } from './pages/lottery-list/lottery-list.component';
import { LotteryDetailComponent } from './pages/lottery-detail/lottery-detail.component';
import { LotteryCreateComponent } from './pages/lottery-create/lottery-create.component';

export const routes: Routes = [
    {
        path: 'lottery',
        component: LotteryListComponent,
    },
    {
        path: 'lottery/create',
        component: LotteryCreateComponent,
    },
    {
        path: 'lottery/:id',
        component: LotteryDetailComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
