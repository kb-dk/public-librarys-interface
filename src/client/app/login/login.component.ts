import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
  form: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router,
              public fb: FormBuilder,
              private http: HttpClient) {
    this.form = this.fb.group({
      partnerCode: '',
      password: ''
    })
  }

  checkValidity() {
    this.submitForm();
    // if (parseInt(this.partnerCode) >= 100000 && parseInt(this.partnerCode) <= 999999 && parseInt(this.password) >= 1000 && parseInt(this.password) <= 9999) {
    //   this.loginService.validate(this.partnerCode, this.password).subscribe({
    //     next: libraryName => {
    //       this.libraryName = libraryName;
    //       this.spin = true;
    //       this.router.navigate(['loans', this.partnerCode]);
    //     },
    //     error: err => {
    //       this.errorMessage = err;
    //       this.loginError = true;
    //     }
    //   });
    // } else {
    //   this.loginError = true;
    // }

  }

  submitForm() {
    let formData: any = new FormData();
    formData.set("partnerCode", this.partnerCode);
    formData.set("password", this.password);

    // console.log(formData.values(), this.partnerCode, this.password);
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const headers = { 'content-type': 'application/json'};
    const body = { title: 'Angular POST Request Example' };

    this.http.post('http://localhost:3000/api/v1/login', JSON.stringify({"partnerCode": this.partnerCode}), {'headers':headers}).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  ngOnInit(): void {
    this.loginService.logout();
  }

}
