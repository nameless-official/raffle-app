import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagementLayoutComponent } from './layout/data-management-layout/data-management-layout.component';
import { RafflesComponent } from './pages/raffles/raffles.component';
import { RaffleStatusComponent } from './pages/raffle-status/raffle-status.component';
import { RaffleDataComponent } from './pages/raffle-data/raffle-data.component';
import { PrizeLevelsComponent } from './pages/prize-levels/prize-levels.component';

const routes: Routes = [
  {
    path: '',
    component: DataManagementLayoutComponent,
    children: [
      {
        path: 'raffles',
        component: RafflesComponent,
      },
      {
        path: 'raffles-status',
        component: RaffleStatusComponent,
      },
      {
        path: 'raffle-data/:slug',
        component: RaffleDataComponent,
      },
      {
        path: 'prize-levels',
        component: PrizeLevelsComponent,
      },
      {
        path: '**',
        redirectTo: '/notfound',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataManagementRoutingModule {}
