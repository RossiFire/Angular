export interface UtenteModel{

    'id' : number;
    'nome': string;
    'cognome': string;
    'tipoutente' : TipoUtente;
    'nascita' : Date;
    'password' : string;
}


export interface TipoUtente{
    'id' : number;
    'tipo' : string;
}

