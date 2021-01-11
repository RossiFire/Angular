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

  AddUtente(Utente : UtenteModel) : Observable<Response>{
    return this.http.post<Response>(`${this.baseUrl}/aggiungi`, Utente);
  }

  
  EliminaUtente(id){
    return this.http.post(`${this.baseUrl}/elimina/${id}`, {responseType : 'text'});
  }

  InviaIdUtente(id){
    return this.http.get<void>(`${this.baseUrl}/modifica/${id}`);
  }

  AggiornaUtente(Utente : UtenteModel){
    return this.http.post<Response>(`${this.baseUrl}/modifica`, Utente);
  }


  ControllaDiritti(nome : string, password: string){
    var Data = {'nome' : nome, 'password': password};
    return this.http.post<Boolean>(`${this.baseUrl}/controlla`, Data);
  }

  GetIdUtente(nome : string, password: string){
    var Data = {'nome' : nome, 'password': password};
    return this.http.post<number>(`${this.baseUrl}/id`, Data);
  }

  GetSingoloUtente(id : number){
    return this.http.get<any>(`${this.baseUrl}/singolo/${id}`);
  }

  AggiornaProfilo(Utente : UtenteModel){
    return this.http.post<Response>(`${this.baseUrl}/modificaProfilo`, Utente);
  }


/*   Login(username : String, password : String){
   const headers = new HttpHeaders({Authorization : 'Basic' + btoa(username+":"+password)})
    return this.http.get<any>(`http://localhost:8050/asosa`, {headers});
  } */


  Login(username : String, password : String){
    const headers = new HttpHeaders(username || password ? 
    {authorization : 'Basic ' + btoa(username + ':' + password)} : {})
/*     const headers = new HttpHeaders({Authorization : 'Basic' + btoa(username+":"+password)}) */
     return this.http.get<any>(`http://localhost:8050/asosa`, {headers})
   }
  


}

