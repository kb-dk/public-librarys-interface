import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import {ILoan, LoansResolved} from "./loan.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit, OnDestroy {
  allStatuses: string[] = ['Being Processed', 'Created lending request', 'Overdue request', 'Recalled item', 'Received by partner', 'Renew requested', 'Shipped Physically', 'Will Supply', 'Shipped Digitally'];
  partnerCode: string | null = '';
  libraryName: string | null = '';
  errorMessage: string = '';
  filteredLoans: ILoan[] = [];
  searchedLoans: ILoan[] = [];
  filteredAndSearchedLoans: ILoan[] = [];
  loans: ILoan[] = [];
  subscription!: Subscription;
  spin: boolean = false;

  private _status: string = '';
  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
    this.filteredLoans = this.perfomFilter([this._status.replace('_', ' ')]);
    this.searchedLoans = this.filteredLoans;
    this.filteredAndSearchedLoans = this.filteredLoans;
  }

  private _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.searchedLoans = this.perfomSearch(this._searchTerm);
    this.filteredAndSearchedLoans = this.searchedLoans;
  }

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  perfomFilter(values: string[]): ILoan[] {
    return values.includes('All') ? this.loans : this.loans.filter((loan: ILoan) => loan['LendingRequestStatus'] === null ? false : values.includes(loan['LendingRequestStatus']));
  }

  perfomSearch(searchTerm: string): ILoan[] {
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
      this.loans = loans;
    }

    this.filteredLoans = this.loans;
    this.searchedLoans = this.loans;
    this.loans = this.perfomFilter(this.allStatuses);
    this.filteredLoans = this.loans;
    this.searchedLoans = this.loans;
    this.filteredAndSearchedLoans = this.loans;
    this.status = 'All';
  }

  ngOnInit(): void {

    const resolvedLoans: LoansResolved = this.route.snapshot.data['resolvedLoans'];
    this.errorMessage = resolvedLoans.error;
    if (this.errorMessage) {
      console.error(this.errorMessage);
    } else {
      this.onLoansRetrieved(resolvedLoans.loans);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
