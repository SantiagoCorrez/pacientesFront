import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoverypasswordService{
  
  objUser: any;
  constructor(private http: HttpClient, private cookie: CookieService) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  solicitud(userData, id) {
    this.params = {
      'uid': userData[0].tdoc + userData[0].doc,
      'password': id,
      'old_password': userData[0].old_password,
      'new_password': userData[0].password
    };
    return this.http.post<any>( environment.endpoint +  '/SrvZonaPrivada/rest/Service/confrestpwd', this.params, { headers: this.headers });
  }
}
