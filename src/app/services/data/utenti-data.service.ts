import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TableHeader } from '../../table/table.component';
import { UtenteModel } from 'src/app/UtenteModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtentiDataService {

  baseUrl = `http://localhost:8050/utenti`;
  constructor(private http : HttpClient) { }

  getUtenti(){
    return this.http.get<any[]>(`${this.baseUrl}/customer`);
  }

  AddUtente(Utente : UtenteModel) : Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/aggiungi`, Utente);
  }

  EliminaUtente(id): Observable<void>{
    return this.http.get<void>(`${this.baseUrl}/elimina/${id}`);
  }

  InviaIdUtente(id): Observable<void>{
    return this.http.get<void>(`${this.baseUrl}/modifica/${id}`);
  }

  AggiornaUtente(Utente : UtenteModel) : Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/modifica`, Utente);
  }


  ControllaDiritti(nome : string, password: string): Observable<Boolean>{
    var Data = {'nome' : nome, 'password': password};
    return this.http.post<Boolean>(`${this.baseUrl}/controlla`, Data);
  }

  GetIdUtente(nome : string, password: string) : Observable<number>{
    var Data = {'nome' : nome, 'password': password};
    return this.http.post<number>(`${this.baseUrl}/id`, Data);
  }

  GetSingoloUtente(id : number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/singolo/${id}`);
  }

}
