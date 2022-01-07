import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {IDepotsAndLibraryInfo, IDepotInfo} from "./depot.interface";
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DepotService {
    constructor(private http: HttpClient) {
    }

    // Gets all the depots and info about the library
    getDepots(partnerCode: string): Observable<IDepotsAndLibraryInfo> {
        let depotsUrl = environment.API_HOST_URL + environment.GET_DEPOTS_URL + partnerCode;
        return this.http.get<IDepotsAndLibraryInfo>(depotsUrl, {withCredentials: true}).pipe(
            catchError(this.handleError)
        );
    }

    // Gets info about a specific depot number
    getDepotInfo(partnerCode: string, depotId: string): Observable<IDepotInfo> {
        let depotUrl = environment.API_HOST_URL + environment.GET_DEPOT_URL + partnerCode + '/' + depotId;
        return this.http.get<IDepotInfo>(depotUrl, {withCredentials: true}).pipe(
            catchError(this.handleError)
        );
    }

    handleError(err: HttpErrorResponse): Observable<never> {
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
