import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableHeader } from '../../table/table.component';
@Injectable({
  providedIn: 'root'
})
export class UtentiDataService {

  constructor(private http : HttpClient) { }

  getUtenti(){
    return this.http.get<any[]>(`http://localhost:8050/utenti/test`);
  }
}
