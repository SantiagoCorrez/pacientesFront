import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlergiasService {
  const_Session: any;
  constructor(private http: HttpClient, private cookie: CookieService) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getDataAlergias() {
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    this.params = {
        'numHistoriaClinica': this.const_Session.pacnumero,
        'tipoAntecedente': 'G'
    };
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/PacienteService/consultantecedentesxt',
      this.params, { headers: this.headers });
  }
}
