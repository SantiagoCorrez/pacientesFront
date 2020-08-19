import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { MatSnackBar } from '@angular/material';
import { PaymessagesComponent } from '../messages/paymessages/paymessages.component';
import { CitaPay } from 'src/app/models/entrega2/pagos/cita-pay';
import { SolicitudcitasService } from 'src/app/service/entrega2/solicitudcitas.service';
import { ConsultaCitas } from 'src/app/models/entrega2/citas/consulta-citas';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mispagos',
  templateUrl: './mispagos.component.html',
  styleUrls: ['./mispagos.component.css']
})
export class MispagosComponent implements OnInit {
  datos = [];
  pay = [];
  demoValor: number = 0;
  packagePay = [];
  listPay: any;
  viewPay: boolean;
  listaDePagos: CitaPay = new CitaPay();
  durationInSeconds = 5;
  pageActual: number = 1;
  page: boolean = true;
  almacen: CitaPay[] = [];
  citasLista = [];
  citaPaga: ConsultaCitas = new ConsultaCitas();
  mensaje: string;
  estado: boolean;
  isChecked: boolean;

  constructor(private cookie: CookieService,
              private spinnerService: NgxSpinnerService,
              private solicitudcitasService: SolicitudcitasService,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.cookie.delete('apagar')
    this.spinnerService.show();
    if (this.cookie.check('almacenPay')) {
      this.spinnerService.hide();
      this.pay = JSON.parse(this.cookie.get('almacenPay'));
      for (let listaPagos of this.pay) {
        this.datos.push(listaPagos.dataPay);
      }
    } else if (this.cookie.check('almacenPayOne')) {
      this.pay = JSON.parse(this.cookie.get('almacenPayOne'));
      this.datos = this.pay;
      this.spinnerService.hide();
    } else {
    //   swal({
    //     title: 'Información',
    //     text: 'No tiene citas para pagar.',
    //     icon: 'info',
    //   });
    //   this.router.navigate(['/historial']);

    let user = JSON.parse(atob(this.cookie.get('srvpriv')));
    this.citaPaga.pacId = user.usuario;
    this.citaPaga.tipoDcumento = user.tipoDoc;
    this.solicitudcitasService.getCitasPorPagar(this.citaPaga).subscribe(data => {
      this.spinnerService.hide();
        if(data.length !== 0) {
          this.page = true;
          this.datos = data;
        } else {
          this.estado = true;
          this.mensaje = 'No tiene citas por pagar';
        }
      // this.spinnerService.hide();
    }, err => {
      this.estado = true;
      this.mensaje = 'No tiene citas por pagar';
      this.spinnerService.hide();
    })
    }
  }


  activatePay(dataPay, token, event) {
    if(event.srcElement.checked){
      this.demoValor = this.demoValor + parseInt(dataPay.costoPaciente);
      this.citasLista.push(dataPay)
      this.cookie.set('resumenPagos', JSON.stringify(this.citasLista));
      this.listaDePagos.idCita = dataPay.idCita;
      this.listaDePagos.nombreCita = dataPay.descripcion;
      this.listaDePagos.valorCita = dataPay.costoPaciente;
      this.almacen.push(this.listaDePagos)
      this.cookie.set('apagar', JSON.stringify(this.almacen));
      if(this.almacen.length === JSON.parse(this.cookie.get('apagar')).length){
        console.log('ok')
      }else {
        console.log('No')
      }
      this.listaDePagos = new CitaPay();
      this.viewPay = true;
    } else {
      this.demoValor = this.demoValor - parseInt(dataPay.costoPaciente);
      this.citasLista.splice(token, 1);
      this.cookie.set('resumenPagos', JSON.stringify(this.citasLista));
      this.almacen.splice(token, 1);
      this.cookie.set('apagar', JSON.stringify(this.almacen));
      if (this.demoValor === 0) {
        this.almacen = [];
        this.cookie.delete('apagar')
        if (this.cookie.check('apagar')) {
          this.cookie.delete('apagar')
        }
        this.viewPay = false;
      }
    }
    
  }

  sendPayMassive() {
    this.router.navigate(['resumenpay']);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PaymessagesComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
