import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtentiDataService } from '../services/data/utenti-data.service';
import { UtenteModel } from '../UtenteModel';
import * as moment from 'node_modules/moment';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-info-utente',
  templateUrl: './info-utente.component.html',
  styleUrls: ['./info-utente.component.css'],
  providers : [MatSnackBar]
})
export class InfoUtenteComponent implements OnInit {
  constructor(private router : ActivatedRoute, private utentiDataService : UtentiDataService, private Snack : MatSnackBar) { }
  
  /*----------------- Varibili Sessione -------------------*/ 
  /*------------------------------------------------------ */  
  IdInMemoria; 


  /*------------------- Altre Variabili -------------------*/ 
  /*------------------------------------------------------ */  
  Utente : UtenteModel;
  Data;
  ComparsaForm = "";

  /*--------------------- LifeCycles ----------------------*/ 
  /*------------------------------------------------------ */
  ngOnInit(): void {
    this.IdInMemoria = sessionStorage.getItem("IdUtenteAttuale");
    this.utentiDataService.GetSingoloUtente(this.IdInMemoria).subscribe(
      response => {
        this.Utente = response;
        this.Data = moment(this.Utente.nascita);
        this.Utente.nascita = this.Data.format("L");
        console.log(this.Utente);
      },
      error => {
        alert("Non va");
      }
    );
  } 

  InputAppear(colonna){
    console.log(this.Utente[colonna]);
    this.ComparsaForm = colonna;
  }


  AggiornaUtente(){
    console.log(this.Utente);
    if(this.Utente.tipoutente.tipo.toUpperCase() === "ADMIN" || this.Utente.tipoutente.tipo.toUpperCase() === "CUSTOMER"){
      this.Data = moment(this.Utente.nascita);
      this.Utente.nascita = this.Data;
      this.utentiDataService.AggiornaUtente(this.Utente).subscribe(
        response =>{
          this.Snack.open(response.statusText, "x", {
            duration: 2000,
          });
        }
      );
    }else{
      this.Snack.open("Inserire 'ADMIN' o 'CUSTOMER'", "x", {
        duration: 3000});
    }
  }
  

}

