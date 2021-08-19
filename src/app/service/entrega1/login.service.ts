import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
  private cookie: CookieService) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  getLogin(userData) {
    this.params = {
      'uid': userData[0].tipodocumento + userData[0].documento,
      'password': userData[0].password
    };
    let newh=new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    return this.http.post( environment.endpoint + '/SrvZonaPrivada/rest/Service/auth', btoa(JSON.stringify(this.params)),{headers:newh,responseType: 'json'});
  }

  logout() {
    let userSession = this.cookie.get('srvpriv');
    const const_Session = JSON.parse(atob(userSession));
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/Service/logout', const_Session.token);
  }
}
