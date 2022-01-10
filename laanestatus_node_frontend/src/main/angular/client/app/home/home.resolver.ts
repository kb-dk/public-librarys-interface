import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';

import {LoanService} from "../loans/loans.service";
import {DepotService} from "../depots/depots.service";
import {LoginService} from "../login/login.service";
import {IHome} from "./home.interface";
import {catchError} from "rxjs/operators";
import {IDepotsAndLibraryInfo} from "../depots/depot.interface";

@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<IHome> {

    constructor(private loanService: LoanService,
                private loginService: LoginService,
                private depotService: DepotService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHome> {
        const partnerCode = this.loginService.libraryNumber;

        let $loans = this.loanService.getLoans(partnerCode).pipe(
            catchError(error => {
                console.log(error);
                return of([]);

            }),
        );

        let $depots = this.depotService.getDepots(partnerCode).pipe(
            catchError(error => {
                console.log(error);
                let emptyDepot: IDepotsAndLibraryInfo = {
                    addressFields: '',
                    borrowerID: '',
                    depotSetSummaries: [],
                    emails: [],
                    knownLibrary: false,
                    libraryNumber: '',
                    name: '',
                };
                return of(emptyDepot);

            }),
        );

        return forkJoin({
            loans: $loans,
            depots: $depots,
        });

    }
}
