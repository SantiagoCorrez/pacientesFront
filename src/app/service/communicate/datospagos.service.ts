import { Injectable, Output, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatospagosService {
  infoPagos: any;

  @Output() pagos: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  selectPay(info) {
    this.infoPagos = info;
    this.pagos.emit(this.infoPagos);
  }

  // getDataPay(){
  //   this.pagos.emit(this.infoPagos);
  // }

}
