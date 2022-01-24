import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

import {LoginService} from "./login.service";
import * as Error from "./error.interface"

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

    validationError: Error.IValidationErrorMessages = {partnerCode: '', password: ''};
    validationErrors: Error.IValidationErrors = {
        partnerCode: {
            required: 'Indtast venligst dit biblioteksnummer',
        },
        password: {
            required: 'Indtast venligst dit adgangskode',
        }
    };

    serverError: string = '';
    serverErrors: Error.IServerErrors = {
        partnerDosntExit: 'Biblioteksnummer er forkert',
        passwordDosntMatch: 'Adgangskode er forkert',
        internalServerError: 'Noget fejlede. Prøv igen senere eller kontakt servicedesk@kb.dk med detaljer om, hvad der gik galt'
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
            partnerCode: ['', [Validators.required]],
            password: ['', [Validators.required]]
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

    setMessage(controlName: keyof Error.IValidationErrors, c: AbstractControl): void {
        this.validationError = {partnerCode: '', password: ''};
        if ((c.touched || c.dirty) && c.errors) {
            this.validationError[controlName] = Object.keys(c.errors).map(
                key => {
                    // @ts-ignore
                    return this.validationErrors[controlName][key]
                }).join(' ');
        }
    }
}
