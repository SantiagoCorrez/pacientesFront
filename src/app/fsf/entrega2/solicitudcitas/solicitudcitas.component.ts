import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert';
import * as $ from 'jquery';

import { SolicitudcitasService } from '../../../service/entrega2/solicitudcitas.service';
/*models*/
import { Citas } from '../../../models/entrega2/citas';
import { MatDialog } from '@angular/material';
import { PreRecepcionComponent } from '../pre-recepcion/pre-recepcion.component';
import { PaymessagesComponent } from '../messages/paymessages/paymessages.component';
import { ConsultaCitas } from 'src/app/models/entrega2/citas/consulta-citas';
import { ReponseCitas } from 'src/app/models/entrega2/citas/reponse-citas';

@Component({
  selector: 'app-solicitudcitas',
  templateUrl: './solicitudcitas.component.html',
  styleUrls: ['./solicitudcitas.component.css']
})
export class SolicitudcitasComponent implements OnInit {
  datos: any;
  citas: ReponseCitas[];
  result: boolean;
  msj: any;
  citasArray: Citas[] = [];
  selectedCitas: Citas = new Citas();
  pageActual: number = 1;
  page: boolean = false;
  tipoCita:boolean = false;
  viewCard: boolean = false;
  packagePay = [];
  listPay: number;
  demoValor: number;
  durationInSeconds = 5;
  viewPay: boolean;
  buttonsView: boolean = false;
  citaPaga: ConsultaCitas = new ConsultaCitas();
  resultPay: boolean;

  constructor(private solicitudcitasService: SolicitudcitasService,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private cookie: CookieService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  consultCitas(id) {
    this.spinnerService.show();
    if( id !== 3) {
      this.buttonsView = false;
      this.resultPay = false;
      this.solicitudcitasService.getDataCita(id).subscribe(
        data => {
          this.spinnerService.hide();
          if(data.objeto.length !== 0) {
            this.result = false;
            this.viewCard = true;
            this.page = true;
            this.datos = data.objeto;
            if (id === 0) {
              this.tipoCita = false;
            } else {
              this.tipoCita = true;
            }
          } else {
            if(this.selectedCitas.tipoCita === '0'){
              this.result = true;
              this.msj = 'No existen citas anteriores';
            } else {
              this.result = true;
              this.msj = 'No existen citas agendadas';
            }
          }
        },
        error => {
          this.spinnerService.hide();
          this.result = true;
          this.msj = error.error.respuesta;
        }
      );
    } else {
      let user = JSON.parse(atob(this.cookie.get('srvpriv')));
      this.citaPaga.pacId = user.pacnumero;
      this.result = true;
      this.solicitudcitasService.getCitasPorPagar(this.citaPaga).subscribe(data => {
        this.spinnerService.hide();
          if(data.length !== 0) {
            this.resultPay = false;
            this.viewCard = true;
            this.page = true;
            this.citas = data;
            if (id === 0) {
              this.tipoCita = false;
            } else {
              this.tipoCita = true;
            }
          } else {
            if(this.selectedCitas.tipoCita === '0'){
              this.resultPay = true;
              this.msj = 'No existen citas anteriores';
            } else {
              this.resultPay = true;
              this.msj = 'No existen citas agendadas';
            }
          }
        this.spinnerService.hide();
      }, err => {
        this.spinnerService.hide();
        this.result = true;
        this.msj = err.error;
        this.spinnerService.hide();
      })
    }
  }

  ngOnInit() {
  }

  openDialog(){
    let userSession = this.cookie.get('srvpriv');
    const const_Session = JSON.parse(atob(userSession));
    this.dialog.open(PreRecepcionComponent, {
      data: const_Session.pacnumero,
      height: '500px',
      width: '750px',
    });
  }

  activatePay(dataPay, token) {
    this.demoValor = this.demoValor + parseInt(dataPay.costoPaciente);
    this.cookie.set('messages', JSON.stringify(dataPay));
    let index = this.packagePay.find((data, index) => {
      this.listPay = index;
      return data.token === token;
    });
    if (index) {
      this.cookie.set('accion', 'false')
      this.packagePay.splice(this.listPay, 1);
      this.cookie.set('almacenPay', JSON.stringify(this.packagePay));
    } else {
      this.cookie.set('accion', 'true')
      this.packagePay.push({token, dataPay});
      this.cookie.set('almacenPay', JSON.stringify(this.packagePay));
    }
    this.viewPay = true;
    if (this.packagePay.length === 0){
      this.demoValor = 0;
      this.viewPay = false;
      this.cookie.delete('almacenPay');
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PaymessagesComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  sendPay(dataPay) {
    this.packagePay.push(dataPay);
    if (this.packagePay.length === 0) {
      this.cookie.delete('almacenPayOne');
    } else {
      this.cookie.set('almacenPayOne', JSON.stringify(this.packagePay));
      this.router.navigate(['/mispagos']);
    }
    // alert(`Se realizara el pago de la cita de ${ dataPay.descripcionServ.trim() }, por un valor de ${ this.demoValor }`);
  }

  sendPayMassive(){
    // alert(`Se realizara el pago de ${ this.packagePay.length } citas , con un valor de ${ this.demoValor }`);
    this.router.navigate(['/mispagos']);
  }

  gestionCita(miCita) {
    this.buttonsView = true;
    this.datos = [];
    this.datos.push(miCita);
  }

}
