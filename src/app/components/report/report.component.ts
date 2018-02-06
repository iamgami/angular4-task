
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Api } from './../../../services/api.provider';
declare var $: any;
declare var jQuery: any;
declare var google: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  value: Date;

  constructor(private router: Router,public _APIservices:Api) {
  }

  ngOnInit() {
  }

   loadReport(){
     //this._APIservices.api_ward_route_list_page(url, {}).subscribe(suc => {
          // if (suc.body.next != null) {
          //   for (let item of suc.body.results) {
          //     this.vehicleDataArray[rowCount].push(item);
          //   }
          //   this.routeWithPage(rowCount, suc.body.next);
          // }
        // }, err => {

        // });
  }
}
