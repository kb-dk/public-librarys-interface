import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

import {LoginService} from "./login.service";

interface ValidationErrorCodes {
    required: string,
    range: string
}

interface ValidationErrors {
    partnerCode: ValidationErrorCodes,
    password: ValidationErrorCodes,
}

interface ValidationErrorMessages {
    partnerCode: string,
    password: string,
}

interface ServerErrors {
    partnerDosntExit: string,
    passwordDosntMatch: string,
    internalServerError: string
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


    loginForm!: FormGroup;
    spin: boolean = false;
    libraryName: string = '';
    loginError: boolean = false;

    emptyValidationError: ValidationErrorMessages = {partnerCode: '', password: ''};
    validationError: ValidationErrorMessages = this.emptyValidationError;
    validationErrors: ValidationErrors = {
        partnerCode: {
            required: 'Indtast venligst dit biblioteksnummer',
            range: 'Biblioteksnummer skal være 6 cifre'
        },
        password: {
            required: 'Indtast venligst dit adgangskode',
            range: 'Adgangskode skal være 4 cifre'
        }
    };

    serverError: string = '';
    serverErrors: ServerErrors = {
        partnerDosntExit: 'Biblioteksnummer er forkert',
        passwordDosntMatch: 'Adgangskode er forkert',
        internalServerError: 'Der er problem med serveren. Kontatk venligst biblioteket.'
    };


    constructor(private loginService: LoginService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    checkValidity(partnerCode: string, password: string) {
        this.loginService.validate(partnerCode, password).subscribe({
            next: libraryName => {
                this.libraryName = libraryName;
                this.spin = true;
                this.router.navigate(['home']);
            },
            error: err => {
                switch (err.status) {
                    case 404: {
                        this.serverError = this.serverErrors.partnerDosntExit;
                        break;
                    }
                    case 400:
                    case 401: {
                        this.serverError = this.serverErrors.passwordDosntMatch;
                        break;
                    }
                    default: {
                        this.serverError = this.serverErrors.internalServerError;
                        break;
                    }
                }
                this.loginError = true;
            }
        });
    }

    submit() {
        let partnerCode = this.loginForm.controls.partnerCode.value;
        let password = this.loginForm.controls.password.value;
        this.checkValidity(partnerCode, password);
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

    setMessage(controlName: keyof ValidationErrors, c: AbstractControl): void {
        this.validationError = this.emptyValidationError;
        if ((c.touched || c.dirty) && c.errors) {
            this.validationError[controlName] = Object.keys(c.errors).map(
                key => {
                    // @ts-ignore
                    return this.validationErrors[controlName][key]
                }).join(' ');
        }
    }
}
