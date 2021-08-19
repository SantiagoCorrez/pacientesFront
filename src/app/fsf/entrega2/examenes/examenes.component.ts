import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import * as $ from 'jquery';
import swal from 'sweetalert';
import { LoginService } from 'src/app/service/entrega1/login.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {
  const_Session: any;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  fullname:string = '';

  constructor(private router: Router,
    private idle: Idle, private keepalive: Keepalive,
    private cookie: CookieService,
    private loginService:LoginService) {
    let userSession = cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));


    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(600);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.cookie.deleteAll()
      sessionStorage.removeItem('login')
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

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
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
