import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {SharedModule} from '../shared/shared.module';
import {LoansComponent} from "./loans.component";

@NgModule({
  declarations: [
    LoansComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: 'loans', component: LoansComponent},
    ]),
    SharedModule
  ]
})
export class LoansModule {
}
