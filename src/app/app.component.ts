import { Component, OnInit, inject, computed, effect } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/enums';
import {  NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  public layoutMode = 'static';
  public darkMenu = true;
  public profileMode = 'popup';
  public inputStyle = 'outlined';
  public ripple!: boolean;

  private authService = inject(AuthService)
  private router = inject(Router)

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) return false

    return true
  })

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return
        break;
      //TODO: Add the rest of the cases
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/admin')
        break
      case AuthStatus.notAuthenticated:
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
          const url: string = event.url
          if(url.includes('admin')) this.router.navigateByUrl('/auth/login')
        });
        break
    }

  })

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
