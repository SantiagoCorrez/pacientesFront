import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaPagosService {
  const_Session: any;

  constructor(private http: HttpClient, private cookie: CookieService) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getPagos() {
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    this.params = {
        'noPacPaciente': this.const_Session.pacnumero
    };
    return this.http.post<any>(environment.endpointCA + '/CentralAutorizav2/rest/PagosService/listaPagos',
      this.params, { headers: this.headers });
  }
}
