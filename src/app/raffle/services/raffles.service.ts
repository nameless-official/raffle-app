import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Raffle } from '../interfaces/raffle.interface';

@Injectable({
  providedIn: 'root'
})
export class RafflesService {

  private readonly API_URL: string = `${environment.API_URL}/raffle`
  private http = inject(HttpClient)

  constructor() { }

  getAllPublicRecords(offset: number, limit: number, orderField: string = 'start_date', orderDirection: number = 1): Observable<Raffle[]> {
    const headers = new HttpHeaders().
      set('limit', limit.toString()).
      set('offset', offset.toString()).
      set('order', orderField).
      set('direction', orderDirection.toString());

    return this.http.get<Raffle[]>(`${this.API_URL}/getPublishedRaffles`, { headers })
  }


  getAllPublicRecordBySlug(slug: string): Observable<Raffle[]> {

    return this.http.get<Raffle[]>(`${this.API_URL}/findOneBySlug/${slug}`)
  }

  getTotalPublicRecords(): Observable<number> {

    return this.http.get<Record<string, number>>(`${this.API_URL}/getTotalPublishedRaffles`)
      .pipe(
        map(record => record.totalRecords)
      )
  }
}
