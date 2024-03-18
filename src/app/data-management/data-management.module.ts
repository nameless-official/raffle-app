import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { RafflesComponent } from './pages/raffles/raffles.component';
import { SharedModule } from '../shared/shared.module';
import { DataManagementLayoutComponent } from './layout/data-management-layout/data-management-layout.component';
import { RaffleStatusComponent } from './pages/raffle-status/raffle-status.component';
import { FormRaffleStatusComponent } from './components/raffle-status/form/form.component';
import { GridViewComponent } from './components/raffles/grid-view/grid-view.component';
import { ListViewComponent } from './components/raffles/list-view/list-view.component';
import { DetailComponent } from './components/raffles/detail/detail.component';
import { ImgUploadComponent } from './components/raffles/img-upload/img-upload.component';
import { FormRaffleComponent } from './components/raffles/form/form.component';
import { PrizeLevelsComponent } from './pages/prize-levels/prize-levels.component';
import { FormPrizeLevelComponent } from './components/prize-levels/form/form.component';
import { ListViewPrizeComponent } from './components/prizes/list-view/list-view.component';
import { GridViewPrizeComponent } from './components/prizes/grid-view/grid-view.component';
import { PrizesComponent } from './pages/prizes/prizes.component';
import { FormPrizeComponent } from './components/prizes/form/form.component';


@NgModule({
  declarations: [
    RafflesComponent,
    DataManagementLayoutComponent,
    RaffleStatusComponent,
    FormRaffleStatusComponent,
    GridViewComponent,
    ListViewComponent,
    DetailComponent,
    ImgUploadComponent,
    FormRaffleComponent,
    PrizeLevelsComponent,
    FormPrizeLevelComponent,
    ListViewPrizeComponent,
    GridViewPrizeComponent,
    PrizesComponent,
    FormPrizeComponent
  ],
  imports: [
    CommonModule,
    DataManagementRoutingModule,
    SharedModule
  ]
})
export class DataManagementModule { }
