import {Component, Input, OnInit} from '@angular/core';
import {IDepot, IDepotEntry, IDepotsAndLibraryInfo} from "./depot.interface";
import {DepotService} from "./depots.service";
import {catchError, map} from "rxjs/operators";
import {LoginService} from "../login/login.service";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {SortService} from "../shared/sort/sort.service";

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
                private loginService: LoginService,
                private sortService: SortService) {
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

    sortArrays(field: string, isDate: boolean) {
        [this.depots] = this.sortService.sortArrays([this.depots], field, isDate);
    }
}
