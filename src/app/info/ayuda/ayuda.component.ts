import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
  nav: boolean;

  constructor(private cookie: CookieService) { }

  ngOnInit() {
    this.cookie.check('sesionData') ? this.nav = true : this.nav = false;
  }

}
