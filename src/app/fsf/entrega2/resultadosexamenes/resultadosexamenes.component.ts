import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceDetectorService } from 'ngx-device-detector';
import swal from 'sweetalert';
import * as $ from 'jquery';

/*models*/
import { ResultExamenes } from '../../../models/entrega2/result-examenes';

/*Service*/
import { ResultexamenService } from '../../../service/entrega2/resultexamen.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-resultadosexamenes',
  templateUrl: './resultadosexamenes.component.html',
  styleUrls: ['./resultadosexamenes.component.css']
})
export class ResultadosexamenesComponent implements OnInit {
  datos: any;
  msjVal: boolean;
  resultArray: ResultExamenes[] = [];
  selectedResult: ResultExamenes = new ResultExamenes();
  msjNull: boolean;
  pageActual: number = 1;
  page: boolean = false;
  viewFrist: boolean;
  viewSecond: boolean;
  viewthree: boolean;
  viewFour: boolean;
  viewFilter: boolean;
  const_Session: any;
  labelButton: string;

  constructor(private resultexamenService: ResultexamenService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private cookie: CookieService,
    private deviceDetectorService: DeviceDetectorService) {
    let userSession = cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    let d = new Date();
    resultexamenService.getDataExa( d.getDay(), (d.getMonth() + 1), d.getFullYear()).subscribe(data => {
      this.datos = data.objeto;
        if (this.datos.length === 0) {
          this.msjVal = false;
          this.msjNull = true;
        } else {
          this.msjVal = true;
          this.page = true;
        }
    },
    error => {
      this.page = false;
      this.msjVal = false;
      this.msjNull = true;
      this.datos;
    });
    if(this.deviceDetectorService.isMobile()){
      this.labelButton = 'Ver';
    }else{
      this.labelButton = 'Descargar';
    }
  }

  resultExamenes() {
    this.viewFrist = false;
    this.viewSecond = false;
    this.viewthree = false;
    this.viewFour = false;
    let date = new Date()
    let mes = (date.getMonth() + 1)
    if (date.getFullYear() === parseInt(this.selectedResult.periodoYear)) {
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
      this.resultexamenService.getDataResultExamen(this.selectedResult.periodo, this.selectedResult.periodoYear).subscribe(
        data => {
          this.spinnerService.hide();
          this.datos = data.objeto;
          if (this.datos.length === 0) {
            this.msjVal = false;
            this.msjNull = true;
          } else {
            this.msjVal = true;
            this.page = true;
          }
        },
        error => {
          this.spinnerService.hide();
          this.page = false;
          this.msjVal = false;
          this.msjNull = true;
          this.datos;
        }
      )
    }
  }

  verExamenVarios(codPrestacion, tipoOrdenVarios, numeroOrdenVarios) {
    this.spinnerService.show();
    this.resultexamenService.getExamenesVarios(codPrestacion, tipoOrdenVarios,
      numeroOrdenVarios).subscribe(data => {
        this.spinnerService.hide();
        let popupWinindow;
        popupWinindow = window.open('',
          '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write(data.objeto);
        popupWinindow.document.close();
      }, error => {
        this.spinnerService.hide();
      })
  }

  
  verExamen(id, codPrestacion:string) {
    this.spinnerService.show()
      this.resultexamenService.getDataPDF(id).subscribe((data: Blob) => {
        this.spinnerService.hide();
        let blobd = data;
        if(this.deviceDetectorService.isMobile()){
          var newBlob = new Blob([blobd], { type: 'application/pdf' });
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
          } 
          const data = window.URL.createObjectURL(newBlob);
          var link = document.createElement('a');
          link.href = data;
          link.download="file.pdf";
          link.click();
          setTimeout(function(){
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
          }, 100);
          // const blob = new Blob([data], { type: 'application/pdf' });
          // const url = window.URL.createObjectURL(blob);
          // // window.open(url,'_self');
          // var link = document.createElement('a');
          // link.target = '_blank';
          // link.href = url;
          // document.body.appendChild(link); // Required for Firefox
          // window.open(url, 'Resultado FSFB', 'width=300, height=200');
          // link.click();
          // link.remove();
        }else{
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const downloadLink = document.createElement("a");
          const fileName = id+"_"+codPrestacion.trim()+".pdf";
  
          downloadLink.href = url;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      },
        error => {
          this.spinnerService.hide();
          swal({
            title: '¡Error!',
            text: 'No se pudo descargar el archivo, intentelo nuevamente',
            icon: 'warning'
          })
        })
  }

  verExamenExterno(id) {
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    this.spinnerService.show()
      setTimeout(()=>{
        this.spinnerService.hide()
      },3000)
    if(this.deviceDetectorService.isMobile()){
      location.href = "https://fsfbxero.fsfb.org.co/?user=XEROUSER&password=x3r0v13w3r&PatiendID=" + this.const_Session.uid + "&relatedAccessionNumber=" + id + "&theme=eprDisplay"
    } else {
      var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=900, height=800, top=85, left=140";
      var navegador = navigator.appName;
      window.open("https://fsfbxero.fsfb.org.co/?user=XEROUSER&password=x3r0v13w3r&PatiendID=" + this.const_Session.uid + "&relatedAccessionNumber=" + id + "&theme=eprDisplay", "", opciones);
    }
  }

  ngOnInit() {
  }

  //return a promise that resolves with a File instance
  urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
    );
  }


}
