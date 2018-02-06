import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Api } from './../../../services/api.provider';

declare var $: any;
declare var jQuery: any;
declare var google: any;

@Component({
  selector: 'app-driver-performance-report',
  templateUrl: './driver-performance-report.component.html',
  styleUrls: ['./driver-performance-report.component.scss']
})
export class DriverPerformanceReportComponent implements OnInit {
  opensidebar: any;
  closesidebar: any;
  monthdetails : any;
  yeardetails : any;
  getPerformanceReport: any;
  selectedMonth :any;
  selectedYear: any;
  selectedZone:any;
  getZonesList: any;
  constructor(private router: Router, public _APIservices: Api,) {
      this.monthdetails = [
          {'id': 1, 'name': 'January'},
        //   {'id': 2, 'name': 'February'},
        //   {'id': 3, 'name': 'March'},
        //   {'id': 4, 'name': 'April'},
        //   {'id': 5, 'name': 'May'},
        //   {'id': 6, 'name': 'June'},
        //   {'id': 7, 'name': 'July'},
        //   {'id': 8, 'name': 'August'},
        //   {'id': 9, 'name': 'September'},
          {'id': 10, 'name': 'October'},
          {'id': 11, 'name': 'November'},
          {'id': 12, 'name': 'December'}];
          this.yeardetails = [2017,2018];
          this.selectedMonth = 12;
          this.selectedYear = 2017;
          this.selectedZone = '';
  }
loadZoneList() {
    try {
      let body_param = {
      };
      this._APIservices.api_zone_list(body_param)
        .subscribe(
        suc => {
          this.getZonesList = suc.body;
          console.log(this.getZonesList);
        },
        err => {

        });
    } catch (err) {
      console.log(err);
    }
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
    this.loadZoneList();
    this.opensidebar = document.getElementById('sidebarCollapseopen');
    this.closesidebar = document.getElementById('sidebarCollapseclose');
    this.driverPerformanceReport();
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
  driverPerformanceReport(){
      
      try {
      let body_param = {
          'month':this.selectedMonth,
          'year':this.selectedYear,
          'zone_no': this.selectedZone
      };
      this._APIservices.api_performance_report(body_param)
        .subscribe(
        suc => {
          this.getPerformanceReport = suc.body;
          $('#datatable').DataTable().destroy();
          this.initDatatable();
          console.log(this.getPerformanceReport);
        },
        err => {

        });
    } catch (err) {
      console.log(err);
    }
  }

   initDatatable(): void {
    setTimeout(function(){
        var table=   $('#datatable').DataTable( {
                        dom: 'Bfrtip',
                        buttons: [
                            'excelHtml5',
                            'csvHtml5',
                            'pdfHtml5'
                        ],
                         destroy: true,
                    } );
                    //     table.on( 'order.dt search.dt', function () {
                    //     table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    //         cell.innerHTML = i+1;
                    //     } );
                    // } ).draw();
            },1000)
  }

}
