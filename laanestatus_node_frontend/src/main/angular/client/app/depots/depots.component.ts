import {Component, OnInit} from '@angular/core';
import {depots} from "./depots";
import {IDepot} from "./depot.interface";
import {DepotService} from "./depots.service";
import {map, tap} from "rxjs/operators";

@Component({
    selector: 'depots',
    templateUrl: './depots.component.html',
    styleUrls: ['./depots.component.scss']
})
export class DepotsComponent implements OnInit {
    depots!: IDepot[];

    constructor(private depotService: DepotService) {
    }

    ngOnInit(): void {
        let _depots: IDepot[] = depots;
        this.depotService.getDepots('1640185471443').pipe(
            tap(depots => this.depots = depots),
        ).subscribe(
            (depots) => {
                console.log(depots);

            },
            () => {
                console.groupCollapsed('Testing console functionalities:'); // Categorize the following console commands in a collapsable group
                console.table(_depots);
                console.dir(_depots);
                console.log(_depots);
                console.assert(depots.length > 0, 'problem in fetching data'); // print the second argument if the assertion is false, otherwise shows nothing
                console.groupEnd();

                console.error('Error fetching data, using hardcoded data instead.');
                this.depots = _depots;
            }
        );

    }

    sortArrays() {

    }

}
