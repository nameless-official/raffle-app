import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { RafflesComponent } from './pages/raffles/raffles.component';
import { SharedModule } from '../shared/shared.module';
import { DataManagementLayoutComponent } from './layout/data-management-layout/data-management-layout.component';


@NgModule({
  declarations: [
    RafflesComponent,
    DataManagementLayoutComponent
  ],
  imports: [
    CommonModule,
    DataManagementRoutingModule,
    SharedModule
  ]
})
export class DataManagementModule { }
