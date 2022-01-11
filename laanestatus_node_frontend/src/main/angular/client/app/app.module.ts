import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {CookieService} from 'ngx-cookie-service';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from './shared/shared.module';
import {PagenotfoundComponent} from "./shared/pagenotfound/pagenotfound.component";
import {HomeModule} from "./home/home.module";


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PagenotfoundComponent,
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
        SharedModule,
        HomeModule,
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
