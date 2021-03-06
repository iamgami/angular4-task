
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Api } from './../../../services/api.provider';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import {IMyDpOptions} from 'mydatepicker';
import * as moment from 'moment';
declare var $: any;
declare var jQuery: any;
declare var google: any;
@Component({
  selector: 'app-vehicle-movement-report',
  templateUrl: './vehicle-movement-report.component.html',
  styleUrls: ['./vehicle-movement-report.component.scss']
})
export class VehicleMovementReportComponent implements OnInit {
  opensidebar: any;
  closesidebar: any;
  selectedMonth :any;
  selectedYear: any;
  selectedZone:any;
  getZonesList: any;
  getWardsList: any;
  selectedWard: string;
  zoneID: number;
  wardID: number;
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
  myDatePickerOptions: IMyDpOptions;
  vehicleLists: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true
  };
  public Today_date: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
  constructor(private router: Router,public _APIservices:Api) {
      this.selectedMonth = 12;
      this.selectedYear = 2017;
      this.selectedZone = '';
      this.getWardsList=[];
      this.getVehiclesList=[];
      this.ShiftId=0;
      this.vehicleInfo=[];
      this.currentdate= moment(new Date()).format('YYYY-MM-DD');
      console.log(this.currentdate);
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
    this.currentdate= moment(new Date()).format('YYYY-MM-DD');
      console.log(this.currentdate);
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
    Pdf(): void {
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
            <body onload="window.pdfHtml5();window.close()">${printContents}</body>
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

    load_vehicles() {
      try {
        if(this.wardID != undefined)
        {
          console.log("if")
          let body_param = {
            'ward_id': Number(this.wardID),
            'shift_id': Number(this.ShiftId),
          };

          this._APIservices.api_vehicles_List(body_param)
          .subscribe(
          suc => {
            this.getVehiclesList = suc.body;
            this.vehicleLists = [];
            for (let item of this.getVehiclesList) {
              this.vehicleLists.push({ 'id': item.registration_number, 'name': item.registration_number });
            }
          },
          err => {

          });
        }
        else
        {
          console.log("else")
          let body_param = {
            'zone_id': Number(this.zoneID),
            'shift_id': Number(this.ShiftId),
          };
          this._APIservices.api_vehicles_List_zone_wise(body_param)
          .subscribe(
          suc => {
            this.getVehiclesList = suc.body;
            this.vehicleLists = [];
            for (let item of this.getVehiclesList) {
              this.vehicleLists.push({ 'id': item.registration_number, 'name': item.registration_number });
            }
          },
          err => {

          });
        }
        
        // this._APIservices.api_vehicles_List(body_param)
        //   .subscribe(
        //   suc => {
        //     this.getVehiclesList = suc.body;
        //     this.vehicleLists = [];
        //     for (let item of this.getVehiclesList) {
        //       this.vehicleLists.push({ 'id': item.registration_number, 'name': item.registration_number });
        //     }
        //   },
        //   err => {

        //   });

      } catch (err) {
        console.log(err);
      }
    }
    onSelectZone(selectzone) {
        this.zoneID=selectzone;
        this.wardID=undefined;
        this.getWardsList=[];
        this.selectedWard="";
        this.selectedVehicleInfo="";
        this.selectedVehicleImei="";
        this.vehicleMovementResult=[];
        $('#datatable').DataTable().destroy();
        this.loadWardList();
        this.load_vehicles();
    }
    onSelectWard(selectward){
      this.wardID=selectward;
      this.selectedVehicleInfo="";
      this.selectedVehicleImei="";
      this.vehicleMovementResult=[];
      $('#datatable').DataTable().destroy();
      this.load_vehicles();

    }
    onSelectShift(shiftId) {
      this.ShiftId = shiftId;
      console.log(this.ShiftId);
      this.selectedVehicleImei="";
      this.vehicleMovementResult=[];
      $('#datatable').DataTable().destroy();
      //this.load_vehicles();
    }
    onSelectvehicle(selectedVehicleInfo){
      console.log(selectedVehicleInfo);
      this.selectedVehicleInfo=selectedVehicleInfo;
      console.log( this.selectedVehicleInfo);

    }
    onDateChanged(event) {
      this.currentdate = moment(event.jsdate).format('YYYY-MM-DD');
      this.vehicleMovementResult=[];
      $('#datatable').DataTable().destroy();
    }

    selectVehicles(vehicle) {
      console.log(this.optionsModel);
    }


    vehicleMovement(){

      if(this.zoneID==undefined){
        alert("Please select Zone");
        this.showLoader=false;
        return false;
      }
      // if(this.wardID==undefined){
      //   alert("Please select ward");
      //   return false;
      // }
      // if(this.selectedVehicleInfo==""){
      //   alert("Please select vehicle");
      //   return false;
      // }
      this.showLoader=true;
      this.vehicleMovementResult=[];
      $('#datatable').DataTable().destroy();
      for(let items of this.getVehiclesList){
        this._APIservices.api_gps_movement_report(items.imei,this.currentdate).subscribe(suc => {
            let getDetail=[];

            getDetail.push(suc.body);
            for(let item of getDetail){
              item.endTime = this.displayCurrentTime(item.endTime);
              item.startTime = this.displayCurrentTime(item.startTime);
              item.zoneno=this.zoneID;
              item.wardno=this.wardID;
              item.shift=this.ShiftId;
              item.vehicleregsiterno = items.registration_number;
              item.imei=items.imei;
              this.vehicleMovementResult.push(item);
              $('#datatable').DataTable().destroy();
            }
            this.initDatatable();
            this.showLoader=false;
        }, err => {

        });
      }
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
