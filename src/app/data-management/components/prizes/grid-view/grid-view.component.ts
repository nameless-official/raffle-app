import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prize } from 'src/app/data-management/interfaces/prize.interface';

@Component({
  selector: 'prize-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewPrizeComponent {

  @Input({ required: true }) prize!: Prize;
  @Output() onEditData: EventEmitter<Prize> = new EventEmitter<Prize>();
  @Output() onDeleteData: EventEmitter<Prize> = new EventEmitter<Prize>();


  onEdit(prizeData: Prize) {
    this.onEditData.emit(prizeData);
  }

  onDelete(prizeData: Prize) {
    this.onDeleteData.emit(prizeData);
  }
}
