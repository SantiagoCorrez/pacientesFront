import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  paterno: any;
  fecha: any;
  TDocument: string;

  constructor(private http: HttpClient) {
  }
  params;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  registro(userData) {

    if (userData[0].tipodocumento === '2') {
      this.TDocument = 'RC';
    } else if (userData[0].tipodocumento === '3') {
      this.TDocument = 'TI';
    } else if (userData[0].tipodocumento === '4') {
      this.TDocument = 'CC';
    }  else if (userData[0].tipodocumento === '5') {
      this.TDocument = 'CE';
    }  else if (userData[0].tipodocumento === '6') {
      this.TDocument = 'NI';
    }  else if (userData[0].tipodocumento === 'M') {
      this.TDocument = 'MS';
    }  else if (userData[0].tipodocumento === 'A') {
      this.TDocument = 'AS';
    }  else if (userData[0].tipodocumento === 'D') {
      this.TDocument = 'CD';
    }  else if (userData[0].tipodocumento === 'S') {
      this.TDocument = 'SC';
    }  else if (userData[0].tipodocumento === 'N') {
      this.TDocument = 'NU';
    }  else if (userData[0].tipodocumento === 'P') {
      this.TDocument = 'PA';
    }
    
    if( userData[0].apellidoMaterno === undefined ){
      userData[0].apellidoMaterno = "";
    }
    this.fecha = userData[0].date.split('-'); 
      this.params = {
        'uid': this.TDocument + userData[0].documento,
        'usuario': userData[0].documento,
        'password': userData[0].password,
        'new_password': userData[0].password,
        'userValido': true,
        'mail': userData[0].email,
        'cn': userData[0].nombre,
        'sn': userData[0].apellidoMaterno,
        'givenName': userData[0].nombre,
        'tipoDoc': userData[0].tipodocumento,
        'apellidoPaterno': userData[0].apellidoPaterno,
        // 'telNumber': userData[0].celular,
        'sexo': userData[0].genero,
        'fechaNacimiento': this.fecha[2] + '-' + this.fecha[1] + '-' + this.fecha[0]
      };
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/Service/crear', this.params, { headers: this.headers });
  }
}
