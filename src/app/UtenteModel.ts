export interface UtenteModel{

    'id' : number;
    'nome': string;
    'cognome': string;
    'tipoutente' : TipoUtente;
    'nascita' : string;
    'password' : string;
}


export interface TipoUtente{
    'id' : number;
    'tipo' : string;
}

