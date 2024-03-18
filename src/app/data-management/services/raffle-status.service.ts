import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SearchCondition } from 'src/app/shared/interfaces/search-condition.interface';
import { environment } from 'src/environments/environment';
import { RaffleStatus } from '../interfaces/raffle-status.interface';

@Injectable({
  providedIn: 'root'
})
export class RaffleStatusService {


  private readonly API_URL: string = `${environment.API_URL}/raffle_status`
  private http = inject(HttpClient)

  constructor() { }

  getAllRecords(offset: number, limit: number, orderField: string = 'name', orderDirection: number = 1): Observable<RaffleStatus[]> {
    const headers = new HttpHeaders().
      set('limit', limit.toString()).
      set('offset', offset.toString()).
      set('order', orderField).
      set('direction', orderDirection.toString());

    return this.http.get<RaffleStatus[]>(`${this.API_URL}`, { headers })

  }

  createRecord(record: RaffleStatus): Observable<RaffleStatus> {
    return this.http.post<RaffleStatus>(`${this.API_URL}`, record)
  }

  searchRecords(conditions: SearchCondition[]): Observable<RaffleStatus[]> {
    return this.http.post<RaffleStatus[]>(`${this.API_URL}/search`, { conditions })
  }

  deleteBatchRecords(conditions: SearchCondition[]): Observable<any> {
    return this.http.delete<RaffleStatus[]>(`${this.API_URL}/batchRemove`, { body: { conditions } })
  }

  getRecord(recordId: number): Observable<RaffleStatus[]> {
    return this.http.get<RaffleStatus[]>(`${this.API_URL}/${recordId}`)
  }

  updateRecord(recordId: number, record: RaffleStatus): Observable<RaffleStatus> {
    return this.http.put<RaffleStatus>(`${this.API_URL}/${recordId}`, record)
  }

  deleteRecord(recordId: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${recordId}`)
  }


  getTotalRecordsByConditions(conditions: SearchCondition[]): Observable<number> {
    return this.http.post<Record<string, number>>(`${this.API_URL}/searchTotalRecords`, { conditions })
      .pipe(
        map(record => record.totalRecords)
      )
  }


  getTotalRecords(): Observable<number> {

    return this.http.get<Record<string, number>>(`${this.API_URL}/getTotalRecords`)
      .pipe(
        map(record => record.totalRecords)
      )
  }



}
