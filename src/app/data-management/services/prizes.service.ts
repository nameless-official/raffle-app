import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SearchCondition } from 'src/app/shared/interfaces/search-condition.interface';
import { environment } from 'src/environments/environment';
import { Prize, PrizeDTO } from '../interfaces/prize.interface';

@Injectable({
  providedIn: 'root'
})
export class PrizesService {


  private readonly API_URL: string = `${environment.API_URL}/prize`
  private http = inject(HttpClient)

  constructor() { }

  getAllRecords(offset: number, limit: number, orderField: string = 'name', orderDirection: number = 1): Observable<Prize[]> {
    const headers = new HttpHeaders().
      set('limit', limit.toString()).
      set('offset', offset.toString()).
      set('order', orderField).
      set('direction', orderDirection.toString());

    return this.http.get<Prize[]>(`${this.API_URL}`, { headers })

  }

  createRecord(record: PrizeDTO): Observable<Prize> {
    return this.http.post<Prize>(`${this.API_URL}`, record)
  }

  searchRecords(conditions: SearchCondition[]): Observable<Prize[]> {
    return this.http.post<Prize[]>(`${this.API_URL}/search`, { conditions })
  }

  deleteBatchRecords(conditions: SearchCondition[]): Observable<any> {
    return this.http.delete<Prize[]>(`${this.API_URL}/batchRemove`, { body: { conditions } })
  }

  getRecord(recordId: number): Observable<Prize[]> {
    return this.http.get<Prize[]>(`${this.API_URL}/${recordId}`)
  }

  updateRecord(recordId: number, record: PrizeDTO): Observable<Prize> {
    return this.http.put<Prize>(`${this.API_URL}/${recordId}`, record)
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

  uploadImage(container: string, file: File): Observable<{originalUrl: string; thumbnailUrl: string;}> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('container', container);
    
    return this.http.post<{originalUrl: string; thumbnailUrl: string;}>(`${environment.API_URL}/images/upload`, formData)
  }

}
