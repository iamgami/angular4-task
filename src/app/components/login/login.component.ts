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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username :any;
  password : any;
  model: any = {};
  loading = false;
  returnUrl: string;
  loginpage : any;
  constructor(private router: Router, public _APIservices: Api, ) {
      this.loginpage = true;
  }

  ngOnInit() {
     // reset login status
       // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
       // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
       $(".navbar-nav").addClass('hide-nav');
  }


  login() {
    this.loading = true;
    let body_param = {
      'email': this.model.username,
      'password' : this.model.password
    };
    this._APIservices.api_login(body_param).subscribe(suc => {
      var user = suc.body;
      if (user && user.id) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = '/home'
      }
      else
      {
        alert("Invalid user");
        this.loading = false;
      }
     
    }, err => {
       alert("Invalid user");
       this.loading = false;
    });
  }
}
