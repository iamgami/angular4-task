import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Api } from './../../../services/api.provider';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
declare var $: any;
declare var jQuery: any;
declare var google: any;
declare var MapLabel: any;
declare var gpolygons: any;
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { map } from 'rxjs/operator/map';
import { concat } from 'rxjs/observable/concat';
import { forEach } from '@angular/router/src/utils/collection';
import { stat } from 'fs';
import {
    Http,
    Headers,
    Response,RequestOptions
} from "@angular/http";
import {
    Observable
} from "rxjs/Observable";
import "rxjs/Rx";
import {
    Injectable
} from "@angular/core";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  opensidebar: any;
  closesidebar: any;
  value: Date;
  getZonesList: any;
  getWardsList: any;
  getVehiclesList: any;
  zonelist: string;
  Wardslist: string;
  currentdate: any;
  public Today_date: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
  Shift: any;
  zoneID: any;
  wardsID: any;
  ShiftID: number;
  commercialTotal: number;
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  map: any;
  routes: any;
  notblank: any;
  trackData: any;
  lineCoordinates: any;
  interVal: any = "";
  speedArray: any;
  hideMarker: any;
  markers: any;
  lastPosn: any;
  marker: any;
  count: any;
  play: any = true;
  pause: any = false;
  newMarkerArray: any;
  speed: any = 0;
  routeColors: any;
  zoneColors: any;
  wardColors: any;
  overlayArray: any;
  polyLineArray: any;
  bounds: any;
  ////Listing Variables/////
  selectAllCheckBox: any;
  getTwinBinList: any;
  getCtPtList: any;
  getGVPList: any;
  getOWCList: any;
  getRWAList: any;
  getStreetplay: any;
  getPPToilets: any;
  getCommercialList: any;
  myLocation: any[];
  resultTwinbin: any;
  resultGvp: any;
  resultPetrol: any;
  resultOwc: any;
  resultStreetplay: any;
  resultRwa: any;
  resultCtpt: any;
  myBin: any;
  getCityparkList:any;
  cityParkTotal: string;

  markerTwinbin: any;
  markerPetrolPum: any;
  markerGVP: any;
  markerRWA: any;
  markertStreetPlay: any;
  markerOWC: any;
  markerCTPT: any;
  markerCityPark: any;
  markerCommercial: any;

  checkboxGvp: any;
  checkboxRwa: any;
  checkboxStreetplay: any;
  checkboxCtpt: any;
  checkboxPetrol: any;
  checkboxOwc: any;
  checkboxTwinbin: any;
  checkboxbulk: any;
  checkboxCommercial:any;
  checkboxCitypark: any;
  checkboxODspot:any;
  checkboxSchoolHos:any;
  checkboxHoarding:any;
  checkboxWallpainting:any;
  showLoader :any;
  // myLat:any;
  // myLong:any;
  // twinBinLatLong: number;
  //////////
  vehicleIndex: number = 0;
  vehicleDataArray: any = [];

  optionsModel: number[];
  vehicleLists: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true
  };
  selectedWard :any;
  selectedWardNo :any;
  selectedZone : any;
  selectedZoneNo :any;
  zonesArray:any;
  wardsArray:any;
  parentPage :any;
  childPage :any;
  constructor(private router: Router, public _APIservices: Api,private http: Http ) {
    this.wardsID="";
    this.zonelist = "";
    this.Wardslist = "";
    this.Shift = '0';
    this.currentdate = new Date();

    this.routeColors = ['#c5e7cf', '#fbe7cb', '#dffbcb', '#172d51', '#a32249', '#945aca', '#f69d3a', '#F6D155', '#EDCDC2', '#5A7247', '#CFB095', '#D8AE47', '#F7CAC9', '#9896A4', '#C3447A'];
    this.zoneColors = ['#000066', '#006600', '#006666', '#008080', '#00cccc', '#00ccff', '#3366cc', '#660066', '#663333', '#666600', '#669966', '#66cc66', '#990000', '#990000', '#996633', '#cc6666', '#cc9999', '#cccc00', '#ff9900'];
    this.wardColors = ['#92B558', '#DC4C46', '#672E3B', '#F3D6E4', '#C48F65', '#223A5E', '#9C9A40', '#4F84C4', '#D2691E', '#578CA9'];
    // this.loadTwinBin();
    // this.loadCTPT();
    this.checkboxGvp = true;
    this.checkboxRwa = true;
    this.checkboxStreetplay= true;
    this.checkboxCtpt = true;
    this.checkboxPetrol = true;
    this.checkboxOwc = true;
    this.checkboxTwinbin = true;
    this.checkboxbulk = true;
    this.checkboxCitypark = true;
    this.checkboxODspot = true;
    this.checkboxSchoolHos = true;
    this.checkboxHoarding = true;
    this.checkboxWallpainting = true;
    this.checkboxCommercial = true;
    this.showLoader = true;
    this.selectedWard = '';
    this.selectedWardNo = '';
    this.selectedZone = '';
    this.selectedZoneNo = '';
    this.zonesArray = [];
    this.wardsArray = [];
    if(router.url == '/maps' )
    {
      this.parentPage = 'GIS Layers';
      this.childPage =  'Play Back';
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
    this.opensidebar = document.getElementById('sidebarCollapseopen');
    this.closesidebar = document.getElementById('sidebarCollapseclose');

    this.cityParkTotal="";
    this.speed = "";
    this.interVal = "";
    this.lastPosn = [];
    this.map;
    this.myBin = [];
    this.lineCoordinates = [];
    this.markers = [];
    this.count = [];
    this.newMarkerArray = [];

    this.markerTwinbin = [];
    this.markerTwinbin = [];
    this.markerPetrolPum = [];
    this.markerGVP = [];
    this.markerRWA = [];
    this.markertStreetPlay = [];
    this.markerOWC = [];
    this.markerCTPT = [];
    this.markerCityPark=[];
    this.markerCommercial=[];

    this.speedArray = [
      1000,
      900,
      800,
      700,
      600,
      500,
      400,
      300,
      200,
      100
    ];

    this.overlayArray = [];
    this.polyLineArray = [];

    this.selectAllCheckBox = {
      selectAll: true,
      checkboxGvp: true,
      checkboxRwa: true,
      checkboxStreetplay: true,
      checkboxCtpt: true,
      checkboxPetrol: true,
      checkboxOwc: true,
      checkboxTwinbin: true,
      checkboxbulk: true,
      checkboxCommercial:true,
      checkboxCitypark: true,
      checkboxODspot:true,
      checkboxSchoolHos:true,
      checkboxHoarding:true,
      checkboxWallpainting:true
    }

    //map options
    var mapProp = {
      center: new google.maps.LatLng(22.752559, 75.865535),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // map initialise
    this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    this.bounds = new google.maps.LatLngBounds();

    /// default API Load ///
    this.loadZoneList();
    this.loadPetrolPumpToilets();
    this.loadTwinBin();
    this.loadCTPT();
    this.loadOWC();
    this.loadstreetPlay();
    this.loadRWA();
    this.loadGVP();
    this.createZoneListOnMap();
    this.loadWardList();
    this.loadCityPark();
    this.loadCommercialArea();
  }

  convertAmPm(timeString){
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    return timeString = h + timeString.substr(2, 3) + ampm;
  }
  /// custome function for making markers on map ///
  makeMarker(Lat, Long, iconImg, data, arrayName) {

    var contentString = '<div class="contentinfo">' +
      '<div id="siteNotice">' +
      '</div>';
      contentString +=  data.name != undefined ? '<h5 class="textCapital">' + data.name + '</h5>' : '';
      contentString += '<div id="bodyContent">';
      contentString += data.image != undefined ? '<p>' + data.image + '</p>' : '';
      contentString += data.address != undefined ? '<p>' + data.address + '</p>' : '';
      contentString += '<p>';
      contentString += Lat != undefined ? ' <b>Latitude:' + Lat + '</b>' : '';
      contentString += Lat != undefined ? ' <b>Longitude:' + Long + '</b>' : '';
      contentString += '</p>';
      if(arrayName=='2')
      {
        var monday_hours_from = data.monday_hours.split('-')[0];
        var monday_hours_to = data.monday_hours.split('-')[1];

        contentString += '<table border="1">'
                      +'<tr >'
                      +'<th><b>Opening Hours</b></th>'
                      +'<th></th> '
                      +'</tr>'
                      +'<tr>'
                      +'<td>Monday</td>'
                      +'<td>'+this.convertAmPm(monday_hours_from)+' - '+ this.convertAmPm(monday_hours_to)+ '</td>'
                      +'</tr>'
                      +'</tr>'
                      +'<tr>'
                      +'<td>Tuesday</td>'
                      +'<td>'+this.convertAmPm(data.tuesday_hours.split('-')[0])+' - '+ this.convertAmPm(data.tuesday_hours.split('-')[1])+ '</td>'
                      +'</tr>'
                      +'</tr>'
                      +'<tr>'
                      +'<td>Wednesday</td>'
                      +'<td>'+this.convertAmPm(data.wednesday_hours.split('-')[0])+' - '+ this.convertAmPm(data.wednesday_hours.split('-')[1])+ '</td>'
                      +'</tr>'
                      +'</tr>'
                      +'<tr>'
                      +'<td>Tuesday</td>'
                      +'<td>'+this.convertAmPm(data.tuesday_hours.split('-')[0])+' - '+ this.convertAmPm(data.tuesday_hours.split('-')[1])+ '</td>'
                      +'</tr>'
                      +'</tr>'
                      +'<tr>'
                      +'<td>Friday</td>'
                      +'<td>'+this.convertAmPm(data.friday_hours.split('-')[0])+' - '+ this.convertAmPm(data.friday_hours.split('-')[1])+ '</td>'
                      +'</tr>'
                      +'</tr>'
                      +'<tr>'
                      +'<td>Saturday</td>'
                      +'<td>'+this.convertAmPm(data.saturday_hours.split('-')[0])+' - '+ this.convertAmPm(data.saturday_hours.split('-')[1])+ '</td>'
                      +'</tr>'
                      +'</tr>'
                      +'<tr>'
                      +'<td>Sunday</td>'
                      +'<td>'+this.convertAmPm(data.sunday_hours.split('-')[0])+' - '+ this.convertAmPm(data.sunday_hours.split('-')[1])+ '</td>'
                      +'</tr>'
                      +'</table>'
        
        
      }
      contentString += '</div>';
      contentString += '</div>';
    var ward_id = '';
    if(data.ward_id != undefined)
    {
      ward_id = data.ward_id;
    }
    else if(data.ward_number != undefined)
    {
      ward_id = data.ward_number;
    }
    var zone_id = '';
    if(data.zone_id != undefined)
    {
      zone_id = data.zone_id;
    }
    else if(data.zone_number != undefined)
    {
      zone_id = data.zone_number;
    }
    
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(Lat, Long),
      map: this.map,
      icon: iconImg,
      ward_id : ward_id,
      zone_id : zone_id
    });

    if(arrayName=='1'){
      this.markerTwinbin.push(marker);
    }else if(arrayName=='2'){
      this.markerPetrolPum.push(marker);
    }else if(arrayName=='3'){
      this.markerGVP.push(marker);
    }else if(arrayName=='4'){
      this.markerRWA.push(marker);
    }else if(arrayName=='5'){
      this.markertStreetPlay.push(marker);
    }else if(arrayName=='6'){
      this.markerOWC.push(marker);
    }else if(arrayName=='7'){
      this.markerCTPT.push(marker);
    }else if(arrayName=='8'){
      this.markerCityPark.push(marker);
    }else if(arrayName=='9'){
      this.markerCommercial.push(marker);
    }
    
    //info-window for all the markers
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('mouseover', function () {
      infowindow.open(this.map, marker);
    });

    marker.addListener('mouseout', function () {
      infowindow.close(this.map, marker);
    });
  }

  selectAllEffect(status: any){
    if(status==false){
      this.selectAllCheckBox = {
        selectAll: false,
        checkboxGvp: false,
        checkboxRwa: false,
        checkboxStreetplay: false,
        checkboxCtpt: false,
        checkboxPetrol: false,
        checkboxOwc: false,
        checkboxTwinbin: false,
        checkboxbulk: false,
        checkboxCitypark: false,
        checkboxODspot:false,
        checkboxSchoolHos:false,
        checkboxHoarding:false,
        checkboxWallpainting:false,
        checkboxCommercial:false
      }
      
      this.checkboxGvp = false;
      this.checkboxRwa = false;
      this.checkboxStreetplay= false;
      this.checkboxCtpt = false;
      this.checkboxPetrol = false;
      this.checkboxOwc = false;
      this.checkboxTwinbin = false;
      this.checkboxbulk = false;
      this.checkboxCitypark = false;
      this.checkboxODspot = false;
      this.checkboxSchoolHos = false;
      this.checkboxHoarding = false;
      this.checkboxWallpainting = false;
      this.checkboxCommercial = false;
      this.switchEffect(false);
    }else{
      this.selectAllCheckBox = {
        selectAll: true,
        checkboxGvp: true,
        checkboxRwa: true,
        checkboxStreetplay: true,
        checkboxCtpt: true,
        checkboxPetrol: true,
        checkboxOwc: true,
        checkboxTwinbin: true,
        checkboxbulk: true,
        checkboxCitypark: true,
        checkboxODspot:true,
        checkboxSchoolHos:true,
        checkboxHoarding:true,
        checkboxWallpainting:true,
        checkboxCommercial:true
      }
      this.checkboxGvp = true;
      this.checkboxRwa = true;
      this.checkboxStreetplay= true;
      this.checkboxCtpt = true;
      this.checkboxPetrol = true;
      this.checkboxOwc = true;
      this.checkboxTwinbin = true;
      this.checkboxbulk = true;
      this.checkboxCitypark = true;
      this.checkboxODspot = true;
      this.checkboxSchoolHos = true;
      this.checkboxHoarding = true;
      this.checkboxWallpainting = true;
      this.checkboxCommercial = true;
      this.switchEffect(true);
    }
  }
 

  // checking status of Check-Boxes function
  switchEffect(status: boolean) {
    //ward_id  ward_id,
    //if(this.marker.ward_id    
    var selectedWard = this.wardsID;
    if(selectedWard == '')
    {
      selectedWard = undefined;
    }
    var selectedZone = this.zoneID;
    if (!this.selectAllCheckBox.checkboxGvp) {
      for(var i=0; i<this.markerGVP.length; i++){
        this.markerGVP[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false;
    } 
    else
    {
      for(var i=0; i<this.markerGVP.length; i++){
        this.markerGVP[i].setMap(null);
      }
      //this.loadGVP();

      for(var i=0; i<this.markerGVP.length; i++){
        this.markerGVP[i].setMap(null);
        if(selectedZone == undefined)
        {
          this.markerGVP[i].setMap(this.map);
        }
        if(  selectedZone == this.markerGVP[i].zone_id && selectedWard == undefined)
        {
          this.markerGVP[i].setMap(this.map);
         
        } 
        else if( (selectedWard != undefined  && selectedWard == this.markerGVP[i].ward_id) )
        {
          this.markerGVP[i].setMap(this.map);
        } 
        else
        {
         // this.markerGVP[i].setMap(this.map);
         // var setMapVal = this.map;
        }
      }
    }

    if (!this.selectAllCheckBox.checkboxRwa) {
      for(var i=0; i<this.markerRWA.length; i++){
        this.markerRWA[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false;
    } else {
      for(var i=0; i<this.markerRWA.length; i++){
        this.markerRWA[i].setMap(null);
      }
      for(var i=0; i<this.markerRWA.length; i++){
        this.markerRWA[i].setMap(null);
        if(selectedZone == undefined)
        {
          this.markerRWA[i].setMap(this.map);
        }
        if(  selectedZone == this.markerRWA[i].zone_id && selectedWard == undefined)
        {
          this.markerRWA[i].setMap(this.map);
         
        } 
        else if( (selectedWard != undefined  && selectedWard == this.markerRWA[i].ward_id) )
        {
          this.markerRWA[i].setMap(this.map);
        } 
        else
        {
         // this.markerGVP[i].setMap(this.map);
         // var setMapVal = this.map;
        }
      }
      //this.loadRWA();
    }

    if (!this.selectAllCheckBox.checkboxCtpt) {
      for(var i=0; i<this.markerCTPT.length; i++){
        this.markerCTPT[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false;
    } else {
      for(var i=0; i<this.markerCTPT.length; i++){
        this.markerCTPT[i].setMap(null);
      }
      for(var i=0; i<this.markerCTPT.length; i++){
        this.markerCTPT[i].setMap(null);
        if(selectedZone == undefined)
        {
          this.markerCTPT[i].setMap(this.map);
        }
        if(  selectedZone == this.markerCTPT[i].zone_id && selectedWard == undefined)
        {
          this.markerCTPT[i].setMap(this.map);
         
        } 
        else if( (selectedWard != undefined  && selectedWard == this.markerCTPT[i].ward_id) )
        {
          this.markerCTPT[i].setMap(this.map);
        } 
        else
        {
         // this.markerCTPT[i].setMap(this.map);
         // var setMapVal = this.map;
        }
      }
      //this.loadCTPT();
    }

    if (!this.selectAllCheckBox.checkboxPetrol) {
      for(var i=0; i<this.markerPetrolPum.length; i++){
        this.markerPetrolPum[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false;
    } else {
      for(var i=0; i<this.markerPetrolPum.length; i++){
        this.markerPetrolPum[i].setMap(null);
      }
      //this.loadPetrolPumpToilets();

      for(var i=0; i<this.markerPetrolPum.length; i++){
        this.markerPetrolPum[i].setMap(null);
        if(selectedZone == undefined)
        {
          this.markerPetrolPum[i].setMap(this.map);
        }
        if(  selectedZone == this.markerPetrolPum[i].zone_id && selectedWard == undefined)
        {
          this.markerPetrolPum[i].setMap(this.map);
         
        } 
        else if( (selectedWard != undefined  && selectedWard == this.markerPetrolPum[i].ward_id) )
        {
          this.markerPetrolPum[i].setMap(this.map);
        } 
        else
        {
         // this.markerPetrolPum[i].setMap(this.map);
         // var setMapVal = this.map;
        }
      }
    }

    

    if (!this.selectAllCheckBox.checkboxStreetplay) {
      for(var i=0; i<this.markertStreetPlay.length; i++){
        this.markertStreetPlay[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false;
    } else {
      for(var i=0; i<this.markertStreetPlay.length; i++){
        this.markertStreetPlay[i].setMap(null);
      }
     // this.loadstreetPlay();
      for(var i=0; i<this.markertStreetPlay.length; i++){
        
        this.markertStreetPlay[i].setMap(null);
        if(selectedZone == undefined)
        {
         this.markertStreetPlay[i].setMap(this.map);
        }
        if(  selectedZone == this.markertStreetPlay[i].zone_id && selectedWard == undefined)
        {
          this.markertStreetPlay[i].setMap(this.map);
        } 
        else if( (selectedWard != undefined  && selectedWard == this.markertStreetPlay[i].ward_id) )
        {
          this.markertStreetPlay[i].setMap(this.map);
        } 
        else
        {
         this.markertStreetPlay[i].setMap(this.map);
         var setMapVal = this.map;
        }
      }
    }

    if (!this.selectAllCheckBox.checkboxOwc) {
      for(var i=0; i<this.markerOWC.length; i++){
        this.markerOWC[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false;
    } else {
      for(var i=0; i<this.markerOWC.length; i++){
        this.markerOWC[i].setMap(null);
      }
      //this.loadOWC();
      for(var i=0; i<this.markerOWC.length; i++){
        this.markerOWC[i].setMap(null);
        if(selectedZone == undefined)
        {
          this.markerOWC[i].setMap(this.map);
        }
        if(  selectedZone == this.markerOWC[i].zone_id && selectedWard == undefined)
        {
          this.markerOWC[i].setMap(this.map);
        } 
        else if( (selectedWard != undefined  && selectedWard == this.markerOWC[i].ward_id) )
        {
          this.markerOWC[i].setMap(this.map);
        } 
        else
        {
         // this.markerOWC[i].setMap(this.map);
         // var setMapVal = this.map;
        }
      }
    }

    if (!this.selectAllCheckBox.checkboxTwinbin) {
      for(var i=0; i<this.markerTwinbin.length; i++){
        this.markerTwinbin[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false;
    } else {
      for(var i=0; i<this.markerTwinbin.length; i++){
        this.markerTwinbin[i].setMap(null);
      }
      //this.loadTwinBin();
      for(var i=0; i<this.markerTwinbin.length; i++){
        this.markerTwinbin[i].setMap(null);
        if(selectedZone == undefined)
        {
          this.markerTwinbin[i].setMap(this.map);
        }
        if(  selectedZone == this.markerTwinbin[i].zone_id && selectedWard == undefined)
        {
          this.markerTwinbin[i].setMap(this.map);
         
        } 
        else if( (selectedWard != undefined  && selectedWard == this.markerTwinbin[i].ward_id) )
        {
          this.markerTwinbin[i].setMap(this.map);
        } 
        else
        {
         // this.markerGVP[i].setMap(this.map);
         // var setMapVal = this.map;
        }
      }
    }
    if (!this.selectAllCheckBox.checkboxCommercial) {
      for(var i=0; i<this.markerCommercial.length; i++){
        this.markerCommercial[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false; 
    } else {
      for(var i=0; i<this.markerCommercial.length; i++){
        this.markerCommercial[i].setMap(null);
      }
      //this.loadCommercialArea();
      for(var i=0; i<this.markerCommercial.length; i++){
        this.markerCommercial[i].setMap(null);
        if(selectedZone == undefined)
        {
          this.markerCommercial[i].setMap(this.map);
        }
        if(  selectedZone == this.markerCommercial[i].zone_id && selectedWard == undefined)
        {
          this.markerCommercial[i].setMap(this.map);
         
        } 
        else if( (selectedWard != undefined  && selectedWard == this.markerCommercial[i].ward_id) )
        {
          this.markerCommercial[i].setMap(this.map);
        } 
        else
        {
         // this.markerGVP[i].setMap(this.map);
         // var setMapVal = this.map;
        }
      }
    }
    if (!this.selectAllCheckBox.checkboxCitypark) {
      for(var i=0; i<this.markerCityPark.length; i++){
        this.markerCityPark[i].setMap(null);
      }
      this.selectAllCheckBox.selectAll = false;
    } else {
      for(var i=0; i<this.markerCityPark.length; i++){
        this.markerCityPark[i].setMap(null);
      }
     // this.loadCityPark();
     for(var i=0; i<this.markerCityPark.length; i++){
      this.markerCityPark[i].setMap(null);
      if(selectedZone == undefined)
      {
        this.markerCityPark[i].setMap(this.map);
      }
      if(  selectedZone == this.markerCityPark[i].zone_id && selectedWard == undefined)
      {
        this.markerCityPark[i].setMap(this.map);
       
      } 
      else if( (selectedWard != undefined  && selectedWard == this.markerCityPark[i].ward_id) )
      {
        this.markerCityPark[i].setMap(this.map);
      } 
      else
      {
       // this.markerGVP[i].setMap(this.map);
       // var setMapVal = this.map;
      }
    }
    }
  }


  /**
   * markerTwinbin
   * markerPetrolPum
   * markerGVP
   * markerRWA
   * markertStreetPlay
   * markerOWC
   * markerCTPT */

  ////////loads the TwinBin listing///////
  loadTwinBin() {
    let iconImg = './assets/modules/images/icons/Twin-bin.png';
    try {
      var infoWnd = new google.maps.InfoWindow();
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_twinbin_list(body_param).subscribe(
        suc => {
          let res = suc.body;
          this.resultTwinbin = res.length;
          localStorage.setItem('mytwinBin', res);
          if(this.checkboxTwinbin == false && this.selectAllCheckBox.checkboxTwinbin == false){
            return false
          }
          for (let item of res) {
            this.getTwinBinList = item;
            this.makeMarker(Number(item.lat), Number(item.long), iconImg, this.getTwinBinList, '1');
          }
        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  ////////loads the PetrolPumpToilets listing///////
  loadPetrolPumpToilets() {
    let iconImg = './assets/modules/images/icons/petrol-pt.png';
    try {

      let requestOptionArgs={}
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_ppToilets_list(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.resultPetrol = res.length;
          if(this.checkboxPetrol == false && this.selectAllCheckBox.checkboxPetrol == false){
            return false
          }
          for (let item of res) {
            this.getPPToilets = item;
            ///external marker function callback
            this.makeMarker(Number(this.getPPToilets.lat), Number(this.getPPToilets.long), iconImg, this.getPPToilets, '2');
          }
        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  ////////loads the GVP listing///////
  loadGVP() {
    let iconImg = './assets/modules/images/icons/gvp.png';
    try {
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_gvp_list(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.resultGvp = res.length;
          if(this.checkboxGvp == false && this.selectAllCheckBox.checkboxGvp == false ){
            return false
          }
          for (let item of res) {
            this.getGVPList = item;
            this.makeMarker(Number(this.getGVPList.lat), Number(this.getGVPList.long), iconImg, this.getGVPList, '3');
          }
        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  ////////loads the RWA listing///////
  loadRWA() {
    let iconImg = './assets/modules/images/icons/rwa.png';
    try {
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_rwa_list(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.resultRwa = res.length;
          if(this.checkboxRwa == false && this.selectAllCheckBox.checkboxRwa == false){
            return false
          }
          for (let item of res) {
            this.getRWAList = item;
            this.makeMarker(Number(this.getRWAList.lat), Number(this.getRWAList.long), iconImg, this.getRWAList, '4');
          }
        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  ////////loads the streetPlay listing///////
  loadstreetPlay() {
    let iconImg = './assets/modules/images/icons/street-play.png';
    try {
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_streetPlay_list(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.resultStreetplay = res.length;
          if(this.checkboxStreetplay == false  && this.selectAllCheckBox.checkboxStreetplay == false){
            return false
          }
          for (let item of res) {
            this.getStreetplay = item;
            ///external marker function callback
            this.makeMarker(Number(item.lat), Number(item.lon), iconImg, this.getStreetplay, '5');
          }
        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  ////////loads the OWC listing///////
  loadOWC() {
    let iconImg = './assets/modules/images/icons/owc.png';
    try {
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_owc_list(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.resultOwc = res.length;
          if(this.checkboxOwc == false && this.selectAllCheckBox.checkboxOwc == false){
            return false
          }
          for (let item of res) {
            // console.log(item);
            this.getOWCList = item;
            ///external marker function callback
            this.makeMarker(Number(item.lat), Number(item.long), iconImg, this.getOWCList, '6');
          }
        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  ////////loads the CTPT listing///////
  loadCTPT() {
    let iconImg = './assets/modules/images/icons/ct_pt.png';
    try {
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_ctpt_list(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.resultCtpt = res.length;
          if(this.checkboxCtpt == false && this.selectAllCheckBox.checkboxCtpt == false){
            return false
          }
          for (let item of res) {
            this.getCtPtList = item;
            ///external marker function callback
            this.makeMarker(Number(item.lat), Number(item.long), iconImg, this.getCtPtList, '7');
          }
        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  ///loads the zones available
  loadZoneList() {
    try {
      let body_param = {};
      this._APIservices.api_zone_list(body_param).subscribe(
        suc => {
          this.getZonesList = suc.body;
          this.createZoneListOnMap();
        },
        err => {

        });
    } catch (err) {
      console.log(err);
    }
  }

   ////////loads the City Park listing///////
  loadCityPark() {
    let iconImg = './assets/modules/images/icons/citypark.png';
    try {
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_getCityParksList(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.cityParkTotal = res.length;
          if(this.checkboxCitypark == false && this.selectAllCheckBox.checkboxCitypark == false){
            return false
          }
          
         // this.markerCommercial = [];
          for (let item of res) {
            this.getCityparkList = item;
            this.makeMarker(Number(item.lat), Number(item.long), iconImg, item, '8');
          }

        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  /////////loads the Commercial Area listing///////
  loadCommercialArea(){
    let iconImg = './assets/modules/images/icons/commercial.png';
    var map = this.map;
    var currentMarker;
    var geocoder = new google.maps.Geocoder();
    try {
      let body_param = {
        "zone_number":this.zoneID,
        "ward_number":this.wardsID
      };
      this._APIservices.api_getCommercialAreasList(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.getCommercialList = res;
          this.commercialTotal = res.length;
          if(this.checkboxCommercial == false && this.selectAllCheckBox.checkboxCommercial == false){
            return false
          }
           for (let item of this.getCommercialList) {
            /// Getting the Zone Name ///
            //this.zoneName.push(item.name);

              let geocords = JSON.parse(item.coordinates);
              var triangleCoords = [];
              var lastLat;
              var lastLng;
              for (let data of geocords) {
                triangleCoords.push({
                  lat: data.lat, lng: data.long
                });
              }
              
            
            var colorcode = this.zoneColors[Math.floor(Math.random() * this.zoneColors.length)];
            ////  checking for the color of zone as string ////
            // this.zoneColor.push(colorcode);

            var myLatlng = triangleCoords[triangleCoords.length / 2]; //new google.maps.LatLng(50.71392, -1.983551);
            // Construct the polygon.
            let bermudaTriangle = new google.maps.Polygon({
              paths: triangleCoords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#000000",
              fillOpacity: 0.35,
              zIndex: 9000
            });
            bermudaTriangle.setMap(this.map);
            setTimeout(() => {
              this.map.setZoom(14);
            }, 100);
            var this1 = this;
            bermudaTriangle.addListener('click', function (event) {
              var vertices = this.getPath();
              this1.zoomMap(vertices, event);
            });
            this.overlayArray.push(bermudaTriangle);
            var path = bermudaTriangle.getPath();

            var bounds = new google.maps.LatLngBounds();

            for (var i = 0; i < path.length; i++) {
              bounds.extend(path.getAt(i));
            }

            var centre = bounds.getCenter();
            
            var currentMarker = new google.maps.Marker({
              position: centre,
              map: map,
              icon: "assets/modules/images/commercial.png",
              zone_id : item.zone_number,
              ward_id : item.ward_number
            });
            this.markerCommercial.push(currentMarker);
            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(currentMarker, "mouseover", function (e) {
              infoWindow.setContent(item.name);
              infoWindow.open(map, this);
            });
            google.maps.event.addListener(currentMarker, 'mouseout', function () {
              infoWindow.close();
            });

           }

          this.map.fitBounds(this.bounds);
          setTimeout( () => {
            this.showLoader = false;
          },3000);
         
        },
        err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }

  }

  ////create Bounds function////
  createZoneListOnMap() {
    try {
      let body_param = {
        'geofence_require': true
      };
      this._APIservices.api_zone_list_with_geo(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
         
          let countindex: number =0;
          for (let item of res) {
            /// Getting the Zone Name ///
            let geocoords = [];
            item.geojson_file.features.forEach((feature) => {
              var triangleCoords = feature.geometry.coordinates[0].map((point) => {
                this.bounds.extend(new google.maps.LatLng(point[1], point[0]));
                return {
                  lat: point[1], lng: point[0]
                }
              });
              geocoords.push(triangleCoords);
            });

           
            var colorcode = this.zoneColors[countindex];//Math.floor(Math.random() * this.zoneColors.length)];
            countindex++;
            // var myLatlng = triangleCoords[triangleCoords.length / 2]; //new google.maps.LatLng(50.71392, -1.983551);
            // Construct the polygon.
            let bermudaTriangle = new google.maps.Polygon({
              paths: geocoords,
              strokeColor: colorcode,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: colorcode,
              fillOpacity: 0.35
            });

            bermudaTriangle.setMap(this.map);
            var center = bermudaTriangle.my_getBounds().getCenter();
            // var infowindow = new google.maps.InfoWindow({
            //   content: item.name
            // });

            var marker = new google.maps.Marker({
              position: center,
              map: this.map,
              title: item.name
            });
            this.wardsArray.push(marker);
            this.openZoneInfoWindow(marker,item);
            var this1 = this;
            bermudaTriangle.addListener('click', function (event) {
              var vertices = this.getPath();
              this.zoomMap(vertices, event)
            });

            this.overlayArray.push(bermudaTriangle);

          }
           this.map.fitBounds(this.bounds);
        },
        err => {

        });


    } catch (err) {
      console.log(err);
    }
  }

  openZoneInfoWindow(marker,item){
    var infowindow = new google.maps.InfoWindow({
        content: item.name
      });
      marker.addListener('mouseover', () => {
        infowindow.open(this.map, marker);
      });
      google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      });
  }

  zoomMap(vertices, event) {
    this.bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < vertices.getLength(); i++) {
      var xy = vertices.getAt(i);
      this.bounds.extend(new google.maps.LatLng(xy.lat(), xy.lng()));
      if (i == vertices.getLength() - 1) {
        this.map.fitBounds(this.bounds);
      }
    }
    this.map.setCenter(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));    
  }

  onSelectZone(selectzone) {
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(22.7196, 75.8577),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.map = map;
    this.zoneID = selectzone;
    if(selectzone == '' || selectzone == undefined){
      this.ngOnInit();
    }
    this.Wardslist="";
    this.wardsID="";
    this.wardsArray = [];
    this.loadWardList();
    this.changeValuesLoadMap();
    for (let item of this.getZonesList) {
      if (item.id == selectzone) {
        this.selectedZone = item.name;
        this.selectedZoneNo = item.zone_number;
        break;
      }
    }
    if (selectzone == "") {
      this.selectedZone = '';
    }
  }

  onSelectWard(selectward){
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(22.7196, 75.8577),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.map = map;
    this.Wardslist=selectward;
    this.wardsID=selectward;
    this.createWardListPolygon();
    this.changeValuesLoadMap();
    for (let item of this.getWardsList) {
      if (item.id == selectward) {
        this.selectedWard = item.name;
        this.selectedWardNo = item.ward_number;
        break;
      }
    }
    if (selectward == "") {
      this.selectedWard = '';
      return false;
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
          this.createWardListPolygon();
        },
        err => {

        });
    } catch (err) {
      console.log(err);
    }
  }
  
  createWardListPolygon() {
    this.clearOverlays();
    this.bounds = new google.maps.LatLngBounds();
    let countindex: number =0;
    this.wardsArray = [];
    //this.wardDataArray=[];
    if(this.Wardslist == ""){
       
        for (let item of this.getWardsList) {
          this._APIservices.api_ward_routes_list(item.id).subscribe(
            suc => {
              let res = suc.body;
              let geocords = res.coordinates;
              var triangleCoords = [];

              for (let data of geocords) {
                triangleCoords.push({
                  lat: data[1], lng: data[0]
                });
                this.bounds.extend(new google.maps.LatLng(data[1], data[0]));
              }
             // var colorcode = this.wardColors[Math.floor(Math.random() * this.wardColors.length)];
              var colorcode = this.zoneColors[countindex];
                 countindex++;
              // Construct the polygon.
              let bermudaTriangle = new google.maps.Polygon({
                paths: triangleCoords,
                strokeColor: colorcode,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: colorcode,
                fillOpacity: 0.20
              });
              bermudaTriangle.setMap(this.map);
              var center = bermudaTriangle.my_getBounds().getCenter();
              var marker = new google.maps.Marker({
                position: center,
                map: this.map,
                title: item.name
              });
              this.openWardInfoWindow(marker,item.name);
              this.wardsArray.push(marker);
              var this1 = this;
              bermudaTriangle.addListener('click', function (event) {
                var vertices = this.getPath();
                this1.zoomMap(vertices, event)
              });

              this.overlayArray.push(bermudaTriangle);
              this.map.fitBounds(this.bounds);
            },
            err => {

            });
        }
    }else{
        this._APIservices.api_ward_routes_list(this.wardsID).subscribe(
            suc => {
              let res = suc.body;
              let geocords = res.coordinates;

              var triangleCoords = [];

              for (let data of geocords) {
                triangleCoords.push({
                  lat: data[1], lng: data[0]
                });
                this.bounds.extend(new google.maps.LatLng(data[1], data[0]));
              }
             // var colorcode = this.wardColors[Math.floor(Math.random() * this.wardColors.length)];
              var colorcode = this.zoneColors[countindex];
                 countindex++;
              // Construct the polygon.
              let bermudaTriangle = new google.maps.Polygon({
                paths: triangleCoords,
                strokeColor: colorcode,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: colorcode,
                fillOpacity: 0.20
              });
              bermudaTriangle.setMap(this.map);
              var center = bermudaTriangle.my_getBounds().getCenter();
              var marker = new google.maps.Marker({
                position: center,
                map: this.map,
                title: this.selectedWard
              });
              this.openWardInfoWindow(marker,this.selectedWard);
              this.wardsArray.push(marker);
              var this1 = this;
              bermudaTriangle.addListener('click', function (event) {
                var vertices = this.getPath();
                this1.zoomMap(vertices, event)
              });

              this.overlayArray.push(bermudaTriangle);
              this.map.fitBounds(this.bounds);
            },
            err => {

            });

    }

  }
  openWardInfoWindow(marker,item){
    var infowindow = new google.maps.InfoWindow({
      content: item
    });
    marker.addListener('mouseover', () => {
      infowindow.open(this.map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function () {
      infowindow.close();
    });
}

  clearOverlays() {
    for (let item of this.overlayArray) {
      item.setMap(null);
    }
  }

  clearPolyLine() {
    for (let item of this.polyLineArray) {
      item.setMap(null);
    }
  }


  onSelectShift(shiftId) {
    this.Shift = shiftId;
    // this.load_vehicles();
  }

  /// function depends on shift selection ///
  load_vehicles() {
    try {
      let body_param = {
        'ward_id': Number(this.wardsID),
        'shift_id': Number(this.Shift),
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

      this._APIservices.api_vehicles_route_list(body_param).subscribe(
        suc => {
          this.routes = suc.body;
          // this.loadWardsRoads();
        },
        err => {

        });

    } catch (err) {
      console.log(err);
    }
  }

  // loadWardsRoads(){
  //   this.clearPolyLine();
  //   this.bounds = new google.maps.LatLngBounds();
  //   for(let item of this.routes){
  //     var flightPlanCoordinates = [];
  //     for(let data of item.coordinates){
  //       flightPlanCoordinates.push({lat: data[1], lng: data[0]});
  //       this.bounds.extend(new google.maps.LatLng(data[1], data[0]));
  //     }

  //     var colorcode = this.routeColors[Math.floor(Math.random() * this.routeColors.length)];

  //     var flightPath = new google.maps.Polyline({
  //       path: flightPlanCoordinates,
  //       geodesic: true,
  //       strokeColor: colorcode,
  //       strokeOpacity: 1,
  //       strokeWeight: 4,
  //       width: 15,
  //       zIndex: 30
  //     });

  //     flightPath.setMap(this.map);

  //     var this1 = this;
  //     flightPath.addListener('click', function(event){
  //       var vertices = this.getPath();
  //       this1.zoomMap(vertices, event)
  //     });

  //     this.polyLineArray.push(flightPath);
  //     this.map.fitBounds(this.bounds);
  //   }
  // }

  loadLineDatainMap(trackData, rowCount) {
    this.notblank = true;

    this.lineCoordinates[rowCount] = [];
    for (let i of trackData) {
      let d_lat = Number(i.lat);
      let d_lng = Number(i.lon);
      this.lineCoordinates[rowCount].push(new google.maps.LatLng(d_lat, d_lng));
    }

    var line = new google.maps.Polyline({
      path: this.lineCoordinates[rowCount],
      icons: [{
        icon: {
          strokeColor: '#0000ff',
          strokeWeight: 5,
          fillColor: '#0000ff',
          fillOpacity: 1
        },
        offset: '100%',
        repeat: '250px'
      }],
      map: this.map,
      strokeColor: "#ff0000",
      strokeOpacity: 1,
      strokeWeight: 2,
      zIndex: 50
    });

    // this.lastPosn[rowCount] = this.lineCoordinates[rowCount][0];

    // this.speed = (<HTMLInputElement>document.getElementById('dd_range')).value;
  }

  // loadInterval(row){
  //   this.interVal = setInterval(() => {
  //     this.changeMarkerPosition(row);
  //   }, this.speedArray[this.speed]);
  // }

  changeMarkerPosition(row) {
    this.markers[row] = this.newMarkerArray[row];

    if (!(this.count[row])) {
      this.count[row] = 0;
    }

    if (!(this.lineCoordinates[row])) {
      this.lineCoordinates[row] = [];
    }

    var point = this.lineCoordinates[row][this.count[row]];
    var heading = google.maps.geometry.spherical.computeHeading(this.lastPosn[row], point);
    this.lastPosn[row] = point;
    this.marker = new google.maps.Marker({
      map: this.map,
      position: point,
      icon: {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 3,
        rotation: heading
      }
    });
    this.addMarker(this.marker, row);
    this.map.setCenter(point);
    //this.count[row]++;
    if (this.count[row] == this.lineCoordinates[row].length - 1) {
      this.count[row] = 0;
      this.clearMarkers(this.markers[row], row);
      this.play = true;
      this.pause = false;
    } else {
      this.count++;
    }
  }

  addMarker(marker, row) {
    this.clearMarkers(this.markers[row], row);
    if (!(this.newMarkerArray[row])) {
      this.newMarkerArray[row] = [];
    }
    this.newMarkerArray[row].push(marker);
    return marker;
  }

  clearMarkers(data, row) {
    if (data != undefined) {
      for (var i = 0; i < data.length; i++) {
        this.markers[row][i].setMap(null);
      }
    }
  }

  routeWithPage(rowCount, url) {
    this._APIservices.api_ward_route_list_page(url, {}).subscribe(suc => {
      if (suc.body.next != null) {
        for (let item of suc.body.results) {
          this.vehicleDataArray[rowCount].push(item);
        }
        this.routeWithPage(rowCount, suc.body.next);
      } else {
        //console.log(this.vehicleDataArray[rowCount]);
      }
    }, err => {

    });
  }

  // changeRange(value: number){
  //   this.speed = value;
  //   if(this.interVal!=""){
  //     clearInterval(this.interVal);
  //     this.moveMarker();
  //   }
  // }

  ////Print function to print the page data
  prints() {
    window.print();
  }


  changeValuesLoadMap(){
    this.clearOverlays();
    if(!this.selectAllCheckBox.checkboxGvp){
        for(var i=0; i<this.markerGVP.length; i++){
          this.markerGVP[i].setMap(null);
        }
        this.loadGVP();
    }else{
      for(var i=0; i<this.markerGVP.length; i++){
        this.markerGVP[i].setMap(null);
      }
      this.loadGVP();
    }
    if(!this.selectAllCheckBox.checkboxRwa){
        for(var i=0; i<this.markerRWA.length; i++){
          this.markerRWA[i].setMap(null);
        }
        this.loadRWA();
    }else{
      for(var i=0; i<this.markerRWA.length; i++){
          this.markerRWA[i].setMap(null);
      }
      this.loadRWA();
    }
    if(!this.selectAllCheckBox.checkboxStreetplay){
        for(var i=0; i<this.markertStreetPlay.length; i++){
          this.markertStreetPlay[i].setMap(null);
        }
        this.loadstreetPlay();
    }else{
       for(var i=0; i<this.markertStreetPlay.length; i++){
          this.markertStreetPlay[i].setMap(null);
        }
      this.loadstreetPlay();
    }
    if(!this.selectAllCheckBox.checkboxCtpt){
        for(var i=0; i<this.markerCTPT.length; i++){
          this.markerCTPT[i].setMap(null);
        }
        this.loadCTPT();
    }else{
      for(var i=0; i<this.markerCTPT.length; i++){
        this.markerCTPT[i].setMap(null);
      }
      this.loadCTPT();
    }
    if(!this.selectAllCheckBox.checkboxPetrol){
        for(var i=0; i<this.markerPetrolPum.length; i++){
          this.markerPetrolPum[i].setMap(null);
        }
        this.loadPetrolPumpToilets();
    }else{
      for(var i=0; i<this.markerPetrolPum.length; i++){
          this.markerPetrolPum[i].setMap(null);
      }
      this.loadPetrolPumpToilets();
    }

    if(!this.selectAllCheckBox.checkboxOwc){
        for(var i=0; i<this.markerOWC.length; i++){
          this.markerOWC[i].setMap(null);
        }
        this.loadOWC();
    }else{
      for(var i=0; i<this.markerOWC.length; i++){
          this.markerOWC[i].setMap(null);
      }
      this.loadOWC();
    }
    if(!this.selectAllCheckBox.checkboxTwinbin){
        for(var i=0; i<this.markerTwinbin.length; i++){
          this.markerTwinbin[i].setMap(null);
        }
        this.loadTwinBin();
    }else{
      for(var i=0; i<this.markerTwinbin.length; i++){
          this.markerTwinbin[i].setMap(null);
      }
      this.loadTwinBin();
    }

    if(!this.selectAllCheckBox.checkboxCommercial){
        for(var i=0; i<this.markerCommercial.length; i++){
          this.markerCommercial[i].setMap(null);
        }
        this.loadCommercialArea();
    }else{
      for(var i=0; i<this.markerCommercial.length; i++){
        this.markerCommercial[i].setMap(null);
      }
      this.loadCommercialArea();
    }
    if(!this.selectAllCheckBox.checkboxCitypark){
        for(var i=0; i<this.markerCityPark.length; i++){
          this.markerCityPark[i].setMap(null);
        }
        this.loadCityPark();
    }else{
      for(var i=0; i<this.markerCityPark.length; i++){
          this.markerCityPark[i].setMap(null);
      }
      this.loadCityPark();
    }
}




}
