import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DatospacienteService } from 'src/app/service/entrega2/datospaciente.service';

@Component({
  selector: 'app-historiaclinica',
  templateUrl: './historiaclinica.component.html',
  styleUrls: ['./historiaclinica.component.css']
})
export class HistoriaclinicaComponent implements OnInit{
  ngOnInit(): void {
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    this.d = this.cookie.get('sesionData')
    if(this.d !== '') {
      this.session = JSON.parse(atob(this.d));
    }
    if (this.session !== undefined){
      this.dataPac = this.session;
      this.eventEmitter.emit(this.cookie.get('fullname'));
    } else {
      this.datospacienteService.getDataPaciente().subscribe(
        data =>{
          this.dataPac = data;
          if(this.dataPac.objeto.sexo === 'F') {
            this.dataPac.objeto.sexo = 'Femenino';
          } else {
            this.dataPac.objeto.sexo = 'Masculino';
          }
          this.cookie.set('sesionData', btoa(JSON.stringify(this.dataPac)));
          this.cookie.set('fullname', this.dataPac.objeto.nombres + ' ' +
          this.dataPac.objeto.primerApellido + ' ' + this.dataPac.objeto.segundoApellido);
          this.eventEmitter.emit(this.dataPac.objeto.nombres + ' ' +
           this.dataPac.objeto.primerApellido + ' ' + this.dataPac.objeto.segundoApellido);
        },
        error => {
        });
    }
  }
  const_Session: any;
  dataPac: any;
  session: string;
  d: string;
  @Output("fullname")
  private eventEmitter:EventEmitter<String> = new EventEmitter();

  constructor(private router: Router,
              private cookie: CookieService,
              private datospacienteService: DatospacienteService) {
  }

}
