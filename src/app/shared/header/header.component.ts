import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // TODO:check if there is problem with public loginservice and change the accordingly if needed
  constructor( public loginService: LoginService,
               private router: Router) {
  }

  ngOnInit(): void {
  }

  logOut(){
    this.loginService.libraryName = '';
    this.router.navigateByUrl('/login');
  }

}
