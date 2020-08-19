import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileSharePoint } from 'src/app/models/SharePoint/FileSharePoint';
import { NgxSpinnerService } from 'ngx-spinner';
import { PacienteSharePoint } from 'src/app/models/SharePoint/PacienteSharePoint';
import { OrdenMedica } from 'src/app/models/entrega2/OrdenMedica';
import { CookieService } from 'ngx-cookie-service';
import { UploadFileService } from 'src/app/service/entrega2/upload-file.service';
import { OrdenMedicaService } from 'src/app/service/entrega2/orden-medica.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-pre-recepcion',
  templateUrl: './pre-recepcion.component.html',
  styleUrls: ['./pre-recepcion.component.scss']
})
export class PreRecepcionComponent implements OnInit {

  const_Session:any;
  fileSharePoint: FileSharePoint = new FileSharePoint();
  ordenMedica: OrdenMedica = new OrdenMedica();
  showFile: boolean = false;
  @ViewChild('caFile')
  caFile: ElementRef;

  constructor(public dialogRef: MatDialogRef<PreRecepcionComponent>,
    private spinner:NgxSpinnerService,
    private uploadFileService: UploadFileService,
    private ordenMedicaService: OrdenMedicaService,
    private cookie: CookieService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    let userSession = this.cookie.get('srvpriv');
    this.const_Session = JSON.parse(atob(userSession));
    this.spinner.show();
    this.ordenMedicaService.getOrdenMedica(this.const_Session.usuario).subscribe(
      (data) => {
        this.spinner.hide();
        if(data != null){
          this.ordenMedica = data;
          this.showFile = true;
        }
      }
      ,(error) => {
        this.spinner.hide();
      });
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.ordenMedica.ormFilename = file.name;
    this.fileSharePoint.nombreArchivo = file.name;
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    const imageSrc = reader.result;
    this.fileSharePoint.archivo =  imageSrc.split(',')[1]
    this.onSubmitFile();
    return imageSrc;
  }

  onSubmitFile () {
    this.createOrdenMedica();
  }

  createOrdenMedica(){
    this.spinner.show();
    this.ordenMedica.pacPacNumero = this.const_Session.pacnumero;
    this.ordenMedica.pacPacRut = this.const_Session.usuario;
    this.ordenMedica.pacPacTipoIdentCodigo = this.const_Session.tipoDoc;
    this.ordenMedica.pcaAgeCodigoRecep = this.const_Session.usuario;
    if(this.ordenMedica.ormIdOrdmNumero == null){
      this.ordenMedicaService.createOrdenMedica(this.ordenMedica).subscribe(
        (data: OrdenMedica) => {
          this.createFileSharePoint();
          this.fileSharePoint.ormIdOrdmNumero = data.ormIdOrdmNumero;
          this.uploadFileService.uploadFiles(this.fileSharePoint).subscribe(
            (data) => {
              this.spinner.hide();
              this.caFile.nativeElement.value = "";
              this.showFile = true;
              swal({
                title: 'Proceso exitoso!',
                text: 'Se actualizó el documento exitosamente',
                icon: 'success',
              });
            }
            ,(error) => {
              this.spinner.hide();
              this.caFile.nativeElement.value = "";
              swal({
                title: '¡Error!',
                text: 'No se pudo crear el documento, intentelo nuevamente',
                icon: 'warning'
              })
            }
          )
        }
        ,(error) => {
          this.spinner.hide();
          this.caFile.nativeElement.value = "";
          swal({
            title: '¡Error!',
            text: 'No se pudo crear la órden médica, intentelo nuevamente',
            icon: 'warning'
          })
        }
        );
    }else{
      this.createFileSharePoint();
      this.fileSharePoint.ormIdOrdmNumero = this.ordenMedica.ormIdOrdmNumero;
      this.uploadFileService.uploadFiles(this.fileSharePoint).subscribe(
        (data) => {
          this.spinner.hide();
          this.caFile.nativeElement.value = "";
          this.showFile = true;
          swal({
            title: 'Proceso exitoso!',
            text: 'Se actualizó el documento exitosamente',
            icon: 'success',
          });
        }
        ,(error) => {
          this.spinner.hide();
          this.caFile.nativeElement.value = "";
          swal({
            title: '¡Error!',
            text: 'No se pudo crear el documento, intentelo nuevamente',
            icon: 'warning'
          })
        }
      )
    }
  }

  download(){
    this.createFileSharePoint();
    this.fileSharePoint.ormIdOrdmNumero = this.ordenMedica.ormIdOrdmNumero;
    this.fileSharePoint.nombreArchivo = this.ordenMedica.ormFilename;
    this.spinner.show();
    this.uploadFileService.downloadFile(this.fileSharePoint).subscribe(
      data => {
        this.spinner.hide();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = this.fileSharePoint.nombreArchivo;
        a.target = '_self';
        document.body.appendChild(a);
        a.click();
      }, error => {
        this.spinner.hide();
        swal({
          title: 'Error',
          text: 'No se pudo consultar descargar el archivo, por favor intentelo nuevamente',
          icon: 'warning',
        });
      }
    );
  }

  createFileSharePoint(){
    this.fileSharePoint.pac = new PacienteSharePoint();
    this.fileSharePoint.pac.tipoDocId = this.ordenMedica.pacPacTipoIdentCodigo;
    this.fileSharePoint.pac.numDocId = this.ordenMedica.pacPacNumero;
    this.fileSharePoint.archivoGral = true;
  }

  close(){
    this.dialogRef.close();
  }

}
