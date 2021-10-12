import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isLoggedIn() {
    return this.loginService.isLoggedIn;
  }

  get libraryName() {
    return this.loginService.libraryName;
  }

  constructor( private loginService: LoginService,
               private router: Router,
               private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  logOut(){
    this.cookieService.deleteAll();
    this.loginService.libraryName = '';
    this.router.navigateByUrl('/login');
  }

}
