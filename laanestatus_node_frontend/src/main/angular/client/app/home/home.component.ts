import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

import {LoginService} from "../login/login.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

    ngOnDestroy(): void {
  }
}
