import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any = [];
  isLogin: any = false;
  
  constructor(private router: Router) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser)
    {
      this.isLogin = true; 
    }
    if(router.url == '/login' )
    {
      $(".navbar-nav").addClass('hide-nav');
    }
    if(router.url == '/register')
    {
      $(".navbar-nav").addClass('hide-nav');
    }
  }

  ngOnInit() {
    $('ul.nav li.dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });
    
    
    
  }
  GoHome(){
    this.router.navigate(['home']);
  }
  GoReport(){
    this.router.navigate(['report']);
  }
  GoMaps(){
    this.router.navigate(['maps']);
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.isLogin = false; 
    window.location.href = '/login'
  } 
}
