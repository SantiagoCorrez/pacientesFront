import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileSharePoint } from 'src/app/models/SharePoint/FileSharePoint';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  uploadFiles(fileSharePoint:FileSharePoint) {
    return this.http.post<any>( environment.endpointCA + '/CentralAutoriza/rest/SharePoint/subirDoc', fileSharePoint);
  }

  downloadFile(fileSharePoint:FileSharePoint) {
    return this.http.post( environment.endpointCA + '/CentralAutoriza/rest/SharePoint/buscarDoc', fileSharePoint, {responseType: 'blob'});
  }
}
