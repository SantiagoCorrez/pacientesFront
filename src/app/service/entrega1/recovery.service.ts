import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  constructor(private http: HttpClient) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  solicitud(userData) {
    this.params = {
      'uid': userData[0].tipodoc + userData[0].documento,
      'tipoDoc': userData[0].tipodoc,
      'usuario': userData[0].documento,
      'mail': userData[0].correo
    };
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/Service/restablecerpwd', this.params, { headers: this.headers });
  }

  solicitud2(userData) {
    this.params = {
      'uid': userData[0].tipodoc + userData[0].documento,
      'mail': userData[0].correo
    };
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/Service/restablecerpwd2', this.params, { headers: this.headers });
  }

  getTypeDocument(idType){
    if (idType === '2') {
      return 'RC';
    } else if (idType === '3') {
      return 'TI';
    } else if (idType === '4') {
      return 'CC';
    }  else if (idType === '5') {
      return 'CE';
    }  else if (idType === '6') {
      return 'NI';
    }  else if (idType === 'M') {
      return 'MS';
    }  else if (idType === 'A') {
      return 'AS';
    }  else if (idType === 'D') {
      return 'CD';
    }  else if (idType === 'S') {
      return 'SC';
    }  else if (idType === 'N') {
      return 'NU';
    }  else if (idType === 'P') {
      return 'PA';
    }
  }
}
