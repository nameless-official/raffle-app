import { Component, inject } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Raffle } from '../../interfaces/raffle.interface';
import { ActivatedRoute } from '@angular/router';
import { RafflesService } from '../../services/raffles.service';
import { lastValueFrom } from 'rxjs';
import { Participant } from '../../interfaces/participants.interface';
import { ParticipantsService } from '../../services/participants.service';
import { Prize } from '../../interfaces/prize.interface';

@Component({
  selector: 'app-raffle-data',
  templateUrl: './raffle-data.component.html',
  styleUrls: ['./raffle-data.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class RaffleDataComponent {
  raffle?: Raffle;
  loading: boolean = false;
  participants: Participant[] = [];
  selectedParticipantsIds: number[] = [];
  availablePrizes: { prize_id: number; sort: number }[] = [];
  winners: Participant[] = [];

  constructor(
    private route: ActivatedRoute,
    private raffleService: RafflesService,
    private participantService: ParticipantsService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getRaffleData();
  }

  async getRaffleData() {
    this.loading = true;
    const slug = this.route.snapshot.params.slug;
    this.raffle = await lastValueFrom(
      this.raffleService.getAllPublicRecordBySlug(slug)
    );

    if (this.raffle.raffleStatus.is_finished) {
      await this.getRaffleWinners();
      this.loading = false;
      return;
    }

    this.availablePrizes = this.raffle.prizes
      .map(({ prize_id, prizeLevel }) => {
        return {
          prize_id,
          sort: prizeLevel.sort,
        };
      })
      .sort((a, b) => a.sort - b.sort);

    await this.getParticipants();
    this.loading = false;
  }

  async getParticipants() {
    this.participants = await lastValueFrom(
      this.participantService.searchRecords([
        { field: 'raffle_id', value: this.raffle.raffle_id, operator: '=' },
      ])
    );
  }

  async getRaffleWinners() {
    this.winners = await lastValueFrom(
      this.raffleService.getRaffleWinners(this.raffle.slug)
    );
  }

  selectParticipant(participantId: number): void {
    if (this.selectedParticipantsIds.includes(participantId)) {
      this.selectedParticipantsIds = this.selectedParticipantsIds.filter(
        (id) => id !== participantId
      );
      return;
    }
    if (this.selectedParticipantsIds.length == this.availablePrizes.length)
      return;
    this.selectedParticipantsIds.push(participantId);
  }

  getSortedWinners(): string[] {
    return this.selectedParticipantsIds.map((participanId) => {
      const participant = this.participants.find(
        (participant) => participant.participant_id === participanId
      );
      return `${participant.name}`;
    });
  }

  loadData() {
    this.getRaffleData();
  }

  selectWinnersManually() {
    if (this.selectedParticipantsIds.length === 0) return;

    if (this.selectedParticipantsIds.length !== this.availablePrizes.length)
      return;

    const sortedWinners = this.getSortedWinners();
    const sortedWinnersList = `<ol><li>${sortedWinners.join(
      '</li><li>'
    )}</li></ol>`;

    this.confirmationService.confirm({
      key: 'selectConfirmation',
      message: `<p>¿Los ganadores tendrán un premio asignado según el orden de selección?</p>
      ${sortedWinnersList}
      <br> Esta acción finalizará el sorteo`,
      header: 'Confirmar Selección de Ganadores',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        const winners = this.selectedParticipantsIds.map(
          (participantId, index) => {
            return {
              participant_id: participantId,
              prize_id: this.availablePrizes[index].prize_id,
            };
          }
        );
        this.raffleService
          .selectWinnersManually(this.raffle.raffle_id, winners)
          .subscribe(() => {
            this.loadData();
          });
      },
      reject: () => {},
    });
  }

  selectWinnersFisherYates() {
    this.confirmationService.confirm({
      key: 'selectConfirmation',
      message: `<p>Al seleccionar este método los participantes se seleccionarán de forma automática utilizando el algoritmo Fisher-Yates, que se utiliza tipicamente para barajar en los juegos de azar.</p>
      <br> Esta acción finalizará el sorteo`,
      header: 'Confirmar Selección de Aleatoria de Ganadores',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.raffleService
          .selectWinnersFisherYates(this.raffle.raffle_id)
          .subscribe(() => {
            this.loadData();
          });
      },
      reject: () => {},
    });
  }

  selectWinnersParallelShuffle() {
    this.confirmationService.confirm({
      key: 'selectConfirmation',
      message: `<p>Al seleccionar este método los participantes se seleccionarán de forma automática utilizando el algoritmo ParallelShuffle,  toma un arreglo de elementos, los mezcla de manera aleatoria y luego los vuelve a agregar al arreglo original en un orden aleatorio.</p>
      <br> Esta acción finalizará el sorteo`,
      header: 'Confirmar Selección de Aleatoria de Ganadores',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.raffleService
          .selectWinnersParallelShuffle(this.raffle.raffle_id)
          .subscribe(() => {
            this.loadData();
          });
      },
      reject: () => {},
    });
  }
}
