import { Component, Input } from '@angular/core';
import { Raffle } from 'src/app/raffle/interfaces/raffle.interface';

@Component({
  selector: 'app-list-raffles',
  templateUrl: './list-raffles.component.html',
  styleUrls: ['./list-raffles.component.scss']
})
export class ListRafflesComponent {
  @Input({required: true}) raffles: Raffle[] = []


  
  getImagePath(imagePath: string): string {
    return imagePath !== '' ? imagePath : './../../../../../assets/devtalles-branding/gift-devi-3.png' 
  }
}
