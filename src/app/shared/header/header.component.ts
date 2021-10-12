import {Component, OnInit} from '@angular/core';

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

  constructor( private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  logOut(){
    this.loginService.logout();
  }

}
