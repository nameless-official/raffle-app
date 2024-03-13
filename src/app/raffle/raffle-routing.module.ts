import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaffleLayoutComponent } from './layout/raffle-layout/raflle-layout.component';
import { RafflesComponent } from './pages/raffles/raffles.component';

const routes: Routes = [
  {
    path: '',
    component: RaffleLayoutComponent,
    children: [
      {
        path: 'raffles',
        component: RafflesComponent
      },
      {
        path: '**',
        redirectTo: '/notfound'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaffleRoutingModule { }