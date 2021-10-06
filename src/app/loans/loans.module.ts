import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {SharedModule} from '../shared/shared.module';
import {LoansComponent} from "./loans.component";
import {LoansResolver} from "./loans.resolver";

@NgModule({
  declarations: [
    LoansComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'loans/:partnerCode',
        component: LoansComponent,
        resolve: {resolvedLoans: LoansResolver}
      },
    ]),
    SharedModule
  ]
})
export class LoansModule {
}
