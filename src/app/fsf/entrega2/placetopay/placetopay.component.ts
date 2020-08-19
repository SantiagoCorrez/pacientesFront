import {Component, OnInit} from '@angular/core';
import {GeneradoPeticionService} from 'src/app/service/entrega2/pagos/generado-peticion.service';
import {SendPay} from 'src/app/models/entrega2/pagos/send-pay';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import swal from 'sweetalert';
import {Tipodocumentopay} from 'src/app/validators/tipodocpay.validator';
import {environment} from 'src/environments/environment';
import {Pagador} from 'src/app/models/entrega2/pagos/pagador';
import {Person} from '../../../models/entrega2/pagos/person';

@Component({
    selector: 'app-placetopay',
    templateUrl: './placetopay.component.html',
    styleUrls: ['./placetopay.component.css']
})
export class PlacetopayComponent implements OnInit {
    misPagos: SendPay = new SendPay();
    citasaPagar: any;
    compradorP2P: Person = new Person();
    pagadorP2P: Person = new Person();
    datosPagador: FormGroup;
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    phoneNumber = '^(\+\d{1,3}[- ]?)?\d{10}$';
    valor = 0;
    citas = [];
    formulario = false;
    user: any;
    pagadorPrevio: Pagador = new Pagador();
    colapse = true;
    openAccordion = false;
    tipoDoc: string;
    numDoc: string;
    nombres: string;
    apellidos: string;
    email: string;
    celular: string;

    constructor(private generarPeticiones: GeneradoPeticionService,
                private fb: FormBuilder,
                private spinner: NgxSpinnerService,
                private cookie: CookieService) {
    }

    generarPago() {
        if (this.validateDocument()) {
            this.compradorP2P.apellidos = this.user.apellidoPaterno + ' ' + this.user.sn;
            this.compradorP2P.tipoDocumento = this.user.tipoDoc;
            this.compradorP2P.noDocumento = this.user.usuario;
            this.compradorP2P.nombres = this.user.givenName;
            this.compradorP2P.email = this.user.mail;
            this.compradorP2P.celular = null;
            this.compradorP2P.tipoDocPlacetoPay = this.getTipoDocPlaceToPay(this.user.tipoDoc);
            /*
            this.misPagos.apellidos = this.user.apellidoPaterno + ' ' + this.user.sn;
            this.misPagos.tipoDocumento = this.user.tipoDoc;
            this.misPagos.noDocumento = this.user.usuario;
            this.misPagos.nombres = this.user.givenName;
            this.misPagos.email = this.user.mail;
            this.misPagos.celular = null;
            this.misPagos.tipoDocPlacetoPay = this.getTipoDocPlaceToPay(this.user.tipoDoc);
             */
            this.spinner.show();
            if (this.compradorP2P.noDocumento != undefined) {
                this.misPagos.compradorP2P = this.compradorP2P;
                this.generarPeticiones.getUrlPay(this.misPagos).subscribe(data => {
                    // window.open(data.objeto)
                    location.href = data.objeto;
                    this.spinner.hide();
                }, err => {
                    if (err.error.objeto === 'NO_REGISTRA_CELULAR') {
                        this.loadData();
                        this.openAccordion = true;
                        swal('Información!',
                            'No tiene número de celular registrado, por favor diligencie el formulario', 'info');
                        this.spinner.hide();

                    } else {
                        swal('Información!',
                            'Este pago se encuentra en proceso de pago', 'info');
                        this.spinner.hide();
                    }
                });
            } else {
                this.spinner.hide();
                swal('Información!',
                    'Lo sentimos no es posible establecer conexión con la pasarela de pagos.', 'info');
            }
        }
    }

    onSubmit() {
        if (this.datosPagador.valid) {
            // this.misPagos = new SendPay();
            this.pagadorPrevio.apellidos = this.datosPagador.value.apellidos;
            this.pagadorPrevio.tipoDocumento = this.datosPagador.value.tipoDocumento;
            this.pagadorPrevio.noDocumento = this.datosPagador.value.noDocumento;
            this.pagadorPrevio.nombres = this.datosPagador.value.nombres;
            this.pagadorPrevio.email = this.datosPagador.value.email;
            this.pagadorPrevio.celular = this.datosPagador.value.celular;

            this.pagadorP2P.apellidos = this.datosPagador.value.apellidos;
            this.pagadorP2P.tipoDocumento = this.datosPagador.value.tipoDocumento;
            this.pagadorP2P.noDocumento = this.datosPagador.value.noDocumento;
            this.pagadorP2P.nombres = this.datosPagador.value.nombres;
            this.pagadorP2P.email = this.datosPagador.value.email;
            this.pagadorP2P.celular = this.datosPagador.value.celular === '' ? null : this.datosPagador.value.celular;
            this.pagadorP2P.tipoDocPlacetoPay = this.getTipoDocPlaceToPay(this.datosPagador.value.tipoDocumento);

            this.misPagos.pagadorP2P = this.pagadorP2P;
            swal('Información!',
                'Se han almacenado los datos del pagador.', 'success');
            this.formulario = true;
            this.openAccordion = false;
        }
    }

