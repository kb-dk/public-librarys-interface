import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {LoansComponent} from "./loans.component";
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
    SharedModule
  ]
})
export class LoansModule {
}
