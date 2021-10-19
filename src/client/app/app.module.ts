import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LoansModule} from './loans/loans.module';
import {SharedModule} from './shared/shared.module';
import {PagenotfoundComponent} from "./shared/pagenotfound/pagenotfound.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: '404', component: PagenotfoundComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: '/404', pathMatch: 'full'}
    ]),
    LoansModule,
    SharedModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
