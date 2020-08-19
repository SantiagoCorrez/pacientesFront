import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/service/entrega1/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historialpagos',
  templateUrl: './historialpagos.component.html',
  styleUrls: ['./historialpagos.component.css']
})
export class HistorialpagosComponent implements OnInit {
  fullname: string = '';
  
  constructor(private cookie: CookieService,
              private loginService:LoginService,
              private router: Router) { }

  ngOnInit() {
    this.fullname = this.cookie.get('fullname');
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $('.img-side-hide').toggle('display');
      });
      if($('#sidebar').css('margin-left') != '0px'){
        $('.img-side-hide').toggle();
      }
    });
  }

  logout() {
    this.loginService.logout().subscribe(
      () => {
        this.cookie.delete('srvpriv');
        this.cookie.deleteAll();
        sessionStorage.removeItem('login');
        this.router.navigate(['/']);
      },
      (error) => {
        this.cookie.delete('srvpriv');
        this.cookie.deleteAll();
        sessionStorage.removeItem('login');
        this.router.navigate(['/']);
      }
    );
  }

}
