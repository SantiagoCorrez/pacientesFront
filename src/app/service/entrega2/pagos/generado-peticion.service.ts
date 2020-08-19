import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneradoPeticionService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getMyIp(){
    var json = 'http://jsonip.com';
    return this.http.get<{ip:string}>(json);
  }

  getUrlPay(data) {
    return this.http.post<any>(environment.endpointCA + '/CentralAutoriza/rest/PagosService/guardarTransaccion', data);
  }

  getStatePay(id) {
    return this.http.get<any>(environment.endpointCA + '/CentralAutoriza/rest/PagosService/resultadoTransaccion/' + id);
  }

  getPacienteHIS(data) {
    return this.http.post<any>(environment.endpointCA + '/CentralAutoriza/rest/pacientes/consultaPaciente', data);
  }

}
