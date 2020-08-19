import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/entrega1/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { DatospagosService } from 'src/app/service/communicate/datospagos.service';

@Component({
  selector: 'app-integraciopp',
  templateUrl: './integraciopp.component.html',
  styleUrls: ['./integraciopp.component.css']
})
export class IntegracioppComponent implements OnInit {
  fullname: string = '';
  
  constructor(private loginService:LoginService,
              private cookie: CookieService,
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
