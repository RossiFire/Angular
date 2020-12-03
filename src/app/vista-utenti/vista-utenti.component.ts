import { Component, OnInit, ɵConsole, OnDestroy, OnChanges, SimpleChanges, AfterContentInit} from '@angular/core';
import { TableConfig, TableHeader, TableOrder, TableSearch, TablePagination} from '../table/table.component';
import { ButtonConfig } from '../button/button.component';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { UtentiDataService } from '../services/data/utenti-data.service';
import { Observable, observable } from 'rxjs';
import { UtenteModel } from '../UtenteModel';
import * as moment from 'node_modules/moment';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-vista-utenti',
  templateUrl: './vista-utenti.component.html',
  styleUrls: ['./vista-utenti.component.css'],
  providers : [MatSnackBar]
})
export class VistaUtentiComponent implements OnInit{
  constructor(private route : Router, private UtentiDataService : UtentiDataService, private SnackB : MatSnackBar) {}

  /*------------------ Dati sessione ----------------------*/ 
  /*------------------------------------------------------ */
  privilegi;
  UserAttuale;
  

  /*------------------ Precompila form --------------------*/ 
  /*------------------------------------------------------ */
  temp : any[];
  datoModifica : any[] = new Array();
  UtenteModel : UtenteModel = {id: 0, nome: "", cognome: "", tipoutente: {id: 1 , tipo : ""}, nascita : new Date(), password: ""};
  buttonAggiungi : boolean = true;
  Data;

  
  /*------------------ Table config -----------------------*/ 
  /*------------------------------------------------------ */
  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { column : "" , value : ""}
  newDato : any[] = [];
  tbHeader : any[] =  [
    { key : "id", label : "ID"},
    { key : "nome", label : "Nome"},
    { key : "cognome", label : "Cognome"},
    { key : "nascita", label : "Anno di Nascita"},
    { key : "tipoutente", label : "Tipo Utente"},
    { key : "password", label : "Password"}
  ]
  tbData : any[] = [];
  tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]};
  tbConfig : TableConfig = {
    header : this.tbHeader, order : this.tbOrder,
    search : this.tbSearch, pagination : this.tbPagination
  }
  btnConfig : ButtonConfig = {
    text : 'Bottone', icon : '<i class="fas fa-rocket"></i>', 
    customCss : {'background-color' : "red", 'color' : "yellow"}
  }

  /*------------------- Altre Variabili -------------------*/


  /*--------------------- Lifecycle -----------------------*/ 
  /*------------------------------------------------------ */
  ngOnInit(): void {
    this.buttonAggiungi = true;
    this.privilegi = sessionStorage.getItem("privilegi");
    this.UserAttuale = sessionStorage.getItem("UsernameAttuale");
    this.tbData = [];
    this.SottoScrivi();
  }


  /*------------------ API Get Utenti----------------------*/ 
  /*------------------------------------------------------ */
  SottoScrivi(){
    this.UtentiDataService.getUtenti().subscribe(x => {
      for(let i = 0; i<x.length; i++){
        for(let j=0; j<this.tbHeader.length;j++){
          if(this.tbHeader[j].key === 'tipoutente'){
            x[i][this.tbHeader[j].key] = x[i][this.tbHeader[j].key]['tipo'];
          }if(this.tbHeader[j].key === 'password'){
            if(this.privilegi === 'false'){
              x[i][this.tbHeader[j].key] = "*****";
            }
          }if(this.tbHeader[j].key == 'nascita'){
            this.Data = moment(x[i][this.tbHeader[j].key]);
            this.Data = this.Data.format("L");
            x[i][this.tbHeader[j].key] = this.Data;
          }
        }
      }
      this.tbData = x;
    });
  }




  /*---------------- API elimina Utente -------------------*/ 
  /*------------------------------------------------------ */
  Elimina(id){
    this.UtentiDataService.EliminaUtente(id).subscribe(
      (response : any) => {
        this.SottoScrivi();
      },
      (error : any) =>{
        console.log(error.error.text);
      }
    )
  }





  /*---------------- Set Modello Utente -------------------*/ 
  /*------------------------------------------------------ */
  Aggiungi(values){
    for(let i = 0; i<this.tbHeader.length ; i++){
      this.newDato.push({[this.tbHeader[i].key] : values['id'][i]});
    }
    for (var i = 0; i < this.newDato.length; i++) {
      if(this.tbHeader[i].key === 'tipoutente'){
          if(this.newDato[i][this.tbHeader[i].key] === 'ADMIN' || this.newDato[i][this.tbHeader[i].key] === 'CUSTOMER'){
            if(this.newDato[i][this.tbHeader[i].key] === 'CUSTOMER'){
              this.UtenteModel[this.tbHeader[i].key]['id'] = 2;
            }
            this.UtenteModel[this.tbHeader[i].key]['tipo'] = this.newDato[i][this.tbHeader[i].key];
          }else{
            alert("Per favore inserire 'ADMIN' o 'CUSTOMER'");
            this.UtenteModel = {id: 0, nome: "", cognome: "", tipoutente: {id: 1 , tipo : ""}, nascita : new Date(), password: ""};
            break;
          }
        this.UtenteModel[this.tbHeader[i].key]['tipo'] = this.newDato[i][this.tbHeader[i].key];
      }else{
        if(this.tbHeader[i].key === 'nascita'){
          this.UtenteModel[this.tbHeader[i].key] = Date.parse(this.newDato[i][this.tbHeader[i].key]);
        }else{
          this.UtenteModel[this.tbHeader[i].key] = this.newDato[i][this.tbHeader[i].key];
        }
      }
    }
  } 




  /*----------------- Ripulisci variabili -----------------*/ 
  /*------------------------------------------------------ */
  ripulisci(){
    this.UtenteModel = {id: 0, nome: "", cognome: "", tipoutente: {id: 1 , tipo : ""}, nascita : new Date(), password: ""};
    this.newDato = [];
  }




  /*------------------ Operazioni CRUD --------------------*/ 
  /*------------------------------------------------------ */
  CrudOperation(values){
    switch(values['op']){
      case 'ELIMINA':
          this.Elimina(values['id']);
          break;
      case 'AGGIUNGI':
          this.Aggiungi(values);
          if(this.UtenteModel.nome != ""){
            this.UtentiDataService.AddUtente(this.UtenteModel).subscribe(
              response => {
                this.SottoScrivi();
                this.ripulisci();
              },
              error =>{
                alert(error.error.text);
              });
          }
          this.ripulisci();
          break;
      case 'PRECOMPILA':
          this.buttonAggiungi = false;
          this.datoModifica = new Array();
          this.temp = _.find(this.tbData, [values['col'], values['id']]);
          for(let i = 0; i<this.tbHeader.length; i++){
            this.datoModifica.push(this.temp[this.tbHeader[i].key]);
          }
          this.UtentiDataService.InviaIdUtente(values['id']).subscribe();
          break;
      case 'MODIFICA':
          this.Aggiungi(values);
          if(this.UtenteModel.nome != ""){
            this.UtentiDataService.AggiornaUtente(this.UtenteModel).subscribe(
              response =>{
                this.SottoScrivi();
                this.ripulisci();
              },
              error =>{
              }
            );
          }
          this.ripulisci();
          this.buttonAggiungi = true;
          this.datoModifica = new Array();
          break;
      default :
      console.log("errore DEFAULT");
      break;
    }
  };
  



  ResetButtonFromForm(){
    this.buttonAggiungi = true
    this.ripulisci();
  }



}
