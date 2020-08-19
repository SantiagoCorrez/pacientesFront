import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent implements OnInit {
  nav: boolean;

  constructor(private cookie: CookieService) { }

  ngOnInit() {
    this.cookie.check('sesionData') ? this.nav = true : this.nav = false;
  }

}
