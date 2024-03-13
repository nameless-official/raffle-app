import { LOCALE_ID, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { MainComponent } from './main.component';


// Application services
import { BreadcrumbService } from './shared/services/breadcrumb.service';
import { MenuService } from './shared/services/menu.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HeadersInterceptor } from './shared/interceptors/headers-interceptor.service';
import localeEsGT from '@angular/common/locales/es-GT';

registerLocaleData(localeEsGT, 'es-GT')

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule
  ],
  exports: [CommonModule, SharedModule],
  declarations: [
    AppComponent,
    MainComponent,
  ],
  providers: [
    MenuService, BreadcrumbService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'es-GT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
