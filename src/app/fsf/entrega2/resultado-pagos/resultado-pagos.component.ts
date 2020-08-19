import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneradoPeticionService } from 'src/app/service/entrega2/pagos/generado-peticion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { LoginService } from 'src/app/service/entrega1/login.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-resultado-pagos',
  templateUrl: './resultado-pagos.component.html',
  styleUrls: ['./resultado-pagos.component.css']
})
export class ResultadoPagosComponent implements OnInit {
  idPagos = this._router.snapshot.paramMap.get('idPago');
  mipago: any;
  fullname: string = '';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(private _router: ActivatedRoute,
              private spinner:NgxSpinnerService,
              private cookie: CookieService,
              private loginService:LoginService,
              private idle: Idle, private keepalive: Keepalive,
              private router: Router,
              private generarPeticiones: GeneradoPeticionService,) {
                this.spinner.show();

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(240);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.cookie.deleteAll()
      sessionStorage.removeItem('login')
      swal({
        title: 'Su sesión ',
        text: 'Lo sentimos pero su sesión ha expirado',
        icon: 'info'
      })
      this.router.navigate(['/'])
      this.timedOut = true;
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'Su sesión caducara en ' + countdown + ' segundos!';
      
      swal({
        title: 'Su sesión ',
        text: this.idleState,
        icon: 'info',
        buttons: ["Continuar con mi sesión.", true],
        timer: 600000
      })
      .then((value) => {
        if(value){
          this.cookie.deleteAll()
          sessionStorage.removeItem('login')
          this.router.navigate(['/'])
        } else {
          this.reset();
        }
        
      });

    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
              }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
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

    this.generarPeticiones.getStatePay(this.idPagos).subscribe(data => {
      this.mipago = data;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

}
