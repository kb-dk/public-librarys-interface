import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {IDepot} from "./depot.interface";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private GET_DEPOTS_URL= 'https://forbiblioteker.kb.dk/sproglige-minoriteter/bestillinger/services/bci/depots?_=';
  constructor(private http: HttpClient) {
  }

  getDepots(code: string): Observable<IDepot[]> {
    let depotUrl = this.GET_DEPOTS_URL + code;
   // return this.http.get<IDepot[]>(depotUrl,{withCredentials: true}).pipe(
     return this.http.get<IDepot[]>(depotUrl).pipe(

          catchError(DepotService.handleError)
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
