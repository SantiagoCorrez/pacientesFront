import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import swal from 'sweetalert';
import * as $ from 'jquery';
import { LoginService } from 'src/app/service/entrega1/login.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  const_Session: any;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  fullfname:string = '';

  constructor(private router: Router,
    private spinnerService: NgxSpinnerService,
    private idle: Idle, private keepalive: Keepalive,
    private cookie: CookieService,
    private loginService:LoginService) {
    let userSession = cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(240);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.cookie.deleteAll();
      sessionStorage.removeItem('login');
      this.router.navigate(['/']);
      this.timedOut = true;
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'Su sesión caducara en ' + countdown + ' segundos!';
      swal(this.idleState, {
        timer: 600000,
      }).then((value) => {
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

  spinner(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 7000);
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit() {
    // this.spinner();
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $('.img-side-hide').toggle('display');
        });
        if($('#sidebar').css('margin-left') != '0px'){
          $('.img-side-hide').toggle();
        }
    });
    window.addEventListener('beforeunload', function (e) {
    });
  }

  getName(name:string){
    this.fullfname = name;
  }

}
