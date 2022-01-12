import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import {IHome} from "./home.interface";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    home!: IHome;

    constructor(private route: ActivatedRoute) {
    }

    activateTab(e: any) {
        e.preventDefault();

        let nav_links = document.getElementsByClassName("nav-link");
        Array.prototype.forEach.call(nav_links, nav_link => {
            nav_link.classList.remove("active"); // deactivate all the other nav-links
        });

        e.target.classList.add('active'); // activate current nav-link

        let tab_panes = document.getElementsByClassName("tab-pane");
        Array.prototype.forEach.call(tab_panes, tab_pane => {
            tab_pane.classList.remove("active"); // deactivate all the other tab-panes
        });
        let tab_pane_to_activate = document.getElementById(e.target.hash.substring(1));
        if (tab_pane_to_activate) {
            tab_pane_to_activate.classList.add('active'); // activate relevant tab-pane
        }
    }

    ngOnInit(): void {
        this.home = this.route.snapshot.data['home'];
    }
}
