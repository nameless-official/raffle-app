import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SearchCondition } from 'src/app/shared/interfaces/search-condition.interface';
import { environment } from 'src/environments/environment';
import { Raffle, RaffleDTO } from '../interfaces/raffle.interface';
import { Participant } from '../interfaces/participants.interface';

@Injectable({
  providedIn: 'root',
})
export class RafflesService {
  private readonly API_URL: string = `${environment.API_URL}/raffle`;
  private http = inject(HttpClient);

  constructor() {}

  getAllRecords(
    offset: number,
    limit: number,
    orderField: string = 'start_date',
    orderDirection: number = 1
  ): Observable<Raffle[]> {
    const headers = new HttpHeaders()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('order', orderField)
      .set('direction', orderDirection.toString());

    return this.http.get<Raffle[]>(`${this.API_URL}`, { headers });
  }

  createRecord(record: RaffleDTO): Observable<Raffle> {
    return this.http.post<Raffle>(`${this.API_URL}`, record);
  }

  searchRecords(conditions: SearchCondition[]): Observable<Raffle[]> {
    return this.http.post<Raffle[]>(`${this.API_URL}/search`, { conditions });
  }

  deleteBatchRecords(conditions: SearchCondition[]): Observable<any> {
    return this.http.delete<Raffle[]>(`${this.API_URL}/batchRemove`, {
      body: { conditions },
    });
  }

  getRecord(recordId: number): Observable<Raffle[]> {
    return this.http.get<Raffle[]>(`${this.API_URL}/${recordId}`);
  }

  updateRecord(recordId: number, record: RaffleDTO): Observable<Raffle> {
    return this.http.put<Raffle>(`${this.API_URL}/${recordId}`, record);
  }

  deleteRecord(recordId: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${recordId}`);
  }

  getTotalRecordsByConditions(
    conditions: SearchCondition[]
  ): Observable<number> {
    return this.http
      .post<Record<string, number>>(`${this.API_URL}/searchTotalRecords`, {
        conditions,
      })
      .pipe(map((record) => record.totalRecords));
  }

  getTotalRecords(): Observable<number> {
    return this.http
      .get<Record<string, number>>(`${this.API_URL}/getTotalRecords`)
      .pipe(map((record) => record.totalRecords));
  }

  uploadImage(
    container: string,
    file: File
  ): Observable<{ originalUrl: string; thumbnailUrl: string }> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('container', container);

    return this.http.post<{ originalUrl: string; thumbnailUrl: string }>(
      `${environment.API_URL}/images/upload`,
      formData
    );
  }

  getAllPublicRecordBySlug(slug: string): Observable<Raffle> {
    return this.http.get<Raffle>(`${this.API_URL}/findOneBySlug/${slug}`);
  }

  selectWinnersManually(
    raffleId: number,
    selectedWinners: { participant_id: number; prize_id: number }[]
  ) {
    return this.http.put(
      `${environment.API_URL}/participant/selectWinners/${raffleId}`,
      {
        selectedWinners,
      }
    );
  }

  selectWinnersFisherYates(raffleId: number) {
    return this.http.put(
      `${environment.API_URL}/participant/selectWinnersByFisherYatesAlgorithm/${raffleId}`,
      {}
    );
  }

  selectWinnersParallelShuffle(raffleId: number) {
    return this.http.put(
      `${environment.API_URL}/participant/selectWinnersByParallelShuffleAlgorithm/${raffleId}`,
      {}
    );
  }

  getRaffleWinners(slug: string): Observable<Participant[]> {
    return this.http.get<Participant[]>(
      `${environment.API_URL}/participant/getRaffleWinners/${slug}`
    );
  }
}
