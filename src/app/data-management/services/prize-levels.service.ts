import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SearchCondition } from 'src/app/shared/interfaces/search-condition.interface';
import { environment } from 'src/environments/environment';
import { PrizeLevel } from '../interfaces/prize-level.interface';

@Injectable({
  providedIn: 'root'
})
export class PrizeLevelsService {


  private readonly API_URL: string = `${environment.API_URL}/prize_level`
  private http = inject(HttpClient)

  constructor() { }

  getAllRecords(offset: number, limit: number, orderField: string = 'name', orderDirection: number = 1): Observable<PrizeLevel[]> {
    const headers = new HttpHeaders().
      set('limit', limit.toString()).
      set('offset', offset.toString()).
      set('order', orderField).
      set('direction', orderDirection.toString());

    return this.http.get<PrizeLevel[]>(`${this.API_URL}`, { headers })

  }

  createRecord(record: PrizeLevel): Observable<PrizeLevel> {
    return this.http.post<PrizeLevel>(`${this.API_URL}`, record)
  }

  searchRecords(conditions: SearchCondition[]): Observable<PrizeLevel[]> {
    return this.http.post<PrizeLevel[]>(`${this.API_URL}/search`, { conditions })
  }

  deleteBatchRecords(conditions: SearchCondition[]): Observable<any> {
    return this.http.delete<PrizeLevel[]>(`${this.API_URL}/batchRemove`, { body: { conditions } })
  }

  getRecord(recordId: number): Observable<PrizeLevel[]> {
    return this.http.get<PrizeLevel[]>(`${this.API_URL}/${recordId}`)
  }

  updateRecord(recordId: number, record: PrizeLevel): Observable<PrizeLevel> {
    return this.http.put<PrizeLevel>(`${this.API_URL}/${recordId}`, record)
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
