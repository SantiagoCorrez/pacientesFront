import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceterapService {
  const_Session: any;
  fechaInicial: string;
  fechaFinal: string;
  params: any;
  userSession: any;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(this.userSession));
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getDataProceTerap(parametro, year) {
    this.userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(this.userSession));
    if(parametro === 'Ene-Mar'){
      this.fechaInicial = year+'-01-01';
      this.fechaFinal = year+'-03-31';
    } else if (parametro === 'Abril-Jun'){
      this.fechaInicial = year+'-04-01';
      this.fechaFinal = year+'-06-30';
    } else if (parametro === 'Jul-Sep'){
      this.fechaInicial = year+'-07-01';
      this.fechaFinal = year+'-09-30';
    } else if (parametro === 'Oct-Dic'){
      this.fechaInicial = year+'-10-01';
      this.fechaFinal = year+'-12-31';
    }
    // fechaInicial
    //fechaFinal
    this.params = {
      'fechaInicial': this.fechaInicial,
      'fechaFinal': this.fechaFinal,
      'usr':{
        'pacnumero': this.const_Session.pacnumero
        }
    };
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/Service/proceterap', this.params, { headers: this.headers });
  }

  getDataProceTerapInit() {
    this.userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(this.userSession));
    let fecha = new Date();
    // fechaInicial
    //fechaFinal
    this.params = {
      'fechaInicial': '1900-01-01',
      'fechaFinal': fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDay() ,
      'usr':{
        'pacnumero': this.const_Session.pacnumero
        }
    };
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/PacienteService/proceterap', this.params, { headers: this.headers });
  }

  getPlanAlta(idHisEvento){
    this.params = {
        "idHisPaciente": this.const_Session.pacnumero,
        "idHisEvento":idHisEvento,
        "tipoUsuario":"1"
    }
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/PlanAltaService/planalta', this.params, { headers: this.headers });
  }
  getPlantaAltaMedicamentos(idHisEvento){
    this.params = {
      "idHisPaciente":this.const_Session.pacnumero,
      "idHisEvento":idHisEvento,
    }
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/PlanAltaService/planaltamedicamentos', this.params, { headers: this.headers });
  }
  getPlantaAltaOrdenes(idHisEvento){
    this.params = {
      "idHisPaciente":this.const_Session.pacnumero,
      "idHisEvento":idHisEvento,
      "IdTagEncuentro":"1"
    }
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/PlanAltaService/planaltaordenes', this.params, { headers: this.headers });
  }
  getPlantaAltaRecomendaciones(idHisEvento){
    this.params = {
      "idHisPaciente":this.const_Session.pacnumero,
	    "idHisEvento":idHisEvento	
    }
    return this.http.post<any>( environment.endpoint + '/SrvZonaPrivada/rest/FSFB/PlanAltaService/planaltarecomendaciones', this.params, { headers: this.headers });
  }
}
