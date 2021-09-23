import {Component, OnDestroy, OnInit} from "@angular/core";
import {ILoan} from "./loan-interface";
import {LoanService} from "./loans-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'loans',
  templateUrl: './loans-component.html'
})
export class LoansComponent implements OnInit, OnDestroy{
  allStatuses: string[] = ['Being Processed', 'Created lending request', 'Overdue request', 'Recalled item', 'Received by partner', 'Renew requested', 'Shipped Physically', 'Will Supply', 'Shipped Digitally'];
  usedKeys: string[] = [];
  errorMessage: string = '';
  filteredLoans: ILoan[] = [];
  searchedLoans: ILoan[] = [];
  filteredAndSearchedLoans: ILoan[] = [];
  loans: ILoan[] = [];
  subscription!: Subscription;


  private _status: string = '';
  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
    this.filteredLoans = this.perfomFilter([this._status.replace('_',' ')]);
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

  constructor(private loanService: LoanService) {}

  perfomFilter(values: string[]): ILoan[]{
    return values.includes('All')?  this.loans : this.loans.filter((loan: ILoan) => values.includes(loan['LendingRequestStatus']));
  }

  perfomSearch( searchTerm: string ): ILoan[]{
    if (searchTerm === ''){
      return this.filteredLoans;
    } else{
      return this.filteredLoans.filter((loan: ILoan) => Object.values(loan).join(',').indexOf(searchTerm) > -1);
    }
  }

  ngOnInit(): void{
    this.subscription = this.loanService.getLoans().subscribe({
      next: loans => {
        this.loans = loans;
        this.filteredLoans = this.loans;
        this.searchedLoans = this.loans;
        this.loans = this.perfomFilter(this.allStatuses);
        this.filteredLoans = this.loans;
        this.searchedLoans = this.loans;
        this.filteredAndSearchedLoans = this.loans;
        this.status = 'All';
        },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
