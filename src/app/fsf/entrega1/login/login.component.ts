import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert';
import * as $ from 'jquery';


/*models*/
import { Login } from '../../../models/entrega1/login/login';
import { Auth } from '../../../models/auth/auth';

/*Service*/
import { LoginService } from '../../../service/entrega1/login.service';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginArray: Login[] = [];
  selectedLogin: Login = new Login();
  redirect = this._router.snapshot.paramMap.get('redirect');
  basepass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])([A-Za-z\d$@$!%*?&_-]|[^ ]){8,15}$/;
  icons: string = 'far fa-eye';
  typePass: string = 'password';
  verPassword: boolean = false;
  validacion1: boolean;
  validacion2: boolean;
  validacion3: boolean;
  msjError: boolean;
  msj: string;
  entero = /^\d+$/;
  numero = /^[0-9]+$/;
  documentos = /^[A-Za-z0-9\s]+$/;
  activateButton: boolean;
  translateTerm = 'APROVED';

  constructor(private authLogin: AuthService,
    private router: Router,
    private _router: ActivatedRoute,
    private loginService: LoginService,
    private cookie: CookieService) {
    this.cookie.delete('srvpriv')
    this.cookie.delete('sesionData')
    sessionStorage.removeItem('login')
    if (this.cookie.check('tdoc')) {
      const tdd = atob(this.cookie.get('tdoc'));
      this.selectedLogin.tipodocumento = parseInt(tdd);
      this.selectedLogin.documento = atob(this.cookie.get('doc'));
      this.selectedLogin.password = atob(this.cookie.get('pwd'));
    }
  }

  remenberMe() {
    if (this.cookie.check('tdoc')) {
      this.cookie.delete('tdoc');
      this.cookie.delete('doc');
      this.cookie.delete('pwd');
      this.selectedLogin = new Login();
    } else {
      const td = btoa(this.selectedLogin.tipodocumento.toString());
      this.cookie.set('tdoc', td);
      this.cookie.set('doc', btoa(this.selectedLogin.documento));
      this.cookie.set('pwd', btoa(this.selectedLogin.password));
    }
  }

  validador() {
    this.validacion1 = false;
    this.validacion2 = false;
    this.validacion3 = false;
  }

  resolved(captchaResponse: string) {
    if(captchaResponse !== undefined){
      this.activateButton = true;
    }
  }

  login() {
    if (this.selectedLogin.tipodocumento === undefined) {
      this.validacion1 = true;
    }
    if (this.selectedLogin.documento === undefined ||
        !this.documentos.test(this.selectedLogin.documento)) {
          this.validacion2 = true;
    }
    if (this.selectedLogin.password === undefined) {
      this.validacion3 = true;
    }

    /*
      Minimo 8 caracteres
      Maximo 15
      Al menos una letra mayúscula
      Al menos una letra minucula
      Al menos un dígito
      No espacios en blanco
      Al menos 1 caracter especial
    */
    /*if (this.basepass.test(this.selectedLogin.password)) {*/

    if(this.activateButton){
      if (!this.validacion1 && !this.validacion2 && !this.validacion3) {
        this.loginArray.push(this.selectedLogin);
        this.loginService.getLogin(this.loginArray).subscribe(
          (data:any) => {
            if (data.userValido === true) {
              let u: Auth = { login: 'true' };
              this.authLogin.setUserLoggetIn(u);
              this.cookie.set('srvpriv', btoa(JSON.stringify(data)));
              if (this.redirect === 'citasredirect') {
                this.router.navigate(['/citas']);
              } else if (this.redirect === 'examenesredirect') {
                this.router.navigate(['/examenes']);
              } else {
                this.router.navigate(['/historial']);
              }
            } else if (data.respuesta === 'Credenciales Fallidas') {
              this.msjError = true;
              this.msj = 'Usuario y/o contraseña no son correctos.';
            }
          },
          error => {
            this.msjError = true;
            this.msj = 'Usuario y/o contraseña no son correctos.';
          }
        );
      }
    } else {
      swal({
        title: 'Error',
        text: 'Por favor complete el captcha para poder continuar.',
        icon: 'warning',
      });
    }
    

    /*} else {
      swal({
        title: 'Tenemos un inconveniente!',
        text: `La contraseña no cumple con los suiguientes requisitos:
        Minimo 8 caracteres Maximo 15,
        Al menos una letra mayúscula,
        Al menos una letra minucula,
        Al menos un dígito,
        No espacios en blanco,
        Al menos 1 caracter especial`,
        icon: 'info',
      });
    }*/
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
    if (this.cookie.check('tdoc')) {
      document.getElementById('customCheck1').setAttribute('checked', 'true');
    }
    /*Mostrar u ocultar la contraseña*/
    let inputPass, clickLink, count;

    inputPass = document.getElementById('Contraseña');
    clickLink = document.getElementById('view');
    count = false;

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

}
