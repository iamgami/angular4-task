import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Api } from './../../../services/api.provider';
declare var $: any;
declare var jQuery: any;
declare var google: any;

@Component({
  selector: 'app-vehicle-deployment-report',
  templateUrl: './vehicle-deployment-report.component.html',
  styleUrls: ['./vehicle-deployment-report.component.scss']
})
export class VehicleDeploymentReportComponent implements OnInit {
  opensidebar: any;
  closesidebar: any;

  constructor(private router: Router,public _APIservices:Api) {
  }

  ngOnInit() {
    $(document).ready(function () {
        $('#sidebarCollapseopen').on('click', function () {
            $('#sidebar').toggleClass('active');
            $(this).hide();
            $('#sidebarCollapseclose').show();
            $('#content').addClass('content');
        });
        $('#sidebarCollapseclose').on('click', function () {
            $('#sidebar').toggleClass('active');
            $(this).hide();
            $('#sidebarCollapseopen').show();
            $('#content').removeClass('content');
        });
    });
    this.opensidebar = document.getElementById('sidebarCollapseopen');
    this.closesidebar = document.getElementById('sidebarCollapseclose');
  }
  print(): void {
      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
      <html>
          <head>
              <title></title>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
          </head>
          <body onload="window.print();window.close()">${printContents}</body>
      </html>`
      );
      popupWin.document.close();
  }

  getVehicledeployement(){

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
