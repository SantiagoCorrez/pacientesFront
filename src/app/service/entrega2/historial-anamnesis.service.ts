import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialAnamnesisService {
  const_Session: any;

  constructor(private http: HttpClient, private cookie: CookieService) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getDataAnamnesis() {
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    this.params = {
        'numHistoriaClinica': this.const_Session.pacnumero
    };
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/PacienteService/consultantecedentes', 
      this.params, { headers: this.headers });
  }
}
