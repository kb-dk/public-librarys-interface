import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SortService {
  constructor() {
  }

    sortArrays(array:any[], field: string, isDate: boolean) {
        let sortingOrder: string = SortService.getCurrentSortingOrder(field, isDate) === 'desc' ? 'asc' : 'desc';
        SortService.addAndRemoveSortClasses(field, sortingOrder);

        return array.map(array => this.sort(array.slice(0), field, isDate, sortingOrder));
    }

    static getCurrentSortingOrder(field: string, isDate: boolean): string {
        if(isDate){
            return document.getElementById(field)!.classList.contains('desc') ? 'desc' : 'asc'; // Default Descending for dates
        } else {
            return document.getElementById(field)!.classList.contains('asc') ? 'asc' : 'desc'; // Default ascending for text
        }
    }

    static addAndRemoveSortClasses(field: string, className: string): void {
        document.querySelectorAll('.sortable').forEach((el) => el.classList.remove('desc', 'asc'));
        document.getElementById(field)!.classList.add(className);
    }

    sort(array: any[], field: string, isDate: boolean, sortingOrder: string) {
        if (isDate) {
            if (sortingOrder === 'desc') {
                array.sort((a, b) => +new Date(b[field]) - +new Date(a[field]))
            } else {
                array.sort((a, b) => +new Date(a[field]) - +new Date(b[field]))
            }
        } else {
            if (sortingOrder === 'desc') {
                array.sort((a, b) => b[field] > a[field] ? 1 : -1)
            } else {
                array.sort((a, b) => a[field] > b[field] ? 1 : -1)
            }
        }
        return array;
    }

  handleError(err: HttpErrorResponse): Observable<never> {
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
