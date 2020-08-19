import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';
import { AlergiasService } from 'src/app/service/entrega2/alergias.service';
import { AplastarService } from 'src/app/service/colapse/aplastar.service';
import { AplastarpatService } from 'src/app/service/colapse/aplastarpat.service';
import { AplastarAlergiasService } from 'src/app/service/colapse/aplastar-alergias.service';

@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.component.html',
  styleUrls: ['./alergias.component.css']
})
export class AlergiasComponent implements OnInit {
  activateCardPat: boolean;
  datos: any;
  resultAlergia: any;
  msj: boolean;
  errores: any;
  dato: any;
  alergia: any;
  x: any = 'Antecedentes de Alergias no encontrados';


  constructor(private alergiasService : AlergiasService,
              private router: Router,
              private aplastarPat : AplastarpatService,
              private aplastarAler :AplastarAlergiasService,
              private aplastar : AplastarService,
              private cookie: CookieService) {
                alergiasService.getDataAlergias().subscribe(data => {
                  this.datos = data.objeto;
                  for (let dato of this.datos) {
                      this.x = this.x + dato.descripcion;
                  }
                  this.alergia = this.x.replace('undefined', '');
                  this.alergia = this.alergia.split('<br>');
                },
                error => {
                  this.msj = true;
                  this.errores = 'Antecedentes de Alergias no encontrados'
                });
              }
  @HostListener('viewCard')
  viewCard() {
    this.activateCardPat = !this.activateCardPat;
    this.aplastarPat.togglepat();
  }

  ngOnInit() {
    this.aplastar.change.subscribe(isOpen => {
      this.activateCardPat = false;
    });
  }

}
