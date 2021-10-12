import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  spin: boolean = false;
  libraryName: string = '';
  partnerCode: string = '';
  password: string = '';
  errorMessage: string = '';
  loginError: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
  }

  checkValidity() {
    if (parseInt(this.partnerCode) >= 100000 && parseInt(this.partnerCode) <= 999999 && parseInt(this.password) >= 1000 && parseInt(this.password) <= 9999) {
      this.loginService.validate(this.partnerCode, this.password).subscribe({
        next: libraryName => {
          this.libraryName = libraryName;
          this.spin = true;
          this.router.navigate(['loans', this.partnerCode]);
        },
        error: err => {
          this.errorMessage = err;
          this.loginError = true;
        }
      });
    } else {
      this.loginError = true;
    }

  }

  ngOnInit(): void {
    this.loginService.logout();
  }

}
