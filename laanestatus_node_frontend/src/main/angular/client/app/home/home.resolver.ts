import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from 'rxjs';

import {LoansResolved} from "../loans/loan.interface";
import {LoanService} from "../loans/loans.service";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {

  constructor(private loanService: LoanService,
              private loginService: LoginService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const partnerCode = this.loginService.libraryNumber;
      return !(partnerCode === null || isNaN(+partnerCode) || +partnerCode < 100000 || +partnerCode > 999999);

    }
  }
