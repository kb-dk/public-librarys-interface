import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

import {LoginService} from "./login.service";

interface ErrorMessages {
  partnerCode: string,
  password: string,
  dontExist: string
}

interface ErrorCodes {
  required: string,
  range: string
}

interface ValidationMessages {
  partnerCode: ErrorCodes,
  password: ErrorCodes,
  dontExist: string
}

function inputRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if ((c.value !== null && c.value !== '') && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {range: true};
    }
    return null;
  };
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  errorMessage: ErrorMessages = {partnerCode: '', password: '', dontExist: ''};

  loginForm!: FormGroup;
  spin: boolean = false;
  libraryName: string = '';
  loginError: boolean = false;

  validationMessages: ValidationMessages = {
    partnerCode: {
      required: 'Indtast venligst dit biblioteksnummer',
      range: 'Biblioteksnummer skal være 6 cifre'
    },
    password: {
      required: 'Indtast venligst dit adgangskode',
      range: 'Adgangskode skal være 4 cifre'
    },
    dontExist: 'Biblioteksnummer eller adgangskode er forkert'
  };

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  checkValidity() {
    let partnerCode = this.loginForm.controls.partnerCode.value;
    let password = this.loginForm.controls.password.value;

    this.loginService.validate(partnerCode, password).subscribe({
      next: libraryName => {
        this.libraryName = libraryName;
        this.spin = true;
        this.router.navigate(['loans', partnerCode]);
      },
      error: err => {
        this.errorMessage.dontExist = this.validationMessages.dontExist;
        this.loginError = true;
        console.error(err);
      }
    });
  }

  submit() {
    this.checkValidity();
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      partnerCode: ['', [Validators.required, inputRange(100000, 999999)]],
      password: ['', [Validators.required, inputRange(1000, 9999)]]
    });

    const partnerCodeControl = this.loginForm.controls.partnerCode;
    const passwordControl = this.loginForm.controls.password;

    partnerCodeControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
      () => this.setMessage('partnerCode', partnerCodeControl)
    );

    passwordControl.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
      () => this.setMessage('password', passwordControl)
    );

    this.loginService.logout();
  }

  setMessage(controlName: keyof ErrorMessages, c: AbstractControl): void {
    this.errorMessage[controlName] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.errorMessage[controlName] = Object.keys(c.errors).map(
        key => {
          // @ts-ignore
          return this.validationMessages[controlName][key]
        }).join(' ');
    }
  }
}
