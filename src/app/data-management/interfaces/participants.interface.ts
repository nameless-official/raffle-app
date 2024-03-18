import { Prize } from './prize.interface';

export interface Participant {
  participant_id: number;
  discord_user_id: string;
  name: string;
  email: string;
  entry_date: Date;
  prize?: Prize;
}
