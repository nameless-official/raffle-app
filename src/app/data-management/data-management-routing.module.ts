import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagementLayoutComponent } from './layout/data-management-layout/data-management-layout.component';
import { RafflesComponent } from './pages/raffles/raffles.component';
import { RaffleStatusComponent } from './pages/raffle-status/raffle-status.component';
import { PrizeLevelsComponent } from './pages/prize-levels/prize-levels.component';
import { PrizesComponent } from './pages/prizes/prizes.component';

const routes: Routes = [
  {
    path: '',
    component: DataManagementLayoutComponent,
    children: [
      {
        path: 'raffles',
        component: RafflesComponent
      },
      {
        path: 'raffles-status',
        component: RaffleStatusComponent
      },
      {
        path: 'prize-levels',
        component: PrizeLevelsComponent
      },
      {
        path: 'prizes',
        component: PrizesComponent
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
export class DataManagementRoutingModule { }
