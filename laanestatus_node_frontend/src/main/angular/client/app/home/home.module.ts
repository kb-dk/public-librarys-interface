import {NgModule} from '@angular/core';

import {RouterModule} from "@angular/router";
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from "./home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
  providers: [
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
    ]),
    SharedModule
  ]
})
export class HomeModule {
}
