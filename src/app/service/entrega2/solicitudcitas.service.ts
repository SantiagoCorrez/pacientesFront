import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ReponseCitas } from 'src/app/models/entrega2/citas/reponse-citas';

@Injectable({
  providedIn: 'root'
})
export class SolicitudcitasService {
  const_Session: any;

  constructor(private http: HttpClient, private cookie: CookieService) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getDataCita(idFiltro) {
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    this.params = {
      'numHistoriaClinica' : this.const_Session.pacnumero,
      'idFiltroFecha' : idFiltro
        
    };
    return this.http.post<any>( environment.endpoint +
      '/SrvZonaPrivada/rest/FSFB/CitasService/consultcitasagendadas', this.params, { headers: this.headers });
  }

  getCitasPorPagar(data) {
    return this.http.post<ReponseCitas[]>(environment.endpointCA + '/CentralAutorizav2/rest/Citas/CCitasParaPagar',
    data , { headers: this.headers });
  }

}
