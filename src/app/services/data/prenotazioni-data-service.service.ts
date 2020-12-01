import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrenotazioneModel } from 'src/app/PrenotazioneModel';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniDataServiceService {

  constructor(private http: HttpClient) { }
  baseUrl = `http://localhost:8050/prenotazioni`;
  utentiUrl = `http://localhost:8050/utenti`;
  mezziUrl = `http://localhost:8050/mezzi`;

  GetPrenotazioni(){
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  GetUtenti(){
    return this.http.get<any[]>(`${this.utentiUrl}/customer`);
  }

  GetMezzi(){
    return this.http.get<any[]>(`${this.mezziUrl}/catalogo`);
  }

  AggiungiPrenotazione(Prenotazione : PrenotazioneModel){
    return this.http.post<Response>(`${this.baseUrl}/aggiungi`, Prenotazione);
  }

  InviaIdPrenotazione(id: number){
    return this.http.get<void>(`${this.baseUrl}/modifica/${id}`);
  }

  EliminaPrenotazione(id){
    return this.http.get<Response>(`${this.baseUrl}/elimina/${id}`);
  }

  ModificaPrenotazione(Prenotazione : PrenotazioneModel){
    return this.http.post<Response>(`${this.baseUrl}/modifica`, Prenotazione);
  }
}
