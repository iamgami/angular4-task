
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
// import { ReportComponent } from './components/report/report.component';
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
import { CitizenComponent } from './components/citizen/citizen.component';
import { OperatorComponent } from './components/operator/operator.component';
import { TwinBinComponent } from './components/twin-bin/twin-bin.component';
import { DatewiseComponent } from './components/datewise/datewise.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'live-for-citizen', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // { path: 'report', component: ReportComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'desludging-vehicle-report', component: DesludgingVehicleReportComponent },
    { path: 'driver-performance-report', component: DriverPerformanceReportComponent },
    { path: 'poi-report', component: PoiReportComponent },
    { path: 'processed-waste-pu-report', component: ProcessedWastePuReportComponent },
    { path: 'rwas-report', component: RwasReportComponent },
    { path: 'trip-count-report', component: TripCountReportComponent },
    { path: 'twin-bin-emptied-report', component: TwinBinEmptiedReportComponent },
    { path: 'vehicle-deployment-report', component: VehicleDeploymentReportComponent },
    { path: 'vehicle-movement-report', component: VehicleMovementReportComponent },
    { path: 'ward-wise-generation-report', component: WardWiseGenerationReportComponent },
    { path: 'monthly-trip-report', component: MonthlyTripReportComponent },
    { path: 'processed-waste-mrf-report', component: processedWasteMrfReportComponent },
    { path: 'gps-log-report', component: GPSlogReportComponent },
    { path: 'live-for-citizen', component: CitizenComponent },
    { path: 'live-for-operator', component: OperatorComponent },
    { path: 'twin-bin', component: TwinBinComponent },
    { path: 'date-wise', component: DatewiseComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '', }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

