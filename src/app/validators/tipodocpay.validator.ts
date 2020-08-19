import {AbstractControl, Validators} from '@angular/forms';

/*let datos = [/^[1-9]\d{6,8}\-?\d?$/,
/^[1-9][0-9]{3,9}$/,
/^([a-zA-Z]{1,5})?[1-9][0-9]{3,7}$/,
/^[1-9][0-9]{4,11}$/,
/^[a-zA-Z0-9_\-]{4,16}$/,
/^\d{3}\-?\d{2,3}\-?\d{4}$/,
/^[a-zA-Z0-9_\-]{4,16}$/,
/^[a-zA-Z0-9_\-]{4,16}$/,
/^[1-9]\d{6,8}\-?\d?$/,
/^(PE|N|E|\d+)\-\d+\-\d+$/,
/^\d{2,3}\.?\d{3}\.?\d{3}\-?\d{2}$/,
/^(\d{9}\-?\d)$/,
/^\d{13,14}$/ ];*/

let datos = [
    {'key': '3', 'value': /^[1-9][0-9]{4,11}$/},
    {'key': '4', 'value': /^[1-9][0-9]{4,9}$/},
    {'key': '5', 'value': /^([a-zA-Z]{1,5})?[1-9][0-9]{3,7}$/},
    {'key': '6', 'value': /^[1-9][0-9]{6,8}(-[0-9]){0,1}$/},
    {'key': 'P', 'value': /^[a-zA-Z0-9_]{4,16}$/}
    ];

export function Tipodocumentopay (control: AbstractControl) {
    const tipoDoc = control.get('tipoDocumento');
    const numDoc = control.get('noDocumento');

    const exp = datos.filter(dato => dato.key === tipoDoc.value);

    const result = exp.some(data => data.value.test(numDoc.value));
    if (!result) {
        return { validDoc: true };
    }
    return null;
}
