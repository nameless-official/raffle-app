import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Raffle } from '../../interfaces/raffle.interface';
import { ActivatedRoute } from '@angular/router';
import { RafflesService } from '../../services/raffles.service';
import { lastValueFrom } from 'rxjs';
import { Participant } from '../../interfaces/participants.interface';
import { ParticipantsService } from '../../services/participants.service';

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

  constructor(
    private route: ActivatedRoute,
    private raffleService: RafflesService,
    private participantService: ParticipantsService
  ) {}

  ngOnInit(): void {
    this.getRaffleData();
  }

  async getRaffleData() {
    this.loading = true;
    const slug = this.route.snapshot.params.slug;
    const raffles = await lastValueFrom(
      this.raffleService.searchRecords([
        { field: 'slug', value: slug, operator: '=' },
      ])
    );
    this.raffle = raffles[0];
    console.log(this.raffle);

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
}
