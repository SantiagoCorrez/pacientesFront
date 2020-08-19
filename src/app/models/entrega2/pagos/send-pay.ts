import {Person} from './person';

export class SendPay {
    'noPacPaciente': string;
    'pagadorP2P': Person;
    'compradorP2P': Person;
    'listaCitas': [
        {
            'idCita': string;
            'nombreCita': string;
            'valorCita': string;
        }
    ];
    'urlRedireccion':  string;
    'ipCliente': string;
    'userAgent': string;
}
