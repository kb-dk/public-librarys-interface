import {Component, OnInit, Input} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

import {ILoan} from "./loan.interface";
import {LoginService} from "../login/login.service";
import {SortService} from "../shared/sort/sort.service";

@Component({
    selector: 'loans',
    templateUrl: './loans.component.html',
    styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

    @Input() loans!: ILoan[];

    statuses: string[] = ['Being Processed', 'Created lending request', 'Overdue request', 'Recalled item', 'Received by partner', 'Renew requested', 'Shipped Physically', 'Will Supply', 'Shipped Digitally'];
    statusesTranslation: string[] = ['Bestilling modtaget eller reserveret', 'Bestilling oprettet', 'Hjemkaldt', 'Materialet er hjemkaldt', 'Udlånt til biblioteket', 'Forespørgsel om fornyelse', 'Udlånt til biblioteket', 'Materialet er reserveret', 'Materialet er leveret elektronisk'];
    partnerCode = this.loginService.libraryNumber;
    filteredLoans: ILoan[] = [];
    searchedLoans: ILoan[] = [];
    filteredAndSearchedLoans: ILoan[] = [];
    subscription!: Subscription;

    get distinctStatusesTranslation(): string[] {
        return this.statusesTranslation.filter((item, i, ar) => ar.indexOf(item) === i);
    }

    private _status: string = '';
    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
        this.filteredLoans = this.performFilter([this._status.replace('_', ' ')]);
        this.searchedLoans = this.filteredLoans;
        this.filteredAndSearchedLoans = this.filteredLoans;
    }

    private _searchTerm: string = '';
    get searchTerm(): string {
        return this._searchTerm;
    }

    set searchTerm(value: string) {
        this._searchTerm = value;
        this.searchedLoans = this.performSearch(this._searchTerm);
        this.filteredAndSearchedLoans = this.searchedLoans;
    }

    constructor(private route: ActivatedRoute,
                private loginService: LoginService,
                private sortService: SortService) {
    }

    performFilter(values: string[]): ILoan[] {
        return values.includes('All') ? this.loans : this.loans.filter((loan: ILoan) => loan['LendingRequestStatus'] === null || loan['LendingRequestStatus'] === undefined ? false : values.includes(loan['LendingRequestStatus']));
    }

    performSearch(searchTerm: string): ILoan[] {
        if (searchTerm === '') {
            return this.filteredLoans;
        } else {
            return this.filteredLoans.filter((loan: ILoan) => Object.values(loan).join(',').toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1);
        }
    }

    onLoansRetrieved(loans: ILoan[] | null) {
        if (loans === null) {
            this.loans = [];
        } else {
            this.loans = this.sortService.sort(loans, 'LendingCreationDate', true, 'desc');
        }
        this.filteredLoans = this.loans;
        this.searchedLoans = this.loans;
        this.loans = this.performFilter(this.statuses);
        this.translateStatus(this.loans);
        this.filteredLoans = this.loans;
        this.searchedLoans = this.loans;
        this.filteredAndSearchedLoans = this.loans;
        this.status = 'All';
    }

    ngOnInit(): void {
        this.onLoansRetrieved(this.loans);
    }

    translateStatus(loans: ILoan[]) {
        for (var i of loans.keys()) {
            if (loans[i].LendingRequestStatus !== null) {
                loans[i].LendingRequestStatus = this.statusesTranslation[this.statuses.indexOf(loans[i].LendingRequestStatus!)];
            }
        }
    }

    sortArrays(field: string, isDate: boolean) {
        [this.filteredAndSearchedLoans, this.loans, this.filteredLoans, this.searchedLoans] = this.sortService.sortArrays([this.filteredAndSearchedLoans, this.loans, this.filteredLoans, this.searchedLoans], field, isDate);
    }

    print() {
        window.print();
    }
}
