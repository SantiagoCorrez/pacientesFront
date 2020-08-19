import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert';
import * as $ from 'jquery';

/*models*/
import { ResultExamenes } from '../../../models/entrega2/result-examenes';

/*Service*/
import { AplastarService } from 'src/app/service/colapse/aplastar.service';
import { AplastarpatService } from 'src/app/service/colapse/aplastarpat.service';
import { AplastarAlergiasService } from 'src/app/service/colapse/aplastar-alergias.service';
import { ProceterapService } from '../../../service/entrega2/proceterap.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css']
})
export class ProcedimientosComponent implements OnInit {
  datos: any;
  viewData: boolean;
  msj: any;
  activateCard: boolean;
  pageActual: number = 1;
  busqueda: any;
  viewFrist: boolean;
  viewSecond: boolean;
  viewthree: boolean;
  viewFour: boolean;
  viewFilter: boolean;
  msjVal: boolean;
  resultArray: ResultExamenes[] = [];
  selectedResult: ResultExamenes = new ResultExamenes();
  msjNull: boolean;
  mostrarResult: boolean;
  proYear: string;
  pro: string;
  url: any = window.location;
  expand = "";


  constructor(private proceterapService: ProceterapService,
              private router: Router,
              private aplastar: AplastarService,
              private aplastarPat: AplastarpatService,
              private spinnerService: NgxSpinnerService,
              private aplastarAler: AplastarAlergiasService,
              private cookie: CookieService) {
        this.proceterapService.getDataProceTerapInit().subscribe(data => {
          this.datos = data.objeto;
          if (data.respuesta !== 'No existen resultados para el filtro seleccionado') {
            this.viewData = false;
          } else {
            this.msj = data.respuesta;
            this.viewData = true;
          }
        }, error => {
          this.viewData = true;
          this.msj = error.error.respuesta;
        });
    }

    reset() {
      this.viewFilter = false;
      this.selectedResult = new ResultExamenes();
      this.spinnerService.show();
      this.proceterapService.getDataProceTerapInit().subscribe(data => {
        this.datos = data.objeto;
        if (data.respuesta !== 'No existen resultados para el filtro seleccionado') {
          this.viewData = false;
        } else {
          this.msj = data.respuesta;
          this.viewData = true;
        }
        setTimeout(() => {
          this.spinnerService.hide();
        }, 1000 );
      }, error => {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 1000 );
        this.viewData = true;
        this.msj = error.error.respuesta;
      })
    }

    resultExamenes(){
      this.viewFrist = false;
      this.viewSecond = false;
      this.viewthree = false;
      this.viewFour = false;
      let date = new Date();
      let mes = (date.getMonth() + 1);
      if(date.getFullYear() === parseInt(this.selectedResult.periodoYear)) {
        this.viewFilter = true;
        if (mes <= 3) {
          this.viewFrist = true;
        } else if (mes <= 6) {
          this.viewFrist = true;
          this.viewSecond = true;
        } else if (mes <= 9) {
          this.viewFrist = true;
          this.viewSecond = true;
          this.viewthree = true;
        } else if (mes <= 12) {
          this.viewFrist = true;
          this.viewSecond = true;
          this.viewthree = true;
          this.viewFour = true;
        }
      } else {
        this.viewFilter = true;
        this.viewFrist = true;
        this.viewSecond = true;
        this.viewthree = true;
        this.viewFour = true;
      }
      if (this.selectedResult.periodo !== undefined && this.selectedResult.periodoYear !== undefined) {
        this.msjVal = false;
        this.msjNull = false;
        this.datos;
        this.spinnerService.show();
        this.proceterapService.getDataProceTerap(this.selectedResult.periodo, this.selectedResult.periodoYear).subscribe(
          data => {
            this.cookie.set('perPro', this.selectedResult.periodo);
            this.cookie.set('yearPro', this.selectedResult.periodoYear);
            this.mostrarResult = true;
            this.datos = data.objeto;
            if (data.respuesta !== 'No existen resultados para el filtro seleccionado') {
              this.viewData = false;
            } else {
              this.msj = data.respuesta;
              this.viewData = true;
            }
            setTimeout(() => {
              this.spinnerService.hide();
            }, 1000 );
          },
          error => {
            this.viewData = true;
            this.msj = error.error.respuesta;
            setTimeout(() => {
              this.spinnerService.hide();
            }, 1000 );
          }
        );
      }
    }

  getAlta(id) {
    window.open(environment.idApplication  + 'planalta/' + id, 'popup', 'width=1024,height=768');
  }

  @HostListener('viewCard')
  viewCard() {
    this.activateCard = !this.activateCard;
    this.aplastarPat.togglepat();
    // this.aplastarAler.toggleAler()
  }

  ngOnInit() {
    this.aplastar.change.subscribe(isOpen => {
      this.activateCard = false;
    });
  }

  expandRow(key){
    this.expand = key;
  }

}
