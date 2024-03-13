import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './shared/pages/not-found/not-found.component';
import { ErrorComponent } from './shared/pages/error/error.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';

const routes: Routes = [

  {
    path: '', component: AppComponent,
    children: [
      { path: '', component: MainComponent, canActivate: [isAuthenticatedGuard] },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule),
        canActivate: [isNotAuthenticatedGuard]
      },

    ]
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
