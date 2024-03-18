import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL: string = environment.API_URL
  private http = inject(HttpClient)

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  public currentUser = computed(() => this._currentUser())
  public authStatus = computed(() => this._authStatus())

  constructor() {

    this.checkAuthStatus().subscribe()

  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)
    return true
  }


  login(username: string, password: string): Observable<boolean> {

    const url = `${this.API_URL}/auth/login`;
    const body = { username, password }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
      )
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.API_URL}/auth/check-token`
    const token = localStorage.getItem('token')

    if (!token) {
      this.logout()
      return of(false)
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ token, user }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)
        })
      )
  }


  logout(): void {
    localStorage.removeItem('token')
    this._currentUser.set(null)
    this._authStatus.set(AuthStatus.notAuthenticated)
  }
}
