import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  partnerCode: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService :LoginService, private router :Router) { }

  checkValidity(){
    this.loginService.validate(this.partnerCode, this.password).subscribe({
      next: libraryName => {
        // send params and naviate to a new page
        this.router.navigate(['loans', {partnerCode: this.partnerCode, libraryName: libraryName}]);
      },
      error: err => this.errorMessage = err
    });

  }

  ngOnInit(): void {
  }

}