    reset() {
        this.pagadorPrevio.apellidos = this.user.apellidoPaterno + ' ' + this.user.sn;
        this.pagadorPrevio.tipoDocumento = this.user.tipoDoc;
        this.pagadorPrevio.noDocumento = this.user.usuario;
        this.pagadorPrevio.nombres = this.user.givenName;
        this.pagadorPrevio.email = this.user.mail;
        this.pagadorPrevio.celular = null;
        this.datosPagador.reset();
        this.colapse = true;
        Object.keys(this.datosPagador.controls).forEach(key => {
            this.datosPagador.get(key).setErrors(null) ;
        });
    }

    limpiar() {
        this.pagadorPrevio = new Pagador();
    }

    ngOnInit() {
        this.user = JSON.parse(atob(this.cookie.get('srvpriv')));
        this.misPagos.noPacPaciente = this.user.pacnumero;
        this.generarPeticiones.getMyIp().subscribe(data => {
            this.misPagos.ipCliente = data.ip;
        }, err => {
            this.misPagos.ipCliente = '0.0.0.0';
        });
        this.citas = JSON.parse(this.cookie.get('resumenPagos'));
        // this.misPagos.ipCliente = '0.0.0.0';
        this.misPagos.urlRedireccion = environment.idApplication + '/result';
        this.citasaPagar = JSON.parse(this.cookie.get('apagar'));
        for (const pay of this.citasaPagar) {
            this.valor = this.valor + parseInt(pay.valorCita);
        }
        this.misPagos.listaCitas = this.citasaPagar;
        this.misPagos.userAgent = window.navigator.userAgent;
        this.datosPagador = this.fb.group({
            tipoDocumento: ['', [Validators.required]],
            noDocumento: ['', [Validators.required]],
            nombres: ['', [Validators.required, Validators.pattern(/^[^^`|~!@$%^&*()\+=[{\]}'<,.>?\/";\\:¿¬°¡_\-´#0-9]+$/)]],
            apellidos: ['', [Validators.required, Validators.pattern(/^[^^`|~!@$%^&*()\+=[{\]}'<,.>?\/";\\:¿¬°¡_\-´#0-9]+$/)]],
            email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(19),
                Validators.pattern(/^[1-9][0-9]*$/)]],
        }, { validator: Tipodocumentopay });
        this.pagadorPrevio.apellidos = this.user.apellidoPaterno + ' ' + this.user.sn;
        this.pagadorPrevio.tipoDocumento = this.user.tipoDoc;
        this.pagadorPrevio.noDocumento = this.user.usuario;
        this.pagadorPrevio.nombres = this.user.givenName;
        this.pagadorPrevio.email = this.user.mail;
        this.pagadorPrevio.celular = null;
        // this.datosPagador.controls['celular'].setValue()
        this.openAccordion = false;
    }

    getTipoDocPlaceToPay(tipoDoc) {
        switch (tipoDoc) {
            case '2':
                return 'RC';
            case '3':
                return 'TI';
            case '4':
                return 'CC';
            case '5':
                return 'CE';
            case '6':
                return 'NIT';
            case 'P' :
                return 'PPN';
            default:
                return tipoDoc;
        }
    }

    loadData() {
        const req = {
            'tipoDocumento': this.user.tipoDoc,
            'numeroDocumento': this.user.usuario
        };
        this.generarPeticiones.getPacienteHIS(req).subscribe(data => {
            console.log('CONSULTA REALIZADA');
            this.tipoDoc = data.tipoDoc;
            this.numDoc = data.numDoc;
            this.nombres = data.nombres;
            this.apellidos = data.apellidos;
            this.celular = data.celular;
            this.email = data.correo;
        }, error => {
            swal('Error!',
                'No ha sido posible obtener la información', 'error');
            this.spinner.hide();
        });
    }

    validateDocument() {
        const validDocument = ['3', '4', '5', '6', 'P'];
        const valid = validDocument.filter(value => value === this.user.tipoDoc);
        if (this.formulario != true) {
            if (valid.length === 0) {
                this.openAccordion = true;
                swal('Información!',
                    'El tipo de documento ' + this.getNombreTipoDoc(this.user.tipoDoc) + ' no es válido para realizar pagos, ' +
                    'por favor diligencie el formulario de pagador.', 'info');
                this.spinner.hide();
                return false;
            }
        }
        return true;
    }

    getNombreTipoDoc(tipoDoc) {
        switch (tipoDoc) {
            case '2':
                return 'Registro Civil';
            case '3':
                return 'Tarjeta de Identidad';
            case '4':
                return 'Cédula de Ciudadanía';
            case '5':
                return 'Cédula de Extrangería';
            case '6':
                return 'NIT';
            case 'P':
                return 'Pasaporte';
            case 'M':
                return 'Menor sin Identificación';
            case 'A':
                return 'Adulto sin Identificación';
            case 'D':
                return 'Carné diplomático';
            case 'S':
                return 'Salvoconducto';
            case 'N':
                return 'NUIP';
            default:
                return tipoDoc;
        }
    }
}
