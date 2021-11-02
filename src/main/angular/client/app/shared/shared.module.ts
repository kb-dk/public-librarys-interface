import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
