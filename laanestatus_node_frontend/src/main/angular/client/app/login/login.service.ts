import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    libraryName: string = '';
    libraryNumber: string = '';
    isLoggedOut: boolean | null = null;

    get isLoggedIn(): boolean {
        if (!this.libraryName && this.cookieService.check('libraryName') && !this.isLoggedOut) {
            this.libraryName = this.cookieService.get('libraryName');
            this.libraryNumber = this.cookieService.get('libraryNumber');
        }
        return !!this.libraryName;
    }

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private router: Router) {
    }

    validate(libraryNumber: string, postcode: string) {
        let loginUrl = 'http://devel12.statsbiblioteket.dk:9011/laanestatus/api/checkCreds';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'text/plain'
        });
        return this.http.post(loginUrl,
            JSON.stringify({username: libraryNumber, password: postcode}),
            {
                headers: headers,
                responseType: 'text',
                withCredentials: true
            }).pipe(
            tap(() => this.libraryNumber = libraryNumber),
            tap(data => this.libraryName = data),
            tap(() => this.cookieService.set('libraryNumber', libraryNumber, {expires: 0.1})),
            tap(data => this.cookieService.set('libraryName', data, {expires: 0.1})),
            tap(() => this.isLoggedOut = false),
            catchError(LoginService.handleError)
        );
    }

    logout() {
        this.isLoggedOut = true;
        this.cookieService.delete('libraryName');
        this.cookieService.delete('libraryNumber');
        this.libraryName = '';
        this.libraryNumber = '';
        this.router.navigate(['/login']);
    }

    static handleError(err: HttpErrorResponse): Observable<never> {
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
