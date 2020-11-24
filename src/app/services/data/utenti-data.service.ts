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
  U : UtenteModel = {id :20, nome : "Dario", cognome : "gigo", tipoutente : {id : 1, tipo : 'ADMIN'}, nascita : "10/09/2001", password : "dieci"};

  getUtenti(){
    return this.http.get<any[]>(`${this.baseUrl}/customer`);
  }
  /* const data = JSON.stringify(this.U); */

  AddUtente(Utente : UtenteModel) : Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/aggiungi`, this.U);
  }

}
