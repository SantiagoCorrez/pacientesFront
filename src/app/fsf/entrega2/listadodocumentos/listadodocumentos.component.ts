import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
import { LoginService } from 'src/app/service/entrega1/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listadodocumentos',
  templateUrl: './listadodocumentos.component.html',
  styleUrls: ['./listadodocumentos.component.css']
})
export class ListadodocumentosComponent implements OnInit {
  const_Session: any;
  fullname: string;

  constructor(private cookie: CookieService,
    private router: Router,
    private loginService:LoginService) {
    let userSession = cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
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

}
