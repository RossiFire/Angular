export interface MezzoModel{

    'id' : number;
    'casaCostr': string;
    'modello': string;
    'tipomezzo' : TipoMezzo;
    'targa' : string;
}


export interface TipoMezzo{
    'id' : number;
    'tipo' : string;
}

