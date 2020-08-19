import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert';
import * as $ from 'jquery';

/*models*/
import { Recovery } from '../../../models/entrega1/recovery/recovery';

/*Service*/
import { RecoveryService } from '../../../service/entrega1/recovery.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recoveryemail',
  templateUrl: './recoveryemail.component.html',
  styleUrls: ['./recoveryemail.component.css']
})
export class RecoveryemailComponent implements OnInit {
  recoveryArray: Recovery[] = [];
  selectedRecovery: Recovery = new Recovery();
  msjRecovery: boolean;
  msj: string;
  msjRecoveryError: boolean;
  valTipoDoc: boolean;
  valMail: boolean;
  valDoc: boolean;
  documentos = /^[A-Za-z0-9\s]+$/;

  constructor(private router: Router,
              private recoveryService: RecoveryService,
              private cookie: CookieService,
              private spinner:NgxSpinnerService) { }

  solicitud() {
    if (this.validacion(this.selectedRecovery)) {
      this.recoveryArray.push(this.selectedRecovery);
      this.spinner.show();
      this.recoveryService.solicitud(this.recoveryArray).subscribe(
        data => {
          this.spinner.hide();
          if (data.respuesta === 'La contraseña fue actualizada con exito') {
            swal('Proceso exitoso!',
            'Hemos enviado un mensaje a su correo por favor revíselo para poder continuar con el proceso.', 'success');
            this.router.navigate(['/']);
          } else {
            this.spinner.hide();
            this.msjRecoveryError = true;
            this.msj = data.respuesta;
            swal({
              title: 'Error',
              text: data.respuesta,
              icon: 'warning',
            });
          }
        },
        error => {
          this.spinner.hide();
          this.msjRecoveryError = true;
          this.msj = 'Por favor valide los datos ingresados.';
          swal({
            title: 'Error',
            text: 'No se encontró información relacionada con los datos ingresados, comuníquese al correo soporte.portal@fsfb.org.co',
            icon: 'warning',
          });
        }
      );
    }
  }

  validacion(datos) {
    let valor: boolean = true;
    if (datos.tipodoc === undefined) {
      this.valTipoDoc = true;
      valor = false;
    }
    if (datos.documento === undefined ||
        !this.documentos.test(datos.documento)) {
      this.valDoc = true;
      valor = false;
    }
    if (datos.correo === undefined) {
      this.valMail = true;
      valor = false;
    }
    if (valor) {
      return true
    } else {
      return false;
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
  }

}
