import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-paymessages',
  templateUrl: './paymessages.component.html',
  styleUrls: ['./paymessages.component.css']
})
export class PaymessagesComponent implements OnInit {
  payMessages: any;
  accion: string;

  constructor(private cookie: CookieService) {
    this.accion = this.cookie.get('accion')
    this.payMessages = JSON.parse(this.cookie.get('messages'));
  }

  ngOnInit() {
  }

}
