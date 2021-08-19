import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  transform(value: any) {
    let translate;
    if('REJECTED' === value){
      translate = 'Rechazada';
    } else if ('APPROVED' === value) {
      translate = 'Aprobada';
    } else if ('CREATED' === value) {
      translate = 'Creada';
    }else if ('PENDING' === value) {
      translate = 'Pendiente';
    }
  else if ('ERROR' === value) {
    translate = 'Sin transacción';
  }
    return translate;
  }

}
