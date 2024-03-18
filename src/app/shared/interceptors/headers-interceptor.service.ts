import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HeadersInterceptor implements HttpInterceptor {

  private messageService = inject(MessageService)


  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token')

    let newRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })

    return next.handle(newRequest).pipe(
      catchError(({ error, status }: HttpErrorResponse) => {
        if(status !== 401 && status !== 0) 
        this.messageService.add({
          severity: 'error',
          summary: error.error,
          detail: error.message
        });

        return throwError(() => error)
      })
    );

  }

}
