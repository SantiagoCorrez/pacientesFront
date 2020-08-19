import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';
import { HistorialAnamnesisService } from 'src/app/service/entrega2/historial-anamnesis.service';
import { AplastarService } from 'src/app/service/colapse/aplastar.service';
import { AplastarpatService } from 'src/app/service/colapse/aplastarpat.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-historial-anamnesis',
  templateUrl: './historial-anamnesis.component.html',
  styleUrls: ['./historial-anamnesis.component.css']
})
export class HistorialAnamnesisComponent implements OnInit {
  datos: any;
  resultP: any = 'Antecedentes patológicos no encontrados ';
  resultQ: any = 'Antecedentes quirúrgicos no encontrados';
  PR: any;
  QR: any;
  activateCardPat: boolean;
  activateCardQui: boolean;
  msj: boolean;

  constructor(private historialAnamnesisService: HistorialAnamnesisService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private aplastar: AplastarService,
              private aplastarPat: AplastarpatService,
              private cookie: CookieService) {
                historialAnamnesisService.getDataAnamnesis().subscribe(
                  data => {
                    this.spinner.show();
                    this.datos = data.objeto;
                    for(let dato of this.datos ){
                      if(dato.codigo === 'P'){
                        this.resultP = this.resultP + dato.descripcion
                      } else if (dato.codigo === 'Q'){
                        this.resultQ =  this.resultQ + dato.descripcion
                      }
                    }
                    this.PR = this.resultP.replace('undefined', '')
                    this.QR = this.resultQ.replace('undefined', '')
                    setTimeout(() => {
                      this.spinner.hide();
                    }, 1000);
                  },
                  error => {
                    this.PR = 'Antecedentes patológicos no encontrados ';
                    this.QR = 'Antecedentes quirúrgicos no encontrados';
                    setTimeout(() => {
                      this.spinner.hide();
                    }, 1000);
                  }
                )
              }

  @HostListener('viewCardPat')
  viewCardPat(){
    this.activateCardPat = !this.activateCardPat;
    this.activateCardQui = false;
    this.aplastar.toggle()
  }
  @HostListener('viewCardQui')
  viewCardQui(){
    this.activateCardQui = !this.activateCardQui;
    this.activateCardPat = false;
    this.aplastar.toggle()
  }

  ngOnInit() {
    this.aplastarPat.changePt.subscribe(isOpen=>{
      this.activateCardPat = false;
      this.activateCardQui = false;
    })
  }

}
