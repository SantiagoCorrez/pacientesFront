import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';

import { DatospacienteService } from 'src/app/service/entrega2/datospaciente.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/entrega1/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  const_Session: any;
  dataPac: any;
  fullname: string = '';

  constructor(private cookie: CookieService,
              private datospacienteService: DatospacienteService,
              private router: Router,
              private loginService:LoginService) {
    let userSession = cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    datospacienteService.getDataPaciente().subscribe(
      data =>{
        this.dataPac = data;
      },
      error => {
      }
    )
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
