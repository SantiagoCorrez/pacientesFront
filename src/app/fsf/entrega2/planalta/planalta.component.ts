import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { ProceterapService } from 'src/app/service/entrega2/proceterap.service';
@Component({
  selector: 'app-planalta',
  templateUrl: './planalta.component.html',
  styleUrls: ['./planalta.component.css']
})
export class PlanaltaComponent implements OnInit {
  //id = this._router.snapshot.paramMap.get('idalta');
  @Input('idalta')
  id;
  datos: any;
  const_Session: any;
  planAlta: any;
  planOrden: any;
  planRecomendaciones: any;
  msjOren: boolean;
  msjAltaReco: boolean;
  msjMed: boolean;
  msj: boolean;
  activateMedicamentos: boolean;
  activateOrdenes: boolean;
  activateRecomendaciones: boolean;
  activatePlanAlta: boolean;
  msjPlanAlta: boolean;
  
  constructor(private cookie: CookieService, private router: Router,
              private spinnerService: NgxSpinnerService, private _router: ActivatedRoute,
              private proceterapService: ProceterapService,) {
              }
  

  viewCardMed(){
    this.activateMedicamentos = !this.activateMedicamentos
    this.activateOrdenes = false
    this.activateRecomendaciones = false
    this.activatePlanAlta = false
  }
  viewCardOrd(){
    this.activateOrdenes = !this.activateOrdenes
    this.activateMedicamentos = false
    // this.activateOrdenes = false
    this.activateRecomendaciones = false
    this.activatePlanAlta = false
  }
  viewCardReco(){
    this.activateRecomendaciones = !this.activateRecomendaciones
    this.activateMedicamentos = false
    this.activateOrdenes = false
    // this.activateRecomendaciones = false
    this.activatePlanAlta = false
  }
  viewCardPlanAlta(){
    this.activatePlanAlta = !this.activatePlanAlta
    this.activateMedicamentos = false
    this.activateOrdenes = false
    this.activateRecomendaciones = false
    //this.activatePlanAlta = false
  }

  logout() {
    this.cookie.delete('srvpriv');
    sessionStorage.removeItem('login');
    this.router.navigate(['/']);
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass();
        });
    });

    $('.text-secondary').removeClass( "text-secondary" )
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    this.proceterapService.getPlanAlta(this.id).subscribe(data=>{
      this.datos = data.objeto;
      if(this.datos.length === 0){
        this.msjPlanAlta = true
      }
      if(this.datos.alertas === ' ' &&
          this.datos.actividadFisica === ' ') {
        this.msjPlanAlta = true
      }
    },
    error=>{
    });
    this.proceterapService.getPlantaAltaMedicamentos(this.id).subscribe(dataAlta=>{
      this.planAlta = dataAlta.objeto
      if(this.planAlta.length === 0){
        this.msjMed = true
      }
    },
    error=>{
    })
    this.proceterapService.getPlantaAltaOrdenes(this.id).subscribe(dataOrdenes=>{
      this.planOrden = dataOrdenes.objeto
      if(this.planOrden.length === 0){
        this.msjOren = true
      }
    },
    error=>{
    })
    this.proceterapService.getPlantaAltaRecomendaciones(this.id).subscribe(dataRecomendaciones=>{
      this.planRecomendaciones = dataRecomendaciones.objeto
      if(this.planRecomendaciones.length === 0){
        this.msjAltaReco = true
      }
    },
    error=>{
    })

    }
}

