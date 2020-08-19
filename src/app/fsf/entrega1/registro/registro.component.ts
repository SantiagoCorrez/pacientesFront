import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert';
import * as $ from 'jquery';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

/*models*/
import { Registro } from '../../../models/entrega1/registro/registro';

/*Service*/
import { RegistroService } from '../../../service/entrega1/registro.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroArray: Registro[] = [];
  selectedRegistro: Registro = new Registro();
  basepass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])([A-Za-z\d$@$!%*?&_-]|[^ ]){8,15}$/;
  entero = /^\d+$/;
  numero = /^[0-9]+$/;
  letras = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  // tslint:disable-next-line:max-line-length
  emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  validacion1: boolean;
  validacion2: boolean;
  validacion3: boolean;
  validacion4: boolean;
  validacion5: boolean;
  validacion6: boolean;
  validacion7: boolean;
  validacion8: boolean;
  validacion9: boolean;
  msj: boolean;
  validacion10: boolean;
  requiereDato: boolean;
  fechaMax;
  msjDate: string;
  msjDoc: string;
  msjPhone: string;
  requestDoc: boolean;
  requestPhone: boolean;
  guardar: boolean = true;
  pssReferencia: boolean;
  equalPss: boolean;
  @ViewChild('password') nameField: ElementRef;
  @ViewChild('mail') email: ElementRef;
  validacionLetras: boolean;
  validacionLetrasNane: boolean;
  fecha = new Date();
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    minYear: 1900,
    maxYear: this.fecha.getFullYear()
  };
  model: any = { date: { year: 2018, month: 10, day: 9 } };
  noesnumero: boolean;
  cantidad: number = 0;
  documentos = /^[A-Za-z0-9\s]+$/;
  icons: string = 'far fa-eye';
  typePass: string = 'password';
  verPassword: boolean = false;
  iconsRe: string = 'far fa-eye';
  typeRePass: string = 'password';
  verRePassword: boolean = false;

  constructor(private router: Router,
              private spinnerService: NgxSpinnerService,
              private registroService: RegistroService) { }
  /**
   * funcion diseñada para el registro
   */
  registro() {
    if (this.cantidad === 0) {
      if (this.selectedRegistro.date !== undefined) {
        this.selectedRegistro.date = this.selectedRegistro.date.formatted;
        this.cantidad++;
      }
    }
    if (this.validador(this.selectedRegistro) && this.requestDoc && this.requestPhone) {
        this.guardar = false;
        this.registroArray.push(this.selectedRegistro);
        this.spinnerService.show();
          
        this.registroService.registro(this.registroArray).subscribe(
          data => {
            this.selectedRegistro = new Registro();
            swal({
              title: 'Exitoso',
              text: `Usuario registrado correctamente.`,
              icon: 'success',
            });
            this.router.navigate(['/']);
            setTimeout(() => {
              this.spinnerService.hide();
            }, 1000);
          },
          error => {
            this.guardar = true;
              // this.msj = true;
              if (error.status === 400) {
                swal({
                  title: 'Error',
                  text: error.error.respuesta,
                  icon: 'warning',
                });
              } else {
                swal({
                  title: 'Error',
                  text: `Sus datos ingresados no coinciden con los datos registrados en nuestra institución.
                  Por motivos de seguridad  para poderse registrar en el portal debe ingresar
                  el mismo correo electrónico que tenemos registrado en nuestra base de datos.`,
                  icon: 'warning',
                });
              }
              setTimeout(() => {
                this.spinnerService.hide();
              }, 1000);
          }
        );
    } else {
      if (!this.requestDoc) {
        swal(`Por favor valide los campos ingresados.
            Documento`);
      }
      if (!this.requestPhone) {
        swal(`Por favor valide los campos ingresados.
              Celular`);
      }
      if (!this.requestDoc &&  !this.requestPhone) {
        swal(`Por favor valide los campos ingresados.
              Documento y Celular`);
      }
      if (this.equalPss) {
        swal('La contraseña no coincide');
      }
      if (this.pssReferencia) {
        swal({
          title: '¡Recuerda!',
          text: `Para crear tu contraseña ten en cuenta:
                  mínimo 8, máximo 15 caracteres,
                  al menos una letra mayúscula, una minúscula,
                  un número y un caracter especial  (@$!%*?&_-),
                  sin espacios en blanco.`,
          icon: 'info',
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }

  /**
   * se limpian los errores mostrados en pantalla
   */

  validacion() {
    this.validacion1 = false;
    this.validacion2 = false;
    this.validacion3 = false;
    this.validacion4 = false;
    this.validacion5 = false;
    this.validacion6 = false;
    this.validacion7 = false;
    this.validacion8 = false;
    this.validacion9 = false;
    this.validacion10 = false;
    this.validacionLetras = false;
    this.validacionLetrasNane = false;
    // this.requestPhone = false;
    // this.requestDoc = false;
    this.equalPss = false;
    this.pssReferencia = false;
  }

  /*
  * validador(datos) funcion creada para validar los campos cargados al dar click en el boton guardar en la pantalla
    se requiere traer los datos de los inputs
  */

  validador(datos) {
    this.validacion();
    let count = 0;
    if (!this.letras.test(datos.nombre) ||
        !this.letras.test(datos.apellidoPaterno)){
          this.validacionLetras = true;
          count++;
    }
    if (datos.nombre === undefined) {
      this.validacion1 = true;
      count++;
    }
    if (datos.apellidoPaterno === undefined) {
      this.validacion2 = true;
      count++;
    }
    if (datos.email === undefined ||
        !this.emailValid.test(datos.email)) {
      this.validacion3 = true;
      count++;
    }
    
    this.validatePhone();
    if (!this.numero.test(datos.celular) ||
        !this.entero.test(datos.celular)) {
      if (datos.celular !== undefined) {
        this.validacion4 = true;
        this.msjPhone = 'El numero de telefono/celular debe ser un numero de telefono valido!';
        count++;
      }
    }
    if (datos.password === undefined) {
      this.validacion5 = true;
      count++;
    }
    if (datos.repassword === undefined) {
      this.validacion6 = true;
      count++;
    }
    if ( datos.tipodocumento === undefined ) {
      this.validacion7 = true;
      count++;
    }
    if (datos.documento === undefined ||
        !this.documentos.test(datos.documento)) {
          this.validacion8 = true;
          this.msjDoc = 'Numero de documento ingresado no es valido.';
          count++;
    }
    if (datos.genero === undefined) {
      this.validacion9 = true;
      count++;
    }
    if (datos.date === undefined) {
      this.validacion10 = true;
      this.msjDate = 'Su fecha de nacimiento es un campo obligatorio!';
      count++;
    }
    if (!this.basepass.test(this.selectedRegistro.password)) {
      this.pssReferencia = true;
      count++;
    }
    if (this.selectedRegistro.password !== this.selectedRegistro.repassword) {
      this.equalPss = true;
      count++;
    }
    if (count !== 0) {
      return false;
    } else {
      return true;
    }
  }

  cambiar(evento) {
    if (evento.key === 'Tab') {
      this.email.nativeElement.focus()
    }
  }

  /* Validación fecha menor a la actual */
  validDate(evento){
    if (evento.key === 'Tab') {
      const f = new Date();
      this.fechaMax = this.selectedRegistro.date.formatted.split('-');
      if( this.fechaMax[0].length !== 4 ){
        this.validacion10 = true;
        this.msjDate = 'Fecha ingresada mayor a la fecha actual';
        this.selectedRegistro.date = '';
      }
      if (f.getFullYear() < this.fechaMax[0] ) {
        this.validacion10 = true;
        this.msjDate = 'Fecha ingresada mayor a la fecha actual';
        this.selectedRegistro.date = '';
      } else {
        if (f.getFullYear() > this.fechaMax[0]) {
        } else {
          if (f.getFullYear() == this.fechaMax[0]) {
            if ((f.getMonth() + 1) >= this.fechaMax[1]) {
              if (f.getDate() >= this.fechaMax[2]) {
              } else {
                this.validacion10 = true;
                this.msjDate = 'Fecha ingresada mayor a la fecha actual';
                this.selectedRegistro.date = '';
              }
            } else {
              this.validacion10 = true;
              this.msjDate = 'Fecha ingresada mayor a la fecha actual';
              this.selectedRegistro.date = '';
            }
          }
        }
      }
    }
  }

  validDateMouse() {
    const f = new Date();
    this.fechaMax = this.selectedRegistro.date.formatted.split('-');
    if ( this.fechaMax[0].length !== 4 ) {
      this.validacion10 = true;
      this.msjDate = 'Fecha ingresada mayor a la fecha actual';
      this.selectedRegistro.date = '';
    }
    if (f.getFullYear() < this.fechaMax[0] ) {
      this.validacion10 = true;
      this.msjDate = 'Fecha ingresada mayor a la fecha actual';
      this.selectedRegistro.date = '';
    } else {
      if (f.getFullYear() > this.fechaMax[0]) {
      } else {
        if (f.getFullYear() == this.fechaMax[0]){
          if ((f.getMonth()+1) >= this.fechaMax[1]) {
            if(f.getDate() >= this.fechaMax[2]){
            } else {
              this.validacion10 = true;
              this.msjDate = 'Fecha ingresada mayor a la fecha actual';
              this.selectedRegistro.date = '';
            }
          } else {
            this.validacion10 = true;
            this.msjDate = 'Fecha ingresada mayor a la fecha actual';
            this.selectedRegistro.date = '';
          }
        }
      }
    }
  }

  /* Validacion cantidad  de caracteres */
  validateDoc() {
    let cantidadCaracteres = this.selectedRegistro.documento.toString().length;
    if (cantidadCaracteres >= 4){
      this.requestDoc = true;
    } else {
      this.validacion8 = true;
      this.msjDoc = 'El documento debe tener más de 4 digitos';
      this.requestDoc = false;
    }
  }

  /* Validacion cantidad de caracteres telefono */
  validatePhone() {
    let cantidadPhone = this.selectedRegistro.celular.toString().length;

    if (cantidadPhone === 7 ||
        cantidadPhone === 10) {
          this.requestPhone = true;
    } else {
      this.validacion4 = true;
      this.msjPhone = 'El valor ingresado no corresponde a un telefono o celular.';
      this.requestPhone = false;

    }
  }

  validPass(evento) {
    if (evento.key === 'Tab' && !this.requiereDato) {
      swal({
        title: '¡Recuerda!',
        text: `Para crear tu contraseña ten en cuenta:
                mínimo 8, máximo 15 caracteres,
                al menos una letra mayúscula, una minúscula,
                un número y un caracter especial  (@$!%*?&_-),
                sin espacios en blanco.`,
        icon: 'info',
      }).then((value) => {
        this.nameField.nativeElement.focus()
      });
      this.requiereDato = true;
    }
  }
  requiere() {
    if (!this.requiereDato) {
      swal({
        title: '¡Recuerda!',
        text: `Para crear tu contraseña ten en cuenta:
                mínimo 8, máximo 15 caracteres,
                al menos una letra mayúscula, una minúscula,
                un número y un caracter especial (@$!%*?&_-),
                sin espacios en blanco.`,
        icon: 'info',
      }).then((value) => {
        this.nameField.nativeElement.focus();
      });
      this.requiereDato = true;
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
          $('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });
      });
    });
  }

}
