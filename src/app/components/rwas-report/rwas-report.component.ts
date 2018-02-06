
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Api } from './../../../services/api.provider';
declare var $: any;
declare var jQuery: any;
declare var google: any;

@Component({
  selector: 'app-rwas-report',
  templateUrl: './rwas-report.component.html',
  styleUrls: ['./rwas-report.component.scss']
})
export class RwasReportComponent implements OnInit {
  opensidebar: any;
  closesidebar: any;
  getRwaList: any;
  selectedMonth :any;
  selectedYear: any;
  selectedZone:any;
  getZonesList: any;
  getWardsList: any;
  selectedWard: string;
  zoneID: any;
  wardID: any;
  getVehiclesList: any;
  ShiftId:number;
  vehicleInfo: any;
  currentdate: any;
  selectedVehicleImei: string;
  showWardNo: number;
  showZoneNo: number;
  showShift: number;
  selectedVehicleInfo: any;
  showVehicleRegisterNo: string;
  vehicleMovementResult: any;
  optionsModel: number[];
  showLoader: boolean;
  
  public Today_date: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
  constructor(private router: Router,public _APIservices: Api) {
    this.getRwaList=[];
    this.selectedMonth = 12;
    this.selectedYear = 2017;
    this.selectedZone = '';
    this.getWardsList=[];
    this.getVehiclesList=[];
    this.ShiftId=0;
    this.vehicleInfo=[];
    this.selectedVehicleInfo=[];
    this.showVehicleRegisterNo="";
    this.vehicleMovementResult=[];
    this.selectedWard="";
    this.selectedVehicleImei="";
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
        this.showLoader=false;
        this.opensidebar = document.getElementById('sidebarCollapseopen');
        this.closesidebar = document.getElementById('sidebarCollapseclose');
        // this.loadRwaReport();
        this.loadZoneList();
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
   loadZoneList() {
    try {
      let body_param = {
      };
      this._APIservices.api_zone_list(body_param)
        .subscribe(
        suc => {
          this.getZonesList = suc.body;
        },
        err => {

        });
    } catch (err) {
      console.log(err);
    }
  }

  loadWardList() {
    try {

        let body_param = {
            'zone_id': Number(this.zoneID)
        };
        this._APIservices.api_ward_list(body_param)
            .subscribe(
            suc => {
            this.getWardsList = suc.body;
            },
            err => {

            });
        } catch (err) {
        console.log(err);
        }
    }
    onSelectZone(selectzone) {
        this.zoneID=selectzone;
        this.wardID=undefined;
        this.getRwaList = [];
        $('#datatable').DataTable().destroy();
        this.loadWardList();
    }
    onSelectWard(selectward){
        this.wardID=selectward;
        this.getRwaList = [];
        $('#datatable').DataTable().destroy();
    }
  

    loadRwaReport(){
       
        let body_param = {
            "zone_number":this.zoneID,
            "ward_number":this.wardID
        };
        this.showLoader=true;
        this._APIservices.api_rwa_list(body_param).subscribe(suc => {
            for(let item of suc.body){
                item.created_at = this.displayCurrentTime(item.created_at);
                item.updated_at = this.displayCurrentTime(item.updated_at);
                this.getRwaList.push(item);
            }
            this.showLoader = false;
            $('#datatable').DataTable().destroy();
            this.initDatatable();
        }, err => {

        });
    }
    initDatatable(): void {
        setTimeout(function(){
            var table= $('#datatable').DataTable( {
                    dom: 'Bfrtip',
                    buttons: [
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5'
                    ],
                      destroy: true,
                } );
        },1000)
    }

    displayCurrentTime(time) {
        var date = new Date(time);
        var year = "" + date.getFullYear();
        var month = "" + (date.getMonth());
        var day = "" + date.getDate(); if (day.length == 1) { day = "0" + day; }
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm =  date.getHours() >= 12 ? "PM" : "AM";
        hours =  hours < 10 ? 0 + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        time = day + " " + monthNames[month] + " " + year  + " " + hours + ":" + minutes + ":" + seconds + " " + am_pm;
        return time;
    }
}
