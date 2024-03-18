import { Component, OnInit, inject, signal } from '@angular/core';
import { Raffle } from '../../interfaces/raffle.interface';
import { RafflesService } from '../../services/raffles.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.scss']
})
export class RafflesComponent implements OnInit {

  protected raffles = signal<Raffle[]>([])

  private rafflesService = inject(RafflesService)

  protected isLoading = signal<boolean>(true)

  ngOnInit(): void {

    this.isLoading.set(true)
    this.rafflesService.getTotalPublicRecords().pipe(
      switchMap(total => this.rafflesService.getAllPublicRecords(0, total))
    ).subscribe({
      next: raffles => {
        this.raffles.set(raffles)
        this.isLoading.set(false)
      },
      error: error => {
        console.error(error)
        this.raffles.set([])
        this.isLoading.set(false)
      }
    })
  }

}
