import {Component, Input, OnInit} from '@angular/core';
import {IDepot, IDepotEntry, IDepotsAndLibraryInfo} from "./depot.interface";
import {DepotService} from "./depots.service";
import {catchError, map} from "rxjs/operators";
import {LoginService} from "../login/login.service";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Component({
    selector: 'depots',
    templateUrl: './depots.component.html',
    styleUrls: ['./depots.component.scss']
})
export class DepotsComponent implements OnInit {
    @Input() depotsInfo!: IDepotsAndLibraryInfo;
    depots!: IDepot[];
    $depotEntries!: Observable<IDepotEntry[]>;
    depotEntryNr!: number;
    partnerCode = this.loginService.libraryNumber;

    depotPdfUrl: string = environment.API_HOST_URL + environment.GET_DEPOT_PDF_URL + this.partnerCode;

    constructor(private depotService: DepotService,
                private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.depots = this.depotsInfo.depotSetSummaries;
    }

    getDepotInfo(depotId: number) {
        this.depotEntryNr = depotId;
        this.$depotEntries = this.depotService.getDepotInfo(this.partnerCode, depotId.toString()).pipe(
            map(depotInfo => depotInfo.entries),
        );

        this.$depotEntries.subscribe();
        return false; // Return false to anchor tag to prevent default (href)
    }

    printDepot() {
        window.print();
    }

    sortArrays(field: keyof IDepot, isDate: boolean) {
        let sortingOrder: string = DepotsComponent.getCurrentSortingOrder(field, isDate) === 'desc' ? 'asc' : 'desc';
        DepotsComponent.addAndRemoveSortClasses(field, sortingOrder);

        [this.depots] = [this.depots].map(array => this.sort(array.slice(0), field, isDate, sortingOrder));
    }

    static getCurrentSortingOrder(field: keyof IDepot, isDate: boolean): string {
        if(isDate){
            return document.getElementById(field)!.classList.contains('desc') ? 'desc' : 'asc'; // Default Descending for dates
        } else {
            return document.getElementById(field)!.classList.contains('asc') ? 'asc' : 'desc'; // Default ascending for text
        }
    }

    static addAndRemoveSortClasses(field: keyof IDepot, className: string): void {
        document.querySelectorAll('.sortable').forEach((el) => el.classList.remove('desc', 'asc'));
        document.getElementById(field)!.classList.add(className);
    }

    sort(array: any[], field: keyof IDepot, isDate: boolean, sortingOrder: string) {
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
}
