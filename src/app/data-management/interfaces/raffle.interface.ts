import { Prize } from './prize.interface';
import { RaffleStatus } from './raffle-status.interface';

export interface Raffle {
  raffle_id?: number;
  name: string;
  start_date: string | Date;
  end_date: string | Date;
  description: string;
  slug: string;
  image_url: string;
  image_thumbnail_url: string;
  raffleStatus?: RaffleStatus;
  prizes?: Prize[];
}

export interface RaffleDTO {
  name: string;
  start_date: string | Date;
  end_date: string | Date;
  description: string;
  slug: string;
  image_url?: string;
  image_thumbnail_url?: string;
  raffle_status_id?: number;
}
