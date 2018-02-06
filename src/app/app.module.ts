
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { MapsComponent } from './components/maps/maps.component';

import { DesludgingVehicleReportComponent } from './components/desludging-vehicle-report/desludging-vehicle-report.component';
import { DriverPerformanceReportComponent } from './components/driver-performance-report/driver-performance-report.component';
import { PoiReportComponent } from './components/poi-report/poi-report.component';
import { ProcessedWastePuReportComponent } from './components/processed-waste-pu-report/processed-waste-pu-report.component';
import { RwasReportComponent } from './components/rwas-report/rwas-report.component';
import { TripCountReportComponent } from './components/trip-count-report/trip-count-report.component';
import { TwinBinEmptiedReportComponent } from './components/twin-bin-emptied-report/twin-bin-emptied-report.component';
import { VehicleDeploymentReportComponent } from './components/vehicle-deployment-report/vehicle-deployment-report.component';
import { VehicleMovementReportComponent } from './components/vehicle-movement-report/vehicle-movement-report.component';
import { WardWiseGenerationReportComponent } from './components/ward-wise-generation-report/ward-wise-generation-report.component';
import { MonthlyTripReportComponent } from './components/monthly-trip-report/monthly-trip-report.component';
import { processedWasteMrfReportComponent } from './components/processed-waste-mrf-report/processed-waste-mrf-report.component';
import { GPSlogReportComponent } from './components/gps-log-report/gps-log-report.component';
import { Api } from './../services/api.provider';
import { MyDatePickerModule } from 'mydatepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {DataTableModule} from "angular2-datatable";
import { MomentModule } from 'angular2-moment';
import { CitizenComponent } from './components/citizen/citizen.component';
import { OperatorComponent } from './components/operator/operator.component';
import { TwinBinComponent } from './components/twin-bin/twin-bin.component';
import { DatewiseComponent } from './components/datewise/datewise.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
export function initFactory() {
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        routing,
        FormsModule,
        MyDatePickerModule,
        MultiselectDropdownModule,
        DataTableModule,
        MomentModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ReportComponent,
        MapsComponent,
        DesludgingVehicleReportComponent,
        DriverPerformanceReportComponent,
        PoiReportComponent,
        ProcessedWastePuReportComponent,
        RwasReportComponent,
        TripCountReportComponent,
        TwinBinEmptiedReportComponent,
        VehicleDeploymentReportComponent,
        VehicleMovementReportComponent,
        WardWiseGenerationReportComponent,
        MonthlyTripReportComponent,
        processedWasteMrfReportComponent,
        GPSlogReportComponent,
        CitizenComponent,
        OperatorComponent,
        TwinBinComponent,
        DatewiseComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        Api
    ],
    bootstrap: [ AppComponent ]
})


export class AppModule {

  constructor(private router: Router) {
    router.events.subscribe((event) => {


    });
  }
}

