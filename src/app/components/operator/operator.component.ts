import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Api } from './../../../services/api.provider';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import * as moment from 'moment';
declare var $: any;
declare var jQuery: any;
declare var google: any;
declare var MapLabel: any;
declare var gpolygons: any;
declare var LabelOverlay: any;
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { map } from 'rxjs/operator/map';
import { setTimeout, setInterval, clearInterval } from 'timers';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit  {
  loadjson: any;
  opensidebar: any;
  closesidebar: any;
  //Show Loader Status
  showLoader: boolean;

  value: Date;
  getZonesList: any;
  getWardsList: any;
  getVehiclesList: any;
  zonelist: string;
  Wardslist: string;
  selectdate: any;
  currentdate: any;
  public Today_date: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
  Shift: string;
  zoneID: number;
  wardsID: number;
  ShiftID: number;
  myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
    disableSince: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() + 1 },
    disableUntil: {year: 2017, month: 11, day: 30},
  };

  map: any;
  routes: any;
  notblank: any;
  trackData: any;
  lineCoordinates: any;
  interVal: any = "";
  speedArray: any;
  markers: any;
  lastPosn: any;
  marker: any;
  count: any;
  play: any = true;
  pause: any = false;
  reset: boolean = false;

  newMarkerArray: any;
  speed: any = 0;
  routeColors: any;
  vehicleRouteColors: any;
  zoneColors: any;
  wardColors: any;
  overlayArray: any;
  polyLineArray: any;
  bounds: any;
  vehicleIndex: number = 0;
  vehicleDataArray: any = [];
  mergedRoutePath: any;
  movementMarker: any;
  wardColor: any = [];
  wardName: any = [];
  zoneColor: any = [];
  zoneName: any = [];
  legendStatus: any;
  selectZoneWard: any;
  flightPlanCoordinates: number[];
  optionsModel: number[];
  stop: any;
  vehicleLists: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true
  };
  fuleStationList: any;
  parkingList: any;
  trenchingGroundsList: any;
  transferStationsList: any;
  vehicleColorCode: any = [];
  wardDataArray: any =[];
  wardColorAndName: any =[];
  selectedZoneNo: string = '';
  selectedZone: string = '';
  selectedWardNo: string = '';
  selectedWard: string = '';

  zonesArray: any;
  wardsArray: any;
  vehicleCoordinateArray: any = [];
  wardPoly: any;
  vehicleWithColor :any;
  forward : any;
  counter :any;
  checkboxLive : any;
  live : any;
  golive :any;
  showLiveFeedOption : any;
  markersArray: any = [];
  query :any;
  
  filteredList : any = [];
  countries : any = [];
  elementRef : any;
  getAllVehiclesList : any;
  parentPage : any;
  childPage : any;
  currentUser : any = [];
  constructor(private router: Router, public _APIservices: Api, ) {
    this.elementRef = '';
    this.query = '';
    this.zonelist = "";
    this.Wardslist = "";
    this.Shift = '0';
    this.currentdate = new Date();
    this.showLoader = false;
    this.mergedRoutePath = "";
    this.movementMarker = "";
    //this.routeColors = ['#c5e7cf', '#fbe7cb', '#dffbcb', '#172d51', '#a32249', '#945aca', '#f69d3a','#F6D155','#EDCDC2','#5A7247','#CFB095','#D8AE47','#0AF511','#9896A4','#C3447A'];
    this.routeColors = ['#56A5EC', '#8D38C9', '#4E387E', '#B93B8F', '#3EA99F', '#41A317', '#E9AB17', '#AF7817', '#827839', '#E56717', '#7F462C', '#C25283', '#7F4E52', '#A0C544', '#4AA02C', '#736AFF', '#C38EC7', '#806D7E', '#0AF511'];
    this.vehicleRouteColors = ['#ff0000', '#DC143C', '#B22222', '#FF4500', '#8B0000', '#B22222', '#008080', '#808000', '333300', '#000000'];
    // this.zoneColors = ['#000066','#006600','#006666','#008080','#00cccc','#00ccff','#3366cc','#660066','#663333','#666600','#669966','#66cc66','#990000','#990000','#996633','#cc6666','#cc9999','#cccc00','#ff9900'];
    this.zoneColors = ['#56A5EC', '#8D38C9', '#4E387E', '#B93B8F', '#3EA99F', '#41A317', '#E9AB17', '#AF7817', '#827839', '#E56717', '#7F462C', '#C25283', '#7F4E52', '#A0C544', '#4AA02C', '#736AFF', '#C38EC7', '#806D7E', '#0AF511'];
    this.wardColors = ['#0AF511','#92B558', '#DC4C46', '#672E3B', '#C48F65', '#223A5E', '#9C9A40', '#4F84C4', '#D2691E', '#578CA9'];
    this.fuleStationList = "";
    this.parkingList = "";
    this.trenchingGroundsList = "";
    this.transferStationsList = "";

    this.vehicleLists = [];
    this.zonesArray = [];
    this.wardsArray = [];
    this.vehicleWithColor = [];
    this.forward = false;
    this.counter = 0;
    this.stop = false;
    this.checkboxLive = false;
    this.live;
    this.golive = false;
    this.showLiveFeedOption = true;
    this.countries = [];
    if(router.url == '/live-for-operator' )
    {
      this.parentPage = 'Live For Operator';
      this.childPage =  'Live';
    }
    this.loadAllVehicleList();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!this.currentUser)
    {
      this.router.navigate(['login']);
    }
  }


