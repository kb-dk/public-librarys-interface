import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  libraryName: string = '';

  get isLoggedIn(): boolean {
    return !!this.libraryName;
  }

  constructor(private http: HttpClient) {
  }

  validate(libraryNumber: string, postcode: string) {
    let loginUrl = 'http://devel12.statsbiblioteket.dk:9011/librarylending/v1/checkCreds?libraryNumber=' + libraryNumber + '&postcode=' + postcode;
    const headers = new HttpHeaders({'Content-Type': 'text/plain; charset=utf-8'});
    return this.http.get(loginUrl, {headers: headers, responseType: 'text'}).pipe(
      tap(data => this.libraryName = data),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
