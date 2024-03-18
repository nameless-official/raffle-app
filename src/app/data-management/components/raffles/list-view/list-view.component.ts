import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Raffle } from 'src/app/data-management/interfaces/raffle.interface';

@Component({
  selector: 'raffle-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent {
  @Input({ required: true }) raffle!: Raffle;
  @Output() onViewData: EventEmitter<Raffle> = new EventEmitter<Raffle>();
  @Output() onEditData: EventEmitter<Raffle> = new EventEmitter<Raffle>();
  @Output() onDeleteData: EventEmitter<Raffle> = new EventEmitter<Raffle>();

  getStatusRaffleMessageByIsFinished = (status: boolean): string =>
    (status ? 'inactive' : 'active').toLowerCase();

  onView(raffleData: Raffle) {
    this.onViewData.emit(raffleData);
  }

  onEdit(raffleData: Raffle) {
    this.onEditData.emit(raffleData);
  }

  onDelete(raffleData: Raffle) {
    this.onDeleteData.emit(raffleData);
  }
}
