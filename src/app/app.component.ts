import { Component, OnInit, inject, computed, effect } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/enums';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';

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
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/')
        break
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('auth/login')
        break
    }

  })

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
