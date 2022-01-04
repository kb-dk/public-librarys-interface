import {NgModule} from '@angular/core';

import {RouterModule} from "@angular/router";
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from "./home.component";
import {DepotsComponent} from '../depots/depots.component';
import {LoansModule} from '../loans/loans.module';


@NgModule({
    declarations: [
        HomeComponent,
        DepotsComponent
    ],
    providers: [],
    imports: [
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent,
            },
        ]),
        SharedModule,
        LoansModule
    ]
})
export class HomeModule {
}
