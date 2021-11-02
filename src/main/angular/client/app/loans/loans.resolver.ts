import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from 'rxjs';

import {LoansResolved} from "./loan.interface";
import {LoanService} from "./loans.service";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class LoansResolver implements Resolve<LoansResolved> {

  constructor(private loanService: LoanService,
              private loginService: LoginService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoansResolved> {
    const partnerCode = route.paramMap.get('partnerCode');
    if (partnerCode === null || isNaN(+partnerCode) || +partnerCode < 100000 || +partnerCode > 999999 || partnerCode !== this.loginService.libraryNumber) {
      return of({loans: null, error: 'error'});
    }
      return this.loanService.getLoans(partnerCode)
        .pipe(
          map(loans => ({loans: loans, error: ''})),
          catchError(error => {
            const message = `Retrieval error: ${error}`;
            console.error(message);
            return of({loans: null, error: message});
          })
        )
        ;
    }
  }
