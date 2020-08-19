import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-planaltafrom',
  templateUrl: './planaltafrom.component.html',
  styleUrls: ['./planaltafrom.component.css']
})
export class PlanaltafromComponent implements OnInit {
  html: any;
  constructor(private cookie: CookieService) {
    this.html = this.cookie.get('html')
    
   }

  ngOnInit() {
  }

}