filter() {
    if (this.query !== ""){
        this.filteredList = this.countries.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
}
handleClick(event){
  var clickedComponent = event.target;
  console.log("click");
  var inside = false;
  do {
      if (clickedComponent === this.elementRef.nativeElement) {
          inside = true;
      }
     clickedComponent = clickedComponent.parentNode;
  } while (clickedComponent);
   if(!inside){
       this.filteredList = [];
   }
}
 
select(item){
    this.query = item;
    this.filteredList = [];
    if(this.query)
    {
      this.doPlay();
    }
    
}

loadAllVehicleList() {
  try {

    let body_param = {};
    this._APIservices.api_all_vehicle_list(body_param)
      .subscribe(
      suc => {
        this.getAllVehiclesList = suc.body;
        
        for (let vehicle of this.getAllVehiclesList) {
          var vehicleName = vehicle.rto_number+'('+vehicle.vehicleType.purpose+')';
          var obj = {value : vehicle.rto_number , data : vehicle};
          this.countries.push(vehicleName);
        }
      },
      err => {

      });
  } catch (err) {
    console.log(err);
  }
}
  async doStop() {
    this.stop = true;
    this.showPlayButton();
    this.loadjson = []; 
    this.vehicleCoordinateArray = [];
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(22.7196, 75.8577),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.map = map;
    this.golive = false;
    clearInterval(this.live);
    clearInterval(this.interVal);
    
    this.zonelist = "";
    this.Wardslist = "";
    this.optionsModel = [];

    this.query = "";
    //setTimeout(function () {
    this.wardName = [];
    this.vehicleLists = [];
    await this.loadZoneList();
    //this.loadWardList();
    //}, 100);
    var thisSet = this;
    setTimeout(function () {
      thisSet.loadParkingspots();
      thisSet.loadtrenchingGrounds();
      thisSet.loadTransferStations();
      thisSet.loadfuelStations();
      thisSet.showPlayButton();
    }, 100);
    setTimeout( () => {
      this.showPlayButton();
    },2000);

  }

  resetBelowZone() {
    this.showPlayButton();
    this.loadjson = [];
    this.stop = true;
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(22.7196, 75.8577),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var thisSet = this;

    setTimeout(function () {
      thisSet.loadWardList();
    }, 100);
    this.Wardslist = "";
    this.map = map;
    this.optionsModel = [];

  }

  resetBelowWard() {
    this.showPlayButton();
    this.loadjson = [];
    this.stop = true;
    this.showLoader = false;
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(22.7196, 75.8577),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    setTimeout(function () {
      thisSet.loadWardList();
    }, 100);
    this.map = map;
    var thisSet = this;
    this.optionsModel = [];
  }

  resetBelowShift() {
    this.showPlayButton();
    this.stop = true;
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 14,
      center: new google.maps.LatLng(22.7196, 75.8577),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    setTimeout(function () {
      thisSet.loadWardList();
    }, 100);

    setTimeout(function () {
      thisSet.map.setZoom(16);
    }, 1000);

    this.map = map;
    var thisSet = this;
    this.optionsModel = [];

  }
  resetInput() {
    this.query = '';
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
      $("#searchclear").click(function(){
        $("#searchinput").val('');
    });
    });

    this.opensidebar = document.getElementById('sidebarCollapseopen');
    this.closesidebar = document.getElementById('sidebarCollapseclose');

    this.stop = false;
    this.speed = 8;
    this.interVal = "";
    this.lastPosn = [];
    this.map;
    this.lineCoordinates = [];
    this.markers = [];
    this.count = [];
    this.newMarkerArray = [];
    this.speedArray = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
    this.overlayArray = [];
    this.polyLineArray = [];
    this.legendStatus = '1';
    //map options
    var mapProp = {
      center: new google.maps.LatLng(22.752559, 75.865535),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // map initialise
    this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var infowindow = new google.maps.InfoWindow();
    this.bounds = new google.maps.LatLngBounds();

    this.loadZoneList();
    var thisSet = this;
    setTimeout(function () {
      thisSet.loadParkingspots();
      thisSet.loadtrenchingGrounds();
      thisSet.loadTransferStations();
      thisSet.loadfuelStations();
      thisSet.showPlayButton();
      thisSet.loadAllVehicleList();
    }, 100);

  }

  loadParkingspots() {
    var map = this.map;
    var currentMarker;

    try {
      let body_param = {
      };
      this._APIservices.api_parkingspots_list(body_param)
        .subscribe(
        suc => {
          this.parkingList = suc.body;
          for (let item of this.parkingList) {
            if (this.zoneID != undefined) {
              if (item.zone_id == this.zoneID) {
                var currentMarker = new google.maps.Marker({
                  position: {
                    lat: item.coordinates[0],
                    lng: item.coordinates[1]
                  },
                  map: map,
                  icon: "assets/parking-icon.png"
                });
                var infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(currentMarker, "mouseover", function (e) {
                  infoWindow.setContent(item.name);
                  infoWindow.open(map, this);
                });
                google.maps.event.addListener(currentMarker, 'mouseout', function () {
                  infoWindow.close();
                });
              }
            }
            else {
              var currentMarker = new google.maps.Marker({
                position: {
                  lat: item.coordinates[0],
                  lng: item.coordinates[1]
                },
                map: map,
                icon: "assets/parking-icon.png"
              });
              var infoWindow = new google.maps.InfoWindow();
              google.maps.event.addListener(currentMarker, "mouseover", function (e) {
                infoWindow.setContent(item.name);
                infoWindow.open(map, this);
              });
              google.maps.event.addListener(currentMarker, 'mouseout', function () {
                infoWindow.close();
              });
            }

          }

        },
        err => {

        });
    } catch (err) {
      console.log(err);
    }
  }

  loadTransferStations() {
    var map = this.map;
    var currentMarker;
    var geocoder = new google.maps.Geocoder();
    try {
      let body_param = {
        ward_id: this.wardsID,
        geofence_require: true
      };
      // Create Transfer Station
      this._APIservices.transfer_stations_list(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          for (let item of res) {
            /// Getting the Zone Name ///
            //this.zoneName.push(item.name);

            let geocords = item.geojson_file.features[0].geometry.coordinates;
            var triangleCoords = [];
            var lastLat;
            var lastLng;
            for (let data of geocords[0]) {
              triangleCoords.push({
                lat: data[1], lng: data[0]
              });
              this.bounds.extend(new google.maps.LatLng(data[1], data[0]));
              lastLat = data[1];
              lastLng = data[0];
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
              //this1.zoomMap(vertices, event);
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
              icon: "assets/garbage1.png"
            });
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
        },
        err => {

        });
    } catch (err) {
      console.log(err);
    }
  }

  loadtrenchingGrounds() {
    var map = this.map;
    var currentMarker;
    var geocoder = new google.maps.Geocoder();
    try {
      let body_param = {
      };
      this._APIservices.trenching_grounds_list(body_param)
        .subscribe(
        suc => {
          this.trenchingGroundsList = suc.body;
          for (let item of this.trenchingGroundsList) {
            geocoder.geocode({ 'address': item.name }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                currentMarker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: 'assets/garbage2.png'
                });
                var infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(currentMarker, "mouseover", function (e) {
                  infoWindow.setContent(item.name);
                  infoWindow.open(map, this);
                });
                google.maps.event.addListener(currentMarker, 'mouseout', function () {
                  infoWindow.close();
                });
              }
            });
          }
        },
        err => {

        });
    } catch (err) {
      console.log(err);
    }
  }

  loadfuelStations() {
    var map = this.map;
    var currentMarker;
    var geocoder = new google.maps.Geocoder();
    // for(let item of this.getZonesList){
    let body_param = {
      'zone_id': this.zoneID,
    };
    
    this._APIservices.api_zone_fuel_stations(body_param).subscribe(suc => {
      this.fuleStationList = suc.body;
      for (let item of this.fuleStationList) {
        currentMarker = new google.maps.Marker({
          position: {
            lat: item.coordinates[0],
            lng: item.coordinates[1]
          },
          map: map,
          icon: 'assets/fuel-icon.png'
        });
        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(currentMarker, "mouseover", function (e) {
          infoWindow.setContent(item.name);
          infoWindow.open(map, this);
        });
        google.maps.event.addListener(currentMarker, 'mouseout', function () {
          infoWindow.close();
        });
      }
    }, err => {

    });

    // }
  }

  closeLegend() {
    if (this.legendStatus == '1') {
      this.legendStatus = '0';
    } else {
      this.legendStatus = '1';
    }
  }

  openLegend() {
    if (this.legendStatus == '0') {
      this.legendStatus = '1';
    } else {
      this.legendStatus = '0';
    }
  }

  //// need to be change ////
  switchZone(status: any) {
    if (this.selectedZone == '') {
      if (status) {
        for (let item of this.zonesArray) {
          item.setMap(this.map);
        }
      } else {
        for (let item of this.zonesArray) {
          item.setMap(null);
        }
      }
    }
  }

  switchWard(status: any) {
    if (status) {
      for (let item of this.wardsArray) {
        item.setMap(this.map);
      }
    } else {
      for (let item of this.wardsArray) {
        item.setMap(null);
      }
    }
  }

  onDateChanged(event) {
    this.currentdate = moment(event.jsdate).format('YYYY-MM-DD');
    var otherDate =  new Date(this.currentdate);
    var d = new Date();
    if((d.toDateString() === otherDate.toDateString()))
    {
      this.showLiveFeedOption = true;
    }
    else
    {
      this.showLiveFeedOption = false;
      this.golive = false;
      clearInterval(this.live);
      clearInterval(this.interVal);
    }

    this.showPlayButton();
    if (this.play == false || this.vehicleCoordinateArray.length > 0) {
      this.doStop();
      var thisSet = this;
      this.wardsID = undefined;
      this.zoneID = undefined;
      this.zoneColor = [];
      this.zoneName = [];
      this.wardName = [];
      this.wardColor = [];
      this.wardColorAndName = [];
      this.vehicleLists = [];

      setTimeout(function () {
        thisSet.loadParkingspots();
        thisSet.loadtrenchingGrounds();
        thisSet.loadTransferStations();
        thisSet.loadfuelStations();
        thisSet.map.setZoom(12);
        
      }, 2000);

    }

  }

  loadZoneList() {
    try {
      let body_param = {
      };
      this._APIservices.api_zone_list(body_param)
        .subscribe(
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

  createZoneListOnMap() {
    try {
      let body_param = {
        'geofence_require': true
      };
      this._APIservices.api_zone_list_with_geo(body_param)
        .subscribe(
        suc => {
          let res = suc.body;
          this.zonesArray = [];
          this.zoneName=[];
          this.zoneColor=[];
          let countindex: number =0;
          for (let item of res) {
            /// Getting the Zone Name ///
            //this.zoneName.push(item.name);

            // let geocords = [];// item.geojson_file.features[0].geometry.coordinates;

            // for(let geoitem of item.geojson_file.features){
            //   for(let geoitem1 of geoitem.geometry.coordinates){
            //     for(let geoitem2 of geoitem1){
            //       geocords.push(geoitem2);
            //     }
            //   }
            // }

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

           

            // for (let data of geocords) {
            //   triangleCoords.push({
            //     lat: data[1], lng: data[0]
            //   });
              
            // }

            var colorcode = this.zoneColors[countindex];//Math.floor(Math.random() * this.zoneColors.length)];

            countindex++;

            ////  checking for the color of zone as string ////
            this.zoneName.push({
              name: item.name, 
              color:  colorcode
            });

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
            this.openZoneInfoWindow(marker,item);
            this.zonesArray.push(bermudaTriangle);

            setTimeout(() => {
              this.map.setZoom(12);
            }, 100);
            var this1 = this;
            bermudaTriangle.addListener('click', function (event) {
              var vertices = this.getPath();
              this1.zoomMap(vertices, event)
            });

            this.overlayArray.push(bermudaTriangle);

          }

          setTimeout(()=>{
            this.showPlayButton();
          },2000);

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
    this.map.setCenter(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
    this.bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < vertices.getLength(); i++) {
      var xy = vertices.getAt(i);
      this.bounds.extend(new google.maps.LatLng(xy.lat(), xy.lng()));
      if (i == vertices.getLength() - 1) {
        this.map.fitBounds(this.bounds);
      }
    }
  }

  onSelectZone(selectzone) {
    
    console.log("Load Zone OO"+selectzone);
    if (selectzone == "") {
      this.selectedZone = '';
      this.wardName = [];
      this.vehicleLists = [];
      this.switchWard(false);
      this.switchZone(true);
    }else{
      // this.zoneColor = [];
      // this.zoneName = [];
      this.wardsID=undefined;
      // this.wardName = [];
      this.wardColor = [];
      this.wardColorAndName = [];
      this.vehicleLists = [];
      for (let item of this.getZonesList) {
        if (item.id == selectzone) {
          this.selectedZone = item.name;
          this.selectedZoneNo = item.zone_number;
          break;
        }
      }

      this.zoneID = selectzone;
      this.vehicleColorCode = [];
      this.vehicleWithColor = [];
      this.wardsArray = [];
      this.loadWardList();
      this.resetBelowZone();
      var thisSet = this;
      setTimeout(function () {
        thisSet.loadParkingspots();
        thisSet.loadtrenchingGrounds();
        thisSet.loadTransferStations();
        thisSet.loadfuelStations();
        thisSet.showPlayButton();
      }, 2000);
    }
  }

  loadWardList() {
    try {
      console.log("Zone On Ward"+ this.zoneID);
      let body_param = {
        'zone_id': this.zoneID
      };
      this._APIservices.api_ward_list(body_param)
        .subscribe(
        suc => {
          this.wardName = [];
          this.getWardsList = suc.body;
          for (let wname of this.getWardsList) {
            // console.log(this.getWardsList);
            this.wardName.push(wname.name);
            if(this.wardsID == wname.id)
            {
              this.selectedWard = wname.name;
            }
          }
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
    if (this.getWardsList != undefined) {
      let countWardIndex: number = 0;
       this.wardsArray=[];
       this.wardDataArray=[];
      if(this.wardsID==undefined)
      {
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

              var colorcode = this.wardColors[countWardIndex];
              this.wardColor.push(colorcode);

              

              // Construct the polygon.
              let bermudaTriangle = new google.maps.Polygon({
                paths: triangleCoords,
                strokeColor: colorcode,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: colorcode,
                fillOpacity: 0.35
              });
              this.wardColorAndName.push({
                color_code: colorcode, 
                ward_name:  res.name
              });
              
              bermudaTriangle.setMap(this.map);
              //// getting the ward color code ////
              
              countWardIndex++;
              var center = bermudaTriangle.my_getBounds().getCenter();

              // var infowindow = new google.maps.InfoWindow({
              //   content: item.name
              // });

              var marker = new google.maps.Marker({
                position: center,
                map: this.map,
                title: item.name
              });
              this.openWardInfoWindow(marker,item.name)
              // infowindow.open(this.map, marker);

              // marker.addListener('click', () => {
              //   infowindow.open(this.map, marker);
              // });

              this.wardsArray.push(bermudaTriangle);
              var this1 = this;
              bermudaTriangle.addListener('click', function (event) {
                var vertices = this.getPath();
                this1.zoomMap(vertices, event)
              });

              this.overlayArray.push(bermudaTriangle);
              this.map.fitBounds(this.bounds);
              this.wardPoly = bermudaTriangle;
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

              var colorcode = this.wardColors[countWardIndex];//Math.floor(Math.random() * this.wardColors.length)];
              

              //// getting the ward color code ////
              this.wardColor.push(colorcode);

              // Construct the polygon.
              let bermudaTriangle = new google.maps.Polygon({
                paths: triangleCoords,
                strokeColor: colorcode,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: colorcode,
                fillOpacity: 0.35,
                setLabel: this.wardName
              });
              bermudaTriangle.setMap(this.map);
              countWardIndex++;
              var center = bermudaTriangle.my_getBounds().getCenter();

              // var infowindow = new google.maps.InfoWindow({
              //   content: this.selectedWard
              // });

              var marker = new google.maps.Marker({
                position: center,
                map: this.map,
                title: this.selectedWard
              });
              this.openWardInfoWindow(marker,this.selectedWard);
              //infowindow.open(this.map, marker);

              // marker.addListener('click', () => {
              //   infowindow.open(this.map, marker);
              // });

              this.wardsArray.push(bermudaTriangle);
              var this1 = this;
              bermudaTriangle.addListener('click', function (event) {
                var vertices = this.getPath();
                this1.zoomMap(vertices, event)
              });

              this.overlayArray.push(bermudaTriangle);
              this.map.fitBounds(this.bounds);
              this.wardPoly = bermudaTriangle;
            },
            err => {

            });

      }
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

  onSelectWards(selectwards) {
    clearInterval(this.live);
    clearInterval(this.interVal);
    this.golive == false;
    if(this.vehicleCoordinateArray.length > 0)
    {
      this.vehicleCoordinateArray = [];
    }
    if (selectwards == "") {
      this.selectedWard = '';
      this.vehicleLists = [];
      this.switchWard(true);
      return false;
    }
    
    // this.wardName = [];
    // this.wardColor = [];
    this.vehicleColorCode = [];
    this.vehicleWithColor = [];
    // for (let item of this.getWardsList) {
    //   if (item.id == selectwards) {
    //     this.selectedWard = item.name;
    //     this.selectedWardNo = item.ward_number;
    //     break;
    //   }
    // }

    this.wardsID = selectwards;
    this.load_vehicles();
    this.resetBelowWard();
    var thisSet = this;
    setTimeout(function () {
      thisSet.loadParkingspots();
      thisSet.loadtrenchingGrounds();
      thisSet.loadTransferStations();
      thisSet.loadfuelStations();
    }, 2000);
  }

  onSelectShift(shiftId) {
    clearInterval(this.live);
    clearInterval(this.interVal);
    this.Shift = shiftId;
    this.load_vehicles();
    //this.resetBelowShift();
    var thisSet = this;
    setTimeout(function () {
      thisSet.loadParkingspots();
      thisSet.loadtrenchingGrounds();
      thisSet.loadTransferStations();
      thisSet.loadfuelStations();
    }, 2000);
  }

  playVehicle(vehicle) {
   
    if(this.optionsModel.length > 0){
      this.clearPolyLine();
      this.loadWardsRoads();
    }
    else
    {
      this.loadWardsRoads();
    }
  
  }
  
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
          this.loadWardsRoads();
        },
        err => {

        });

    } catch (err) {
      console.log(err);
    }
  }

  loadWardsRoads() {
    this.clearPolyLine();
    this.vehicleColorCode = [];
    this.vehicleWithColor = [];
    this.bounds = new google.maps.LatLngBounds();
    let countroadindex: number = 0;
    var vehicleRTO = this.query.split('(')[0];
    if(this.routes != null) {
      for (let item of this.routes) {
        if (item.registration_number == vehicleRTO) {
          var flightPlanCoordinates = [];
          for (let data of item.coordinates) {
            flightPlanCoordinates.push({ lat: data[1], lng: data[0] });
            this.bounds.extend(new google.maps.LatLng(data[1], data[0]));
          }
          var colorcode = this.routeColors[countroadindex];//Math.floor(Math.random() * this.routeColors.length)];
          countroadindex++;
          this.vehicleColorCode.push(colorcode);
          var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: colorcode,
            strokeOpacity: 1,
            strokeWeight: 4,
            width: 15,
            zIndex: 30
          });
          this.vehicleWithColor.push({
            vehicle_name : item.registration_number,
            vehicle_color : colorcode
          });
          flightPath.setMap(this.map);

          var this1 = this;
          flightPath.addListener('click', function (event) {
            var vertices = this.getPath();
            this1.zoomMap(vertices, event)
          });

          this.polyLineArray.push(flightPath);
          this.map.fitBounds(this.bounds);
        }
      }
    }
  }

  async doPlay() {
    if (this.query == undefined ) {
      alert('Required parameter is missing.');
      return false;
    }
    this.showLoader = true;
    var vehicleRTO = this.query.split('(')[0];
    for (let vehicle of this.getAllVehiclesList) {
      if(vehicleRTO == vehicle.rto_number) {
        this.wardsID = vehicle.ward_id;
        this.zoneID = vehicle.zone_id;
        var thisSet = this;
        this.selectedWardNo = vehicle.ward_id;
        setTimeout(function () {
        thisSet.onSelectZone(thisSet.zoneID);
        thisSet.onSelectWards(vehicle.ward_id);
        thisSet.getLiveFeed(vehicle);
          var this1 = this;
          thisSet.golive = true;
          thisSet.live = setInterval(_ => {  
            
            if(thisSet.golive == true)
            {
              for (var i = 0; i < thisSet.markersArray.length; i++) {
                thisSet.markersArray[i].setMap(null);
              }
              thisSet.markersArray = [];
              thisSet.getLiveFeed(vehicle);
            }
            else
            {
              clearInterval(vehicle.live);
            }
            
          }, 5000);
          
      }, 2000);
        break;
      }
     
    }
   }

  getLiveFeed(vehicle){
    this.vehicleIndex = 0;
    this.showPauseButton();
    let vehicleCountIndex: number = 0;
    var thisSet = this;
    //thisSet.showLoader = true;
    thisSet.forward = false;
    this.stop = false;
    
      var date = new Date();
      var seconds = date.getTime() / 1000; //1440516958
        this._APIservices.live_gps_data(vehicle.gpsDevice.imei, seconds).subscribe(suc => {
        this.vehicleDataArray[this.vehicleIndex] = suc.body;
        this.loadjson = suc.body;
        this.vehicleCoordinateArray.push(suc.body);
        thisSet.forward = false;
        thisSet.showLoader = false;
        if (suc.body != null && suc.body.length > 0) {
          this.liveDraw(vehicle);
        }
      }, err => { 
        thisSet.stop = false;
        thisSet.counter = 0;    
        
      }, function(){
        thisSet.stop = false;
        thisSet.counter = 0;    
      });
      vehicleCountIndex++;
  }
  
  liveDraw(vehicleDetails) {
    var map = this.map;
    var hex = '0123456789ABCDEF'.split(''), color = '#', i;
    if (this.stop == true) {
      this.loadjson = [];
      return false;
    }
    var mergedPlaybackCoords = this.loadjson;
    
    if (mergedPlaybackCoords.length == 0) {

      return false;
    }
    var infowindowFirst = new google.maps.InfoWindow();
    var infowindow = new google.maps.InfoWindow();
    var currentMarker;
    var firstMarker;
    this.showPauseButton();
    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 style="font-size: 18px;">' + vehicleDetails.rto_number + '</h1>' +
      '<div id="bodyContent">' +
      '<span>Vehicle Capacity : ' + vehicleDetails.capacityType.total_capacity + '</span>' +
      '<br><span>Dry%  : ' + vehicleDetails.capacityType.dry_percentage + '</span>' +
      '<br><span>Wet%  : ' + vehicleDetails.capacityType.wet_percentage + '</span>' +
      '<br><span>Vehicle Type  : ' + vehicleDetails.vehicleType.purpose + '</span>' +
      '</div>' +
      '</div>';
    var k = mergedPlaybackCoords.length - 1;
    var lastVehiclePoint = mergedPlaybackCoords[k];
    var firstVehiclePoint = mergedPlaybackCoords[0];
    var offset = 0;
    var newSpeed = undefined;
    var playbackMarkers = [];
    
    currentMarker = new google.maps.Marker({
      position: {
        lat: lastVehiclePoint.lat,
        lng: lastVehiclePoint.lng
      },
      map: map,
      icon: "assets/dumper.png",
      zIndex:99999999
    });
    this.markersArray.push(currentMarker);
  
    var mapMoveCounter = 10;
    
    var this1 = this;
    infowindow.setContent(contentString);
    infowindowFirst.setContent(contentString);
    color = this.vehicleRouteColors[i];
    google.maps.event.addListener(currentMarker, 'mouseover', function() {
      infowindow.open(map, this);
    });
   
    

  }

  routeWithPage(rowCount, url) {
    this._APIservices.api_ward_route_list_page(url, {}).subscribe(suc => {
      if (suc.body.next != null) {
        for (let item of suc.body.results) {
          this.vehicleDataArray[rowCount].push(item);
        }
        this.routeWithPage(rowCount, suc.body.next);
      }
    }, err => {
    });
  }

  changeRange(value: number) {
    this.speed = value;
  }

  doSkip() {
    if (this.vehicleCoordinateArray.length > 0) {
      this.showLoader = true;
      this.resetBelowShift();
      var thisSet = this;
      this.vehicleColorCode = [];
      this.vehicleWithColor = [];
      setTimeout(function () {
        thisSet.playAfterSkip();
        thisSet.showResetButton();
        thisSet.loadParkingspots();
        thisSet.loadtrenchingGrounds();
        thisSet.loadTransferStations();
        thisSet.loadfuelStations();
        thisSet.loadWardsRoads()
        //thisSet.map.setZoom(12);
      }, 1000);
    }
    this.showLoader = true;
    this.showResetButton();
  }

  resetWholeMap(){
    this.showPlayButton();
    this.doStop();
    //window.location.reload();
  }

  playAfterSkip() {
    
    var infowindowFirst = new google.maps.InfoWindow();
    var infowindow = new google.maps.InfoWindow();
    var currentMarker;
    var firstMarker;

    for (let item of this.vehicleCoordinateArray) {
      var map = this.map;
      var hex = '0123456789ABCDEF'.split(''), color = '#', i;
      var mergedPlaybackCoords = item;
      if (mergedPlaybackCoords.length == 0) {
        return false;
      }
      var k = mergedPlaybackCoords.length - 1;
      var lastVehiclePoint = mergedPlaybackCoords[k];
      var firstVehiclePoint = mergedPlaybackCoords[0];
      for (i = 0; i < this.getVehiclesList.length; i++) {
        if (this.getVehiclesList[i].imei == item[k].imei) {
          var vehicleDetails = this.getVehiclesList[i];
          
          var contentString = vehicleDetails.registration_number + '& Vehicle Capacity '
            + vehicleDetails.vehicle_capacity;
        }
      }
      var offset = 0;
      var newSpeed = undefined;
      var playbackMarkers = [];
      firstMarker = new google.maps.Marker({
        position: {
          lat: firstVehiclePoint.lat,
          lng: firstVehiclePoint.lng
        },
        map: map,
        title: contentString + ' & Time ' + this.changeDateFormat(lastVehiclePoint.datetime),
        icon: "assets/start.png"
      });
      currentMarker = new google.maps.Marker({
        position: {
          lat: lastVehiclePoint.lat,
          lng: lastVehiclePoint.lng
        },
        map: map,
        title: contentString + ' & Time ' + this.changeDateFormat(lastVehiclePoint.datetime),
        icon: "assets/end.png"
      });
      var mapMoveCounter = 10;
      var markersArray = [];
      var this1 = this;
      var m = 1;
      mergedPlaybackCoords.map(function (lctn) {

        var movementMarker = new google.maps.Marker({
          position: {
            lat: lctn.lat,
            lng: lctn.lng
          },
          map: map,
          datetime: lctn.datetime,
          speed: lctn.speed,
          icon: 'assets/dumper.png'
        });
        movementMarker.setVisible(false);
        playbackMarkers.push(movementMarker);
          m++;
          if (m == mergedPlaybackCoords.length) {
            this1.play = true;
            this1.pause = false;
            
            setTimeout(function () {
              this1.showLoader = false;
            }, 5000);

          }
          currentMarker = playbackMarkers.shift();
          if (mapMoveCounter === 0) {
            mapMoveCounter = 10;
          }
         var mergedRoutePath = new google.maps.Polyline({
            path: [{
              lat: lastVehiclePoint.lat,
              lng: lastVehiclePoint.lng
            }, {
              lat: lctn.lat,
              lng: lctn.lng
            }],
            geodesic: true,
            strokeColor: "#ff0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            clickable: false,
            zIndex: 300
          });
          this1.mergedRoutePath = mergedRoutePath;
          this1.movementMarker = movementMarker;
          mapMoveCounter--;
          mergedRoutePath.setMap(map);
          lastVehiclePoint = lctn;
        }, offset);
       

    }
  }

  changeDateFormat(datetime) {
    var now = new Date(datetime);
    var year = "" + now.getFullYear();
    var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  }
  
  showPlayButton(){
    this.play = true;
    this.pause = false;
    this.forward = false;
    this.reset = false;
  }

  showResetButton(){
    this.reset = true;
    this.pause = false;
    this.forward = false;
    this.play = false;
  }

  showPauseButton(){
    this.pause = true;
    this.reset = false;
    this.forward = false;
    this.play = false;
  }
  showForwardButton(){
    this.forward = true;
    this.reset = false;
    this.pause = false;
    this.play = false;
  }

  selectLiveFeed(status: any){
    this.checkboxLive = status;
    if(status == false)
    {
      clearInterval(this.live);
      this.golive = false;;
    }
    else
    {
      this.golive = true;
    }
  }
  
}


