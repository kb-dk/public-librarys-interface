import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {SharedModule} from '../shared/shared.module';
import {LoansComponent} from "./loans.component";
import {LoansResolver} from "./loans.resolver";
import {LoginGuard} from "../login/login.guard";
import {RemoveFirstPartPipe} from "../shared/filters/danbib.filter";

@NgModule({
  declarations: [
    LoansComponent,
    RemoveFirstPartPipe
  ],
  providers: [
    RemoveFirstPartPipe
  ],
    exports:[
        LoansComponent
    ],
  imports: [
    RouterModule.forChild([
      {
        path: 'loans/:partnerCode',
        component: LoansComponent,
        resolve: {resolvedLoans: LoansResolver},
        canActivate: [LoginGuard]
      },
    ]),
    SharedModule
  ]
})
export class LoansModule {
}
