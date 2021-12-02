import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {ILoan} from "./loan.interface";

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private http: HttpClient) {
  }

  getLoans(partnerCode: string): Observable<ILoan[]> {
    let loanUrl = 'http://devel12.statsbiblioteket.dk:9011/laanestatus/api/partnerLoans/' + partnerCode;
    return this.http.get<ILoan[]>(loanUrl).pipe(
      catchError(LoanService.handleError)
    );
  }

  static handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
