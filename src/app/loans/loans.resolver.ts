import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from 'rxjs';

import {LoansResolved} from "./loan.interface";
import {LoanService} from "./loans.service";

@Injectable({
  providedIn: 'root'
})
export class LoansResolver implements Resolve<LoansResolved> {

  constructor(private loanService: LoanService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoansResolved> {
    const partnerCode = route.paramMap.get('partnerCode');
    if (partnerCode === null || isNaN(+partnerCode) || +partnerCode < 100000 || +partnerCode > 999999) {
      return of({loans: null, error: 'partner code is not found'});
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
