import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtentiDataService } from '../services/data/utenti-data.service';
import { UtenteModel } from '../UtenteModel';
import * as moment from 'node_modules/moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
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
  Utente : UtenteModel = {id : 0, nome : "", cognome : "", tipoutente : {id : 0 , tipo : ""}, nascita : new Date(), password : ""};
  Data;
  ComparsaForm = "";
  TempData : any;
  /*--------------------- LifeCycles ----------------------*/ 
  /*------------------------------------------------------ */
  ngOnInit(): void {
    this.IdInMemoria = sessionStorage.getItem("IdUtenteAttuale");
    this.Visualizza();
  } 


  InputAppear(colonna){
    this.ComparsaForm = colonna;
  }


  AggiornaUtente(){
    if(this.Utente.tipoutente.tipo.toUpperCase() === "ADMIN" || this.Utente.tipoutente.tipo.toUpperCase() === "CUSTOMER"){
      this.Data = moment(this.Utente.nascita);
      this.Data = this.Data.format("L");
      this.Utente['nascita'] = this.Data;
      this.utentiDataService.AggiornaProfilo(this.Utente).subscribe(
        response =>{
          this.Snack.open((String)(response), "x", {
            duration: 2000,
          });
          this.Visualizza();
          this.ComparsaForm = ""
        },
        error=>{
          console.log(error.error.message);
        }
      );
    }else{
      this.Snack.open("Inserire 'ADMIN' o 'CUSTOMER'", "x", {
        duration: 3000});
    }
  }
  



  Visualizza(){
      this.utentiDataService.GetSingoloUtente(this.IdInMemoria).subscribe(
      response => {
        this.Utente = response;
        this.Data = moment(this.Utente.nascita);
        this.Utente.nascita = this.Data.format("L");
      },
      error => {
        console.log("Non va");
      }
    );
  }

}

