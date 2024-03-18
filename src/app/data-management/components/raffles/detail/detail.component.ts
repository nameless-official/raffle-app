import { Component, Input } from '@angular/core';
import { Raffle } from 'src/app/data-management/interfaces/raffle.interface';

@Component({
  selector: 'app-raffle-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @Input({ required: true }) raffle: Raffle;
}
