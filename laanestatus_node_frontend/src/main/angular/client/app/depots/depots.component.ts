import {Component, OnInit} from '@angular/core';
import {IDepot, IDepotEntry} from "./depot.interface";
import {DepotService} from "./depots.service";
import {catchError, map} from "rxjs/operators";
import {LoginService} from "../login/login.service";
import {Observable} from "rxjs";

@Component({
    selector: 'depots',
    templateUrl: './depots.component.html',
    styleUrls: ['./depots.component.scss']
})
export class DepotsComponent implements OnInit {
    $depots!: Observable<IDepot[]>;
    $depotEntries!: Observable<IDepotEntry[]>;
    depotEntryNr!: number;

    partnerCode = this.loginService.libraryNumber;

    constructor(private depotService: DepotService,
                private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.$depots = this.depotService.getDepots(this.partnerCode).pipe(
            map(depots => depots.depotSetSummaries),
            catchError(this.depotService.handleError)
        );

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
}
