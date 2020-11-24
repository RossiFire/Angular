import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.put<void>(`${this.baseUrl}/aggiungi  `, Utente);
  }

}
