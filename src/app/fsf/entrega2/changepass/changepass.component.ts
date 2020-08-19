import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Recovery } from 'src/app/models/entrega1/recovery/recovery';
import swal from 'sweetalert'
import { RecoveryService } from 'src/app/service/entrega1/recovery.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html'
})
export class ChangePassComponent {

  emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const_Session: any;

  constructor(private recoveryService: RecoveryService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cookie: CookieService) {
  }

  changePass() {
    let recoveryArray: Recovery[] = [];
    let d = this.cookie.get('sesionData');
    let session = JSON.parse(atob(d));
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    let selectedRecovery: Recovery = new Recovery();
    selectedRecovery.tipodoc = this.recoveryService.getTypeDocument(session.objeto.tipoDocId);
    selectedRecovery.documento = session.objeto.numDocId;
    selectedRecovery.correo = this.const_Session.mail;
    if (selectedRecovery.correo != null && selectedRecovery.correo.length > 0) {
      recoveryArray.push(selectedRecovery);
      this.spinner.show();
      this.recoveryService.solicitud2(recoveryArray).subscribe(
        data => {
          this.spinner.hide();
          if (data.respuesta === 'La contraseña fue actualizada con exito') {
            this.router.navigate(['/recoverypassword/',
            data.objeto, selectedRecovery.tipodoc, selectedRecovery.documento, "true"]);
          } else {
            swal({
              title: 'Error',
              text: data.respuesta,
              icon: 'warning',
            });
          }
        },
        error => {
          this.spinner.hide();
          swal({
            title: 'Error',
            text: 'No se encontró información relacionada con los datos ingresados, comuníquese al correo soporte.portal@fsfb.org.co',
            icon: 'warning',
          });
        }
      );
    }else{
      swal({
        title: 'Error',
        text: 'No se encontró un correo en la información del paciente, comuníquese al correo soporte.portal@fsfb.org.co',
        icon: 'warning',
      });
    }
  }

}
