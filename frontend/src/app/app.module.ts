import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpMiddleware} from "../core/http-middleware";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderInterceptor} from "../core/loader.interceptor";
import {ProtectedModule} from "./protected/protected.module";
import {LoaderComponent} from "./protected/components/loader/loader.component";
import {AlertComponent} from "./alert/alert.component";
import {NavbarComponent} from "./protected/components/navbar/navbar.component";
import {MenuComponent} from "./protected/components/menu/menu.component";
import {PublicModule} from "./public/public.module";
import {AlertModule} from "ngx-bootstrap/alert";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JwtModule} from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("hades_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AlertComponent,
    NavbarComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    ProtectedModule,
    HttpClientModule,
    AlertModule,
    PublicModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"]
      }
    })
  ],
  providers: [
    BsModalService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpMiddleware, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
