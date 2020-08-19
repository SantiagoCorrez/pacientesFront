import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultexamenService {
  datos: string;
  user: string;
  const_Session: any;
  fechaInicial: string;
  fechaFinal: string;

  constructor(private http: HttpClient, private cookie: CookieService) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getPDF(id){
    this.params = {
      'numOrden': id
    };
    return this.http.post<any>(
       environment.endpoint + '/SrvZonaPrivada/rest/FSFB/ExamenService/consultexamenespdf',
      this.params, { headers: this.headers });
  }

  getDataExa(day, month, year){
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    let mes: any = month - 3;
    let anho = year;
    if (month === 1) {
      mes = 11;
      anho = year - 1;
    }
    if (month === 2) {
      mes = 12;
      anho = year - 1;
    }
    if (month <= 9) {
      month = '0' + month;
    }
    if (mes <= 9) {
      mes = '0' + mes;
    }
    if (day <= 9) {
      day = '0' + day;
    }
    this.params = {
      'usr': {
        'pacnumero': this.const_Session.pacnumero
        },
        'fechaInicial': '01-' + mes + '-' + anho,
        'fechaFinal': day + '-' + month + '-' + year
    };
    return this.http.post<any>(
       environment.endpoint + '/SrvZonaPrivada/rest/FSFB/ExamenService/resultexamen',
      this.params, { headers: this.headers });
  }


  getDataResultExamen(parametro, year) {
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    if(parametro === 'Ene-Mar'){
      this.fechaInicial = '01-01-' + year;
      this.fechaFinal = '31-03-' + year;
    } else if (parametro === 'Abril-Jun'){
      this.fechaInicial = '01-04-' + year;
      this.fechaFinal = '30-06-' + year;
    } else if (parametro === 'Jul-Sep'){
      this.fechaInicial = '01-07-' + year;
      this.fechaFinal = '30-09-' + year;
    } else if (parametro === 'Oct-Dic'){
      this.fechaInicial = '01-10-' + year;
      this.fechaFinal = '31-12-' + year;
    }

    this.params = {
      'usr':{
        'pacnumero': this.const_Session.pacnumero
        },
        'fechaInicial': this.fechaInicial,
        'fechaFinal': this.fechaFinal
    };
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/ExamenService/resultexamen', this.params, { headers: this.headers });
  }

  getExamenesVarios(codPrestacion, tipoFormulario, numFormulario){
    this.params = {
      'pacNum':this.const_Session.pacnumero,
      'codPrestacion': codPrestacion,
      'tipoFormulario':tipoFormulario,
      'numFormulario':numFormulario,
      'userName':"Lilia Lilia"
    }
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/CitasService/consultexamenvarios', this.params, { headers: this.headers });
  }

  getDataPDF(id){
    this.headers.set('Accept', 'application/pdf');
    this.params = {
      "codOrdenAlterna": id
    }
    return this.http.post( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/ExamenService/consultexamenespdf', this.params, { headers: this.headers, responseType: 'blob' });
  }
}