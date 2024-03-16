import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RafflesService } from '../../services/raffles.service';

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.scss']
})
export class RaffleComponent implements OnInit{
  
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private rafflesService = inject(RafflesService)
  protected raffleSlug = signal<string>('')

  raffle: any; // Variable para almacenar la información del sorteo
  


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (!params.slug) {
        this.router.navigate(['/raffles'])
        return
      }
      this.raffleSlug.set(params.slug)
      this.loadRaffleData()
    })

  }

  loadRaffleData(){
    this.rafflesService.getAllPublicRecordBySlug(this.raffleSlug()).subscribe({
      next: raffle => this.raffle = raffle,
      error: error => console.error(error)
    })
  }

  participate() {
    // Aquí iría la lógica para participar en el sorteo
    console.log('Participando en el sorteo...');
  }
  
  getImagePath(imagePath: string): string {
    return imagePath !== '' ? imagePath : './../../../../assets/devtalles-branding/gift-devi-3.png' 
  }
}
