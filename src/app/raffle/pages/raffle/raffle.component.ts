import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RafflesService } from '../../services/raffles.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.scss'],
  providers: [MessageService]
})
export class RaffleComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private rafflesService = inject(RafflesService)
  private messageService = inject(MessageService);


  protected raffleSlug = signal<string>('')
  protected showForm = signal<boolean>(false);
  protected isLoading = signal<boolean>(true);

  raffle: any // Variable para almacenar la información del sorteo


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

  loadRaffleData() {
    this.rafflesService.getAllPublicRecordBySlug(this.raffleSlug()).subscribe({
      next: raffle => {
        this.raffle = raffle
        this.isLoading.set(false)
      },
      error: error => {
        console.error(error)
        this.isLoading.set(false)
      }
    })
  }

  participate() {
    this.showForm.set(true);
  }


  processResponseCreate(event: boolean): void {
    this.onFinishResponseForm(event, 'El registro ha sido creado exitosamente', true);
  }


  onDragEnd(): void {
    this.showForm.set(false);
  }

  private onFinishResponseForm(stateResponse: boolean, message: string, reorder: boolean = false): void {
    if (stateResponse) this.messageService.add({
      severity: 'success',
      summary: '¡Operación Exitosa!',
      detail: message
    });
    this.showForm.set(false);
  }


  getImagePath(imagePath: string): string {
    return imagePath !== '' ? imagePath : './../../../../assets/devtalles-branding/gift-devi-3.png'
  }
}
