import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/entrega1/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
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
