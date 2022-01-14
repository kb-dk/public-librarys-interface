import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private CHECK_CREDS_URL = environment.API_HOST_URL + environment.CHECK_CREDS_URL;

    private _libraryName: string = '';
    get libraryName() {
        return this._libraryName ? this._libraryName : this.cookieService.get('libraryName');
    }

    private _libraryNumber: string = '';
    get libraryNumber() {
        return this._libraryNumber ? this._libraryNumber : this.cookieService.get('libraryNumber');
    }

    isLoggedOut: boolean | null = null;

    get isLoggedIn(): boolean {
        if (!this._libraryName && this.cookieService.check('libraryName') && !this.isLoggedOut) {
            this._libraryName = this.cookieService.get('libraryName');
            this._libraryNumber = this.cookieService.get('libraryNumber');
        }
        return !!this._libraryName;
    }

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private router: Router) {
    }

    validate(libraryNumber: string, postcode: string) {
        let loginUrl = this.CHECK_CREDS_URL;
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
            tap(() => this._libraryNumber = libraryNumber),
            tap(data => this._libraryName = data),
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
        this._libraryName = '';
        this._libraryNumber = '';
        this.router.navigate(['/login']);
    }

    static handleError(err: HttpErrorResponse): Observable<never> {
        return throwError(err);
    }

}
