import { UtenteModel } from './UtenteModel';
import { MezzoModel } from 'src/MezzoModel';

export class PrenotazioneModel{
    'id' : number;
    'utentePrenotato': UtenteModel;
    'mezzoPrenotato': MezzoModel;
    'dataInizio' : Date;
    'dataFine' : Date;
    'approvata' : boolean;
}