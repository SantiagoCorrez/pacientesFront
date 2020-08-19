import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert';
import * as $ from 'jquery';

/*models*/
import { Recoverypassword } from '../../../models/entrega1/recovery/recoverypassword';

/*Service*/
import { RecoverypasswordService } from '../../../service/entrega1/recoverypassword.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  recoveryArray: Recoverypassword[] = [];
  selectedRecovery: Recoverypassword = new Recoverypassword();
  basepass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*.?&_-])([A-Za-z\d$@$!%*.?&_-]|[^ ]){8,15}$/;
  id = this._router.snapshot.paramMap.get('pass');
  resetdt = this._router.snapshot.paramMap.get('resetdt');
  resetd = this._router.snapshot.paramMap.get('resetd');
  needOldPass = this._router.snapshot.paramMap.get('needOldPass');
  msj: string;
  msjCambio: boolean;
  requiereDato: any;
  icons: string = 'far fa-eye';
  typePass: string = 'password';
  verPassword: boolean = false;
  iconsRe: string = 'far fa-eye';
  typeRePass: string = 'password';
  verRePassword: boolean = false;
  iconsOld: string = 'far fa-eye';
  typeOldPass: string = 'password';
  verOldPassword: boolean = false;
  isNeedOldPass: boolean;

  constructor(private router: Router,
              private recoverypasswordService: RecoverypasswordService,
              private _router: ActivatedRoute,
              private cookie: CookieService,
              private spinner:NgxSpinnerService) { }

  cambiopassword() {
    if (this.selectedRecovery.password === this.selectedRecovery.repeat) {
      if (this.basepass.test(this.selectedRecovery.password)) {
        this.selectedRecovery.tdoc = this.resetdt;
        this.selectedRecovery.doc = this.resetd;
        this.recoveryArray.push(this.selectedRecovery);
        this.spinner.show();
        this.recoverypasswordService.solicitud(this.recoveryArray, this.id).subscribe(
          data => {
            this.spinner.hide();
            if (data.respuesta === 'La contraseña fue actualizada con exito') {
              swal('Proceso exitoso!', 'Hemos realizado el cambio de contraseña!', 'success');
              this.router.navigate(['/']);
            } else {
              swal({
                title: 'Error',
                text: 'No se puedo realizar el cambio de contraseña, por favor intentelo nuevamente',
                icon: 'warning',
              });
            }
          },
          error => {
            this.spinner.hide();
            if(this.isNeedOldPass){
              swal({
                title: 'Error',
                text: 'La contraseña actual ingresada no es la correcta',
                icon: 'warning',
              });
            }else{
              swal({
                title: 'Error',
                text: 'No se puedo realizar el cambio de contraseña, por favor intentelo nuevamente',
                icon: 'warning',
              });
            }
          }
        );
      } else {
        swal({
          title: 'Error',
          text: 'La contraseña no cumple con la política de seguridad.',
          icon: 'warning',
        });
      }
    } else {
      swal({
        title: 'Error',
        text: `La contraseña no coincide, por favor valide.`,
        icon: 'warning',
      });
    }
  }

  requiere() {
    if (!this.requiereDato) {
      swal({
        title: 'Recuerda!',
        text: `Para crear tu contraseña ten en cuenta:
        mínimo 8, máximo 15 caracteres,
        al menos una letra mayúscula, una minúscula,
        un número y un caracter especial (@$!%*.?&_-),
        sin espacios en blanco.`,
        icon: 'info',
      });
      this.requiereDato = true;
    }
  }

  viewOldPass() {
    this.verOldPassword = !this.verOldPassword;
    if (this.verOldPassword) {
      this.iconsOld = 'far fa-eye-slash';
      this.typeOldPass = 'text';
    } else {
      this.iconsOld = 'far fa-eye';
      this.typeOldPass = 'password';
    }
  }

  viewPass() {
    this.verPassword = !this.verPassword;
    if (this.verPassword) {
      this.icons = 'far fa-eye-slash';
      this.typePass = 'text';
    } else {
      this.icons = 'far fa-eye';
      this.typePass = 'password';
    }
  }

  viewRePass() {
    this.verRePassword = !this.verRePassword;
    if (this.verRePassword) {
      this.iconsRe = 'far fa-eye-slash';
      this.typeRePass = 'text';
    } else {
      this.iconsRe = 'far fa-eye';
      this.typeRePass = 'password';
    }
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
    });
    this.isNeedOldPass = this.needOldPass.includes("true");
  }

}
