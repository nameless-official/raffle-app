import { Prize } from 'src/app/data-management/interfaces/prize.interface';
import { RaffleStatus } from './raffle-status.interface';

export interface Raffle {
  raffle_id: number;
  name: string;
  start_date: string | Date;
  end_date: string | Date;
  description: string;
  slug: string;
  image_url: string;
  image_thumbnail_url: string;
  raffleStatus: RaffleStatus;
}

export interface RaffleWithPrizes extends Raffle {
  prizes: Prize[];
}
