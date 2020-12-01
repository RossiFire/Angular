import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MezzoModel } from 'src/MezzoModel';
@Injectable({
  providedIn: 'root'
})
export class MezziDataService {

  constructor(private http : HttpClient) { }
  baseUrl = `http://localhost:8050/mezzi`;

  GetMezzi(){
    return this.http.get<any[]>(`${this.baseUrl}/catalogo`);
  }

  EliminaMezzo(id : number){
    return this.http.get<Response>(`${this.baseUrl}/elimina/${id}`);
  }

  AggiungiMezzo(Mezzo: MezzoModel){
    return this.http.post<Response>(`${this.baseUrl}/aggiungi`, Mezzo);
  }

  InviaIdUtente(id): Observable<void>{
    return this.http.get<void>(`${this.baseUrl}/modifica/${id}`);
  }

  AggiornaMezzo(Mezzo : MezzoModel) : Observable<Response>{
    return this.http.post<Response>(`${this.baseUrl}/modifica`, Mezzo);
  }
}
