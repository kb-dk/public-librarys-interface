import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoansComponent } from "./loans/loans-component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoansComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
