import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RaffleRoutingModule } from './raffle-routing.module';
import { RaffleLayoutComponent } from './layout/raffle-layout/raflle-layout.component';
import { RafflesComponent } from './pages/raffles/raffles.component';
import { NotRafflesComponent } from './components/raffle/not-raffles/not-raffles.component';
import { ListRafflesComponent } from './components/raffle/list-raffles/list-raffles.component';
import { RaffleComponent } from './pages/raffle/raffle.component';



@NgModule({
  declarations: [RaffleLayoutComponent, RafflesComponent, NotRafflesComponent, ListRafflesComponent, RaffleComponent],
  imports: [
    CommonModule,
    RaffleRoutingModule,
    SharedModule
  ]
})
export class RaffleModule { }