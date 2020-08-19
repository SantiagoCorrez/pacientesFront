import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ListaPagosService } from 'src/app/service/entrega2/pagos/lista-pagos.service';
import { AplastarService } from 'src/app/service/colapse/aplastar.service';
import { AplastarpatService } from 'src/app/service/colapse/aplastarpat.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert';

export interface cita {
  codigoLugar: String;
  descripcionServ: String;
  fechaCita: String;
  fechaFormateada: String;
  indRecepcionado: String;
  nombreCentroAten: String;
  nombreProf: String;
}

@Component({
  selector: 'app-mihistorialpagos',
  templateUrl: './mihistorialpagos.component.html',
  styleUrls: ['./mihistorialpagos.component.css']
})
export class MihistorialpagosComponent implements OnInit {
  datos = [];
  dataSource: cita[];
  pageActual: number = 1;
  page: boolean = false;
  estado: boolean = false;
  mensaje = 'No encontramos resultados para su consulta';
  constructor(private ListaPagosService: ListaPagosService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private aplastar: AplastarService,
    private aplastarPat: AplastarpatService,
    private cookie: CookieService) {
    this.spinner.show();
  }

  ngOnInit() {
    this.spinner.show();
    this.ListaPagosService.getPagos().subscribe(
      data => {
        this.datos = data.objeto;
        if(this.datos.length >= 4){
          this.page = true;
        }
        this.spinner.hide();
      },
      error => {
        this.estado = true;
        swal('Informacón', 'No tiene historial de pagos' + error, 'info');
        this.spinner.hide();
      })
  }

}
