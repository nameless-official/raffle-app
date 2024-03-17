import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagementLayoutComponent } from './layout/data-management-layout/data-management-layout.component';
import { RafflesComponent } from './pages/raffles/raffles.component';

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
