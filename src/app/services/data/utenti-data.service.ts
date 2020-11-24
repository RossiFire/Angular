import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableHeader } from '../../table/table.component';
import { UtenteModel } from 'src/app/UtenteModel';
@Injectable({
  providedIn: 'root'
})
export class UtentiDataService {

  constructor(private http : HttpClient) { }

  getUtenti(){
    return this.http.get<any[]>(`http://localhost:8050/utenti/customer`);
  }

  AddUtente(Utente : UtenteModel){
    return this.http.put<string>(`http://localhost:8050/utenti/aggiungi`, Utente);
  }
}
