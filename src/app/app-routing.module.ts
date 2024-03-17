import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './shared/pages/not-found/not-found.component';
import { ErrorComponent } from './shared/pages/error/error.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { MainComponent } from './main.component';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/raffles', pathMatch: 'full'
  },
  {
    path: 'admin', component: MainComponent,
    children: [
      { path: 'admin', component: DashboardComponent, canActivate: [isAuthenticatedGuard] },
      {
        path: 'data-management',
        loadChildren: () => import('./data-management/data-management.module').then(module => module.DataManagementModule),
      },
    ]
  },
  {
    path: 'raffles',
    loadChildren: () => import('./raffle/raffle.module').then(module => module.RaffleModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule),
    canActivate: [isNotAuthenticatedGuard]
  },
  { path: 'error', component: ErrorComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
