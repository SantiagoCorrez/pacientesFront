import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { LoginService } from 'src/app/service/entrega1/login.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  public const_Session: any;
  fullname: string = '';

  constructor(private router: Router,
              private cookie: CookieService,
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
      $('#myCarousel').on('slide.bs.carousel', function () {
        interval: 2000
      })
  });
  }

}
