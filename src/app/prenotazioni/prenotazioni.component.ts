import { Component, OnInit, ɵConsole } from '@angular/core';
import { TableConfig, TableHeader, TableOrder, TableSearch, TablePagination} from '../table/table.component';
import { ButtonConfig } from '../button/button.component';
import { Router } from '@angular/router';
import * as _ from 'lodash'; 
import { PrenotazioniDataServiceService } from '../services/data/prenotazioni-data-service.service';
import { UtenteModel, TipoUtente } from '../UtenteModel';
import { MezzoModel } from 'src/MezzoModel';
import { PrenotazioneModel } from '../PrenotazioneModel';
import * as moment from 'node_modules/moment';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  constructor(private router : Router, private PrenotazioniService : PrenotazioniDataServiceService) { }

  /*------------------ Dati Sessione -----------------------*/ 
  /*------------------------------------------------------ */
  Privilegi;
  

  /*------------------ Table config -----------------------*/ 
  /*------------------------------------------------------ */
  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { column : "" , value : ""}
  tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]}
  tbData : any[] = [];
  tbHeader : TableHeader[] =  [
    { key : "id", label : "ID"},
    { key : "utentePrenotato", label : "Utente"},
    { key : "mezzoPrenotato", label : "Mezzo"},
    { key : "dataInizio", label : "Data inizio"},
    { key : "dataFine", label : "Data fine"},
    { key : "approvata", label : "Approvata"}
  ]
  tbConfig : TableConfig = {
    header : this.tbHeader, order : this.tbOrder,
    search : this.tbSearch, pagination : this.tbPagination
  }
  UtentiData : UtenteModel[] = [];
  MezziData : MezzoModel[] = [];


  /*----------------- Precompila form ---------------------*/ 
  /*------------------------------------------------------ */
  Temp : any[];
  DatoModifica : any[] = new Array();
  ButtonAggiungi : boolean = true;
  newDato : any[] = [];
  UtenteP : UtenteModel = {id : 0, nome: "", cognome: "", nascita : new Date(), password : "", tipoutente: {id: 1, tipo : ""}};
  MezzoP : MezzoModel = {id: 0, casaCostr: "", modello: "", tipomezzo: {id: 1 , tipo : ""}, targa : ""};
  PrenotazioneModel : PrenotazioneModel = {id: 0, utentePrenotato: this.UtenteP, mezzoPrenotato: this.MezzoP, dataInizio : new Date(), dataFine : new Date(), approvata : false};


  /*----------------- Altre Variabili ---------------------*/ 
  /*------------------------------------------------------ */
  Data;
  IdUtenteModifica;
  IdMezzoModifica;





  /*--------------------- LifeCycles ----------------------*/ 
  /*------------------------------------------------------ */
  ngOnInit(): void {
    this.ButtonAggiungi = true;
    this.Privilegi = sessionStorage.getItem("privilegi");
    this.GetPrenotazioni();
    this.GetUtenti();
    this.GetMezzi();
  }




  /*--------------- API Get Prenotazioni ------------------*/ 
  /*------------------------------------------------------ */
  GetPrenotazioni(){
    this.PrenotazioniService.GetPrenotazioni().subscribe(
      x=>{
        for(let i =0; i<x.length;i++){
          for(let j=0; j<this.tbHeader.length;j++){
            if(this.tbHeader[j].key === 'utentePrenotato'){
              x[i][this.tbHeader[j].key] = x[i][this.tbHeader[j].key]['nome'];
            }if(this.tbHeader[j].key === 'mezzoPrenotato'){
              x[i][this.tbHeader[j].key] = x[i][this.tbHeader[j].key]['casaCostr'] + " " + x[i][this.tbHeader[j].key]['modello'];
            }if(this.tbHeader[j].key === 'approvata'){
              if(x[i][this.tbHeader[j].key]){
                x[i][this.tbHeader[j].key] = "Si";
              }else{
                x[i][this.tbHeader[j].key] = "No";
              }
            }if(this.tbHeader[j].key == 'dataInizio'){
              this.Data = moment(x[i][this.tbHeader[j].key]);
              this.Data = this.Data.format("L");
              x[i][this.tbHeader[j].key] = this.Data;
            }if(this.tbHeader[j].key == 'dataFine'){
              this.Data = moment(x[i][this.tbHeader[j].key]);
              this.Data = this.Data.format("L");
              x[i][this.tbHeader[j].key] = this.Data;
            }
          }
        }
        this.tbData = x;
      },
      error=>{
        alert("Errore nel GetPrenotazione");
      }
    );
  }


  /*------------------ API Get Utenti ---------------------*/ 
  /*------------------------------------------------------ */
  GetUtenti(){
    this.PrenotazioniService.GetUtenti().subscribe(
      x=>{
        for(let i = 0; i<x.length; i++){
          for(let j=0; j<this.tbHeader.length;j++){
            if(x[i][this.tbHeader[j].key] === 'nascita'){
              this.Data = moment(x[i][this.tbHeader[j].key]);
              this.Data = this.Data.format("L");
              x[i][this.tbHeader[j].key] = this.Data;
            }
          }
        }
        this.UtentiData = x;
            },
      error =>{
        console.log(error.error.text);
      }
    )
  }


  /*------------------- API Get Mezzi ---------------------*/ 
  /*------------------------------------------------------ */
  GetMezzi(){
    this.PrenotazioniService.GetMezzi().subscribe(
      x=>{
        this.MezziData = x;
            },
      error =>{
        console.log(error.error.text);
      }
    )
  }


  /*----------------- Svuotare variabili ------------------*/ 
  /*------------------------------------------------------ */
  Ripulisci(){
    this.newDato = [];
    this.UtenteP = {id : 0, nome: "", cognome: "", nascita : new Date(), password : "", tipoutente: {id: 1, tipo : ""}};
    this.MezzoP = {id: 0, casaCostr: "", modello: "", tipomezzo: {id: 1 , tipo : ""}, targa : ""};
    this.PrenotazioneModel= {id: 0, utentePrenotato: this.UtenteP, mezzoPrenotato: this.MezzoP, dataInizio : new Date(), dataFine : new Date(), approvata : false};
  }




  /*--------------- Set Modello Prenotazione ---------------*/ 
  /*------------------------------------------------------ */
  Aggiungi(values) {
    for (let i = 0; i < this.tbHeader.length; i++) {
      this.newDato.push({ [this.tbHeader[i].key]: values['id'][i] });
    }
    for (var i = 0; i < this.newDato.length; i++) {
      if (this.tbHeader[i].key === 'id') {
        this.PrenotazioneModel[this.tbHeader[i].key] = this.newDato[i][this.tbHeader[i].key];
      } else {
        if (this.tbHeader[i].key === 'utentePrenotato') {
          this.PrenotazioneModel[this.tbHeader[i].key]['id'] = parseInt(values['IdUtenteModifica']);
        } if (this.tbHeader[i].key === 'mezzoPrenotato') {
          this.PrenotazioneModel[this.tbHeader[i].key]['id'] = parseInt(values['IdMezzoModifica']);
        }
        if (this.tbHeader[i].key === 'approvata') {
          switch (this.newDato[i][this.tbHeader[i].key].toUpperCase()) {
            case 'SI':
              this.PrenotazioneModel[this.tbHeader[i].key] = true;
              break;
            case 'NO':
              this.PrenotazioneModel[this.tbHeader[i].key] = false;
              break;
            default:
              alert("Inserire 'SI' per approvare oppure 'NO' per non approvare");
              this.Ripulisci();
              break;
          }
        } if (this.tbHeader[i].key === 'dataInizio') {
          this.PrenotazioneModel[this.tbHeader[i].key] = Date.parse(this.newDato[i][this.tbHeader[i].key]);
        } if (this.tbHeader[i].key === 'dataFine') {
          this.PrenotazioneModel[this.tbHeader[i].key] = Date.parse(this.newDato[i][this.tbHeader[i].key]);
        }
      }
    }
  } 



  /*------------------- Operazioni CRUD -------------------*/ 
  /*------------------------------------------------------ */
  CrudOperation(values){
    switch(values['op']){
      case 'ELIMINA':
          this.PrenotazioniService.EliminaPrenotazione(values['id']).subscribe(
            response=>{
              console.log("Successo");
              console.log(response);
              this.GetPrenotazioni();
            },
            error=>{
              console.log("errore");
              console.log(error.error.text);
            }
          );
          break;
      case 'AGGIUNGI':
          this.Aggiungi(values);
          if(this.PrenotazioneModel.id != 0){
            this.PrenotazioniService.AggiungiPrenotazione(this.PrenotazioneModel).subscribe(
              response=>{
                console.log(response);
                this.GetPrenotazioni();
              },
              error=>{
                console.log("errore");
                console.log(error.error.text);
              }
            );
          }
          this.Ripulisci();
          break;
      case 'PRECOMPILA':
          this.ButtonAggiungi = false;
          this.DatoModifica = new Array();
          this.Temp = _.find(this.tbData, [values['col'], values['id']]);
          for(let i = 0; i<this.tbHeader.length; i++){
            if(this.tbHeader[i].key === 'utentePrenotato'){
             this.IdUtenteModifica = this.Temp[this.tbHeader[i].key];
            }if(this.tbHeader[i].key === 'mezzoPrenotato'){
              this.IdMezzoModifica = this.Temp[this.tbHeader[i].key];
            }
              this.DatoModifica.push(this.Temp[this.tbHeader[i].key]);
          }
          this.PrenotazioniService.InviaIdPrenotazione(values['id']).subscribe();
          break;
      case 'MODIFICA':
          this.Aggiungi(values);
          if(this.UtenteP.id != 0){
            this.PrenotazioniService.ModificaPrenotazione(this.PrenotazioneModel).subscribe(
              response=>{
                console.log(response);
                this.GetPrenotazioni();
              },
              error=>{
                console.log(error.error.text);
              }
            );
          }else{
            alert("Non ha inserito id utente e mezzo");
          }
          this.ButtonAggiungi = true;
          this.DatoModifica = new Array();
          this.Ripulisci();
          break;
      default :
      console.log("errore DEFAULT case");
      break;
    }
  };


  ResetButtonFromForm(){
    this.ButtonAggiungi = true;
    this.Ripulisci();
  }
  


}
