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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username :any;
  password : any;
  model: any = {};
  loading = false;
  returnUrl: string;
  mobile: any;
  constructor(private router: Router, public _APIservices: Api, )  { }

  ngOnInit() {

  }

  register() {
    this.loading = true;
    let body_param = {
      'email': this.model.username,
      'password' : this.model.password,
      'firstname'  : this.model.firstname,
      'lastname'  : this.model.lastname,
      'mobile' : this.model.mobile,
    };
    this._APIservices.api_register(body_param).subscribe(suc => {
      var user = suc.body;
    }, err => {
       alert("user alrady registerd");
       this.loading = false;
    });
  }
}
