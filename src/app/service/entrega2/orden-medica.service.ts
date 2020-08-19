import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrdenMedica } from 'src/app/models/entrega2/OrdenMedica';

@Injectable({
  providedIn: 'root'
})
export class OrdenMedicaService {

  constructor(private http: HttpClient) { }

  getOrdenMedica(pacPacRut: string) {
    return this.http.get<any>( environment.endpointAPI + '/fsfb-api/OrdenMedica/' + pacPacRut);
  }

  createOrdenMedica(ordenMedica:OrdenMedica) {
    return this.http.post<any>( environment.endpointAPI + '/fsfb-api/OrdenMedica', ordenMedica);
  }

}
