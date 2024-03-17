import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SearchCondition } from 'src/app/shared/interfaces/search-condition.interface';
import { environment } from 'src/environments/environment';
import * as saveAs from 'file-saver'
import { Raffle } from '../interfaces/raffle.interface';

@Injectable({
  providedIn: 'root'
})
export class RafflesService {


  private readonly API_URL: string = `${environment.API_URL}/raffle`
  private http = inject(HttpClient)

  constructor() { }

  getAllRecords(offset: number, limit: number, orderField: string = 'start_date', orderDirection: number = 1): Observable<Raffle[]> {
    const headers = new HttpHeaders().
      set('limit', limit.toString()).
      set('offset', offset.toString()).
      set('order', orderField).
      set('direction', orderDirection.toString());

    return this.http.get<Raffle[]>(`${this.API_URL}`, { headers })

  }

  createRecord(record: Raffle): Observable<Raffle> {
    return this.http.post<Raffle>(`${this.API_URL}`, record)
  }

  searchRecords(conditions: SearchCondition[]): Observable<Raffle[]> {
    return this.http.post<Raffle[]>(`${this.API_URL}/search`, { conditions })
  }

  deleteBatchRecords(conditions: SearchCondition[]): Observable<any> {
    return this.http.delete<Raffle[]>(`${this.API_URL}/batchRemove`, { body: { conditions } })
  }

  getRecord(recordId: number): Observable<Raffle[]> {
    return this.http.get<Raffle[]>(`${this.API_URL}/${recordId}`)
  }

  updateRecord(recordId: number, record: Raffle): Observable<Raffle> {
    return this.http.put<Raffle>(`${this.API_URL}/${recordId}`, record)
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

  uploadImage(recordId: number, image: File): Observable<Raffle> {
    const formData = new FormData();

    formData.append('image', image);
    return this.http.put<Raffle>(`${this.API_URL}/uploadProductImage/${recordId}`, formData)
  }

}
