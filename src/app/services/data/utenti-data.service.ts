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
  U : UtenteModel = {id :0, nome : "Dario", cognome : "gigio", tipoutente : {id : 1, tipo : 'ADMIN'}, nascita : "10/09/2001", password : "dieci"};
  constructor(private http : HttpClient) { }

  getUtenti(){
    return this.http.get<any[]>(`${this.baseUrl}/customer`);
  }

  AddUtente(Utente : UtenteModel) : Observable<string>{
    const data = JSON.stringify(this.U);
    return this.http.post<string>
    (`${this.baseUrl}/aggiungi`, data,
      {headers:
       {'Content-Type':'application/json; charset=utf-8'}
      }
    );
  }

}
