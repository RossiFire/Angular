import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtentiDataService } from '../services/data/utenti-data.service';
import { UtenteModel } from '../UtenteModel';
import * as moment from 'node_modules/moment';
@Component({
  selector: 'app-info-utente',
  templateUrl: './info-utente.component.html',
  styleUrls: ['./info-utente.component.css']
})
export class InfoUtenteComponent implements OnInit {
  constructor(private router : ActivatedRoute, private utentiDataService : UtentiDataService) { }
  
  /*----------------- Varibili Sessione -------------------*/ 
  /*------------------------------------------------------ */  
  IdInMemoria; 


  /*------------------- Altre Variabili -------------------*/ 
  /*------------------------------------------------------ */  
  Utente : UtenteModel;
  Data;
  
  

  /*--------------------- LifeCycles ----------------------*/ 
  /*------------------------------------------------------ */
  ngOnInit(): void {
    this.IdInMemoria = sessionStorage.getItem("IdUtenteAttuale");
    this.utentiDataService.GetSingoloUtente(this.IdInMemoria).subscribe(
      response => {
        this.Utente = response;
        this.Data = moment(this.Utente.nascita);
        this.Utente.nascita = this.Data.format("L");
      },
      error => {
        alert("Non va");
      }
    );
  } 
  

}

