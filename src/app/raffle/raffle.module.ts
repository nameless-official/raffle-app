import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RaffleRoutingModule } from './raffle-routing.module';
import { RaffleLayoutComponent } from './layout/raffle-layout/raflle-layout.component';
import { RafflesComponent } from './pages/raffles/raffles.component';


@NgModule({
  declarations: [RaffleLayoutComponent, RafflesComponent],
  imports: [
    CommonModule,
    RaffleRoutingModule,
    SharedModule
  ]
})
export class RaffleModule { }