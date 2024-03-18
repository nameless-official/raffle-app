import { Component, OnInit, inject, signal } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { MainComponent } from '../../../main.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopBarComponent implements OnInit {

  private authService = inject(AuthService)
  public currentUser = signal<User | null>(null)
  private router = inject(Router)

  constructor(public app: AppComponent, public appMain: MainComponent) { }


  ngOnInit(): void {
    this.currentUser.set(this.authService.currentUser())
  }


  logoutApp(event: MouseEvent) {
    event.preventDefault()
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')
  }
}
