import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private readonly API_URL: string = `${environment.API_URL}/participant`
  private http = inject(HttpClient)

  constructor() { }

  createParticipationRequest(record: {raffle_id: number; discord_user_id: string}): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, record)
  }


}
